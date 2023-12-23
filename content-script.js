// 특정 요소를 삭제하는 함수
function removeElementBySelector(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => element.remove());
}

// 뮤테이션 옵저버 콜백 함수
const observerCallback = (mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      // 클래스가 'pc'인 요소를 삭제하는 로직
      removeElementBySelector(".pc");
      // title이 '열혈팬'인 <img> 태그를 삭제하는 로직
      //   removeElementBySelector("img[title='열혈팬']");
      // 'chat_area' 클래스 내부의 'dl' 태그 안에 있는 모든 <img> 태그를 삭제하는 로직
      removeElementBySelector(".chat_area dl img");
    }
  }
};

// 뮤테이션 옵저버 옵션 설정
const observerOptions = {
  childList: true, // 자식 요소의 변화를 관찰
  subtree: true, // 모든 하위 요소에 대한 변화를 관찰
};

// 뮤테이션 옵저버 인스턴스 생성
const observer = new MutationObserver(observerCallback);

// 옵저버가 전체 페이지의 변화를 관찰하도록 설정
observer.observe(document.body, observerOptions);
