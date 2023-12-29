let cachedSettings = {};

// 설정을 불러와 캐시하고 MutationObserver를 설정합니다.
function fetchAndObserveSettings() {
  chrome.storage.local.get(["applyRandomPastelColorsToNewLinks"], function (settings) {
    cachedSettings = settings; // 설정을 캐시합니다.
    observePageMutations(); // 설정이 로드된 후에 MutationObserver를 시작합니다.
  });
}

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

function getRandomColorBasedOnTheme() {
  const isDarkTheme = document.body.classList.contains("thema_dark");
  let r, g, b;

  if (isDarkTheme) {
    // 밝은색 색상 생성
    r = Math.floor(Math.random() * 128 + 127); // 127-255
    g = Math.floor(Math.random() * 128 + 127); // 127-255
    b = Math.floor(Math.random() * 128 + 127); // 127-255
  } else {
    // 어두운색 색상 생성
    r = Math.floor(Math.random() * 128); // 0-127
    g = Math.floor(Math.random() * 128); // 0-127
    b = Math.floor(Math.random() * 128); // 0-127
  }

  return `rgb(${r}, ${g}, ${b})`;
}

function applyRandomPastelColorsToNewLinks(selector) {
  // 주어진 selector와 :not([data-colored])를 함께 사용하여 색상이 적용되지 않은 링크들만 선택합니다.
  const links = document.querySelectorAll(`${selector}:not([data-colored])`);

  links.forEach((link) => {
    const pastelColor = getRandomColorBasedOnTheme();
    link.style.color = pastelColor;
    link.style.fontWeight = "bold";
    link.setAttribute("data-colored", "true"); // 스타일 적용 여부를 표시하는 데이터 속성을 추가합니다.
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
    // 이미 적용된 색상(data-colored)이 있다면, 색상을 조정합니다.
    if (a.hasAttribute("data-colored")) {
      a.style.color = getRandomColorBasedOnTheme(isDarkTheme);
    }
  });
}

const observerCallback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      // 'chat_area' 클래스 내부의 'dl' 태그 안에 있는 모든 <img> 태그를 숨깁니다.
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

      // applyRandomPastelColorsToNewLinks(".chat_area dl a");
    }
    if (mutation.type === "attributes" && mutation.target.localName === "body") {
      adjustChatAreaColors();
    }
  }
};

const observerOptions = {
  attributes: true, // 속성의 변화를 관찰
  attributeFilter: ["class"], // 'class' 속성의 변화만 관찰
  childList: true, // 자식 요소의 변화를 관찰
  subtree: true, // 모든 하위 요소에 대한 변화를 관찰
};

// 뮤테이션 옵저버 인스턴스 생성
const observer = new MutationObserver(observerCallback);

// 옵저버가 전체 페이지의 변화를 관찰하도록 설정
observer.observe(document.body, observerOptions);

// 메시지 리스너 추가
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "enable-feature") {
    // 기능을 활성화합니다.
    console.log(request);
    applyRandomPastelColorsToNewLinks(".chat_area dl a");
  } else if (request.action === "disable-feature") {
    // 기능을 비활성화합니다.
    // applyRandomPastelColorsToNewLinks(".chat_area dl a");
  }
});

// 초기 설정을 불러옵니다.
fetchAndObserveSettings();
