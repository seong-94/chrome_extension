// 특정 요소를 삭제하는 함수

// function removeElementBySelector(selector){
//     const elements =document.querySelectorAll(selector);
//     elements.forEach((element) => element.)
// }
// .chat_area dl dd
function editCharAreaPadding(selectors) {
  selectors.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.style.padding = "1px 0 1px 8px";
    });
  });
}
function editCharAreaFlex(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => (element.style.display = "flex"));
}

function removeCharAreaImage(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => (element.style.display = "none"));
}
function removeElementBySelector(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => element.remove());
}

// 함수: dl 태그 내의 dt의 텍스트를 dd 내부에 span으로 랜더링
function moveDdTextToDt(dlSelector) {
  // dlSelector에 해당하는 모든 dl 요소를 찾습니다.
  const dlElements = document.querySelectorAll(dlSelector);

  // 각 dl 요소에 대해 반복 처리합니다.
  dlElements.forEach((dl) => {
    const dtElement = dl.querySelector("dt");
    const ddElement = dl.querySelector("dd");

    // dd 요소가 존재하면 작업을 수행합니다.
    if (ddElement) {
      // dd의 텍스트를 취득합니다.
      const text = ddElement.textContent || ddElement.innerText;

      // 새로운 p 요소를 생성하고 텍스트를 설정합니다.
      const p = document.createElement("p");
      p.textContent = text;
      p.style.color = "#fff";
      p.style.display = "inline";
      p.style.padding = "1px 0 1px 5px";

      // dt 요소가 존재하면, 새로운 p 요소를 dt에 추가합니다.
      if (dtElement) {
        dtElement.appendChild(p);
      }

      // 기존의 dd 요소를 제거합니다.
      ddElement.remove();
    }
  });
}

function getRandomPastelColor() {
  // 파스텔 색상을 위해 높은 RGB 값을 랜덤으로 생성
  const r = Math.floor(Math.random() * 128 + 127); // 127-255
  const g = Math.floor(Math.random() * 128 + 127); // 127-255
  const b = Math.floor(Math.random() * 128 + 127); // 127-255
  return `rgb(${r}, ${g}, ${b})`;
}

function applyRandomPastelColorsToNewLinks() {
  const links = document.querySelectorAll("a:not([data-colored])"); // 이미 색상이 적용되지 않은 링크들만 선택

  links.forEach((link) => {
    const pastelColor = getRandomPastelColor();
    link.style.color = pastelColor;
    link.style.fontWeight = "bold";
    link.setAttribute("data-colored", "true"); // 스타일 적용 여부를 표시하는 데이터 속성 추가
  });
}
const observerCallback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      // 'chat_area' 클래스 내부의 'dl' 태그 안에 있는 모든 <img> 태그를 숨깁니다.
      editCharAreaPadding([".chat_area dl dd", ".chat_area dl dt"]);

      editCharAreaFlex(".chat_area dl");

      removeCharAreaImage([".chat_area dl img", ".chat_area dl span"]);

      removeElementBySelector(".pc");

      moveDdTextToDt(".chat_area dl");

      applyRandomPastelColorsToNewLinks(".chat_area dl a");
    }
  }
};

const observerOptions = {
  childList: true, // 자식 요소의 변화를 관찰
  subtree: true, // 모든 하위 요소에 대한 변화를 관찰
};

// 뮤테이션 옵저버 인스턴스 생성
const observer = new MutationObserver(observerCallback);

// 옵저버가 전체 페이지의 변화를 관찰하도록 설정
observer.observe(document.body, observerOptions);
