// 특정 요소를 삭제하는 함수

// function removeElementBySelector(selector){
//     const elements =document.querySelectorAll(selector);
//     elements.forEach((element) => element.)
// }
// .chat_area dl dd
function editCharAreaPadding(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => (element.style.padding = "1px 0 1px 10px"));
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
const observerCallback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      // 'chat_area' 클래스 내부의 'dl' 태그 안에 있는 모든 <img> 태그를 숨깁니다.
      editCharAreaPadding(".chat_area dl dd");

      editCharAreaFlex(".chat_area dl");

      removeCharAreaImage([".chat_area dl img", ".chat_area dl span"]);

      removeElementBySelector(".pc");
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

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log(message);
//   if (message.action === "toggle") {
//     const elements = document.querySelectorAll(".chat_area dl img");
//     elements.forEach((element) => {
//       element.style.display = element.style.display === "none" ? "block" : "none";
//     });
//   }
// });
