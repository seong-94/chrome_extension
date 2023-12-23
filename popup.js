/**
 * ---------------------------------------------------------------------------------
 * | 팝업 |
 * ---------------------------------------------------------------------------------
 **/

// changeColor ID element 를 취득
let changeColor = document.getElementById("changeColor");
let defaultColor = document.getElementById("whiteColor");
let deleteBtn = document.getElementById("deleteButton");

// 스토리지에 저장되어 있는 컬러가 있다면 표시
chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// 배경색 버튼을 클릭하였을 경우 이벤트 등록
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

defaultColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setWhiteBackgroundColor,
  });
});

deleteBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: removeAdsByClass,
    args: [
      [
        "service_icon type_mail",
        "event_bg",
        "MyView-module__link_login___HpHMW",
      ],
    ],
  });
});
/**
 * @description 현재 웹 페이지의 Body 요소의 배경색을 변경해주는 함수
 **/
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.background = color;
  });
}

/**
 * @description 현재 웹 페이지의 Body 요소의 배경색을 흰색으로 변경해주는 함수
 **/
function setWhiteBackgroundColor() {
  document.body.style.backgroundColor = "white";
}

/**
 * @description 현재 웹 페이지의 gfp_sf_body 라는 아이디를 가진거 삭제
 **/
// function removeAdById(adId) {
//   try {
//     const adElement = document.getElementById(adId);
//     if (adElement) {
//       adElement.remove();
//     } else {
//       console.error("광고 요소를 찾을 수 없습니다:", adId);
//     }
//   } catch (error) {
//     console.error("광고를 제거하는 중 오류 발생:", error);
//   }
// }

// function removeAdsByClass(className) {
//   try {
//     // 클래스 이름으로 모든 요소를 찾습니다.
//     const adElements = document.getElementsByClassName(className);
//     // HTMLCollection을 배열로 변환합니다.
//     const elementsArray = Array.from(adElements);

//     console.log(className);
//     // 모든 요소를 순회하면서 삭제합니다.
//     elementsArray.forEach((element) => {
//       element.remove();
//     });
//   } catch (error) {
//     console.error("광고를 제거하는 중 오류 발생:", error);
//   }
// }

function removeAdsByClass(classNames) {
  classNames.forEach((className) => {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
      elements[0].remove();
    }
  });
}
