let cachedSettings = {};

// 설정을 불러와 캐시하고 MutationObserver를 설정합니다.
function fetchAndObserveSettings() {
  chrome.storage.local.get(["applyRandomPastelColorsToNewLinks"], function (settings) {
    cachedSettings = settings; // 설정을 캐시합니다.
    observePageMutations(); // 설정이 로드된 후에 MutationObserver를 시작합니다.
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "update-applyRandomPastelColorsToNewLinks") {
    // 메시지에 담긴 새로운 설정값을 사용하여 필요한 작업을 수행합니다.
    if (message.value) {
      // 설정이 true일 때 수행할 작업
      fetchAndObserveSettings();
    } else {
      fetchAndObserveSettings();
      // 설정이 false일 때 수행할 작업
    }
  }
});

/*  정해진 요소의 패딩을 변경
 *  "1px 0 1px 30px" => "1px 0 1px 8px"*/
function editCharAreaPadding(selectors) {
  selectors.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.style.padding = "1px 0 1px 8px";
    });
  });
}

/* 채팅창의 레이아웃을 변경하기 위험 display:flex 요소 추가 */
function editCharAreaFlex(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => (element.style.display = "flex"));
}
/* 특정 타이틀을 가진 이모티콘 img 태그 display:none */
function hideImagesWithCertainTitles(selector, titles) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    // element의 title 속성이 titles 배열에 포함된 값 중 하나와 일치하는지 확인
    if (titles.includes(element.title)) {
      element.style.display = "none";
    }
  });
}

/* 아이콘 삭제 기능  */
function removeElementBySelector(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => element.remove());
}

function moveDdTextToDt(dlSelector) {
  const isDarkTheme = document.body.classList.contains("thema_dark");

  // dlSelector에 해당하는 모든 dl 요소를 찾습니다.
  const dlElements = document.querySelectorAll(dlSelector);

  // 각 dl 요소에 대해 반복 처리합니다.
  dlElements.forEach((dl) => {
    const dtElement = dl.querySelector("dt");
    const ddElement = dl.querySelector("dd");

    // dd 요소가 존재하면 작업을 수행합니다.
    if (ddElement) {
      // dd의 텍스트를 취득합니다.
      const text = ddElement.innerHTML;

      // 새로운 p 요소를 생성하고 텍스트를 설정합니다.
      const p = document.createElement("p");
      p.innerHTML = text.includes("<br>") ? "<br>" + text : text;
      p.style.color = isDarkTheme ? "#fff" : "black"; // 다크 테마면 흰색, 아니면 검은색
      p.style.display = "inline";
      p.style.padding = "0px 0 1px 5px";

      // dt 요소가 존재하면, 새로운 p 요소를 dt에 추가합니다.
      if (dtElement) {
        dtElement.appendChild(p);
      }

      // 기존의 dd 요소를 제거합니다.
      ddElement.remove();
    }
  });
}

function stringToColor(str, isDarkTheme) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = (hash & 0x00ffffff).toString(16).toUpperCase();
  color = "00000".substring(0, 6 - color.length) + color;

  if (isDarkTheme) {
    // 어두운 테마에 맞게 색상의 명도를 밝게 조정합니다.
    return adjustColorBrightness(`#${color}`, 40);
  } else {
    // 밝은 테마에 맞게 색상의 명도를 어둡게 조정합니다.
    return adjustColorBrightness(`#${color}`, -40);
  }
}

// 랜덤 컬러
function adjustColorBrightness(hex, brightness) {
  const rgb = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, (rgb >> 16) + brightness));
  const g = Math.max(0, Math.min(255, ((rgb >> 8) & 0x00ff) + brightness));
  const b = Math.max(0, Math.min(255, (rgb & 0x0000ff) + brightness));

  return `#${(0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1)}`;
}

function applyRandomPastelColorsToNewLinks(selector) {
  const dlElements = document.querySelectorAll(`${selector}:not([data-colored])`);
  const isDarkTheme = document.body.classList.contains("thema_dark");

  // userId와 색상 값을 캐싱하기 위한 객체
  const colorCache = {};

  dlElements.forEach((dlElement) => {
    const userId = dlElement.getAttribute("user_id");

    // 캐시에서 색상을 가져오거나 새로 계산합니다.
    let pastelColor = colorCache[userId];
    if (!pastelColor) {
      pastelColor = stringToColor(userId, isDarkTheme);
      colorCache[userId] = pastelColor; // 계산된 색상을 캐시에 저장합니다.
    }

    // 스타일을 적용합니다.
    dlElement.style.color = pastelColor;
    dlElement.style.fontWeight = "bold";
    dlElement.setAttribute("data-colored", "true");
  });
}

function adjustChatAreaColors() {
  const isDarkTheme = document.body.classList.contains("thema_dark");

  // p 태그의 색상 조정
  const chatAreaPs = document.querySelectorAll(".chat_area dl p");
  chatAreaPs.forEach((p) => {
    p.style.color = isDarkTheme ? "#fff" : "black";
  });

  // a 태그의 색상 조정
  const chatAreaAs = document.querySelectorAll(".chat_area dl a");
  chatAreaAs.forEach((a) => {
    const userId = a.getAttribute("user_id");
    // 이미 적용된 색상(data-colored)이 있다면, 색상을 조정합니다.
    if (a.hasAttribute("data-colored")) {
      a.style.color = stringToColor(userId, isDarkTheme);
    }
  });
}

// 페이지 변화를 감시하는 MutationObserver를 설정합니다.
function observePageMutations() {
  const observer = new MutationObserver((mutationList, observer) => {
    for (const mutation of mutationList) {
      // DOM 변화에 따라 함수를 실행합니다.
      if (mutation.type === "childList") {
        editCharAreaPadding([".chat_area dl dd", ".chat_area dl dt"]);

        editCharAreaFlex(".chat_area dl");

        hideImagesWithCertainTitles(".chat_area dl img", [
          "매니저",
          "구독팬",
          "팬클럽",
          "퀵뷰 사용자",
          "서포터",
          "열혈팬",
        ]);

        removeElementBySelector([".pc", ".chat_area dl span"]);

        moveDdTextToDt(".chat_area dl");

        if (cachedSettings.applyRandomPastelColorsToNewLinks) {
          applyRandomPastelColorsToNewLinks(".chat_area dl a");
        }
      }
      if (mutation.type === "attributes" && mutation.target.localName === "body") {
        adjustChatAreaColors();
      }
    }
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
    childList: true,
    subtree: true,
  });
}

const observerOptions = {
  attributes: true, // 속성의 변화를 관찰
  attributeFilter: ["class"], // 'class' 속성의 변화만 관찰
  childList: true, // 자식 요소의 변화를 관찰
  subtree: true, // 모든 하위 요소에 대한 변화를 관찰
};
// 초기 설정을 불러옵니다.
fetchAndObserveSettings();
