/**
 * ---------------------------------------------------------------------------------
 * | 백그라운드 |
 * ---------------------------------------------------------------------------------
 * - 디폴트 컬러를 지정하여 스토리지 API 를 호출하여 지정한 색을 저장시킵니다.
 **/
let color = "#4B80C2";
let color1 = "#ADB5BD";
let color2 = "#4F5161";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color, color1, color2 });
  console.log("기본 배경색은 %cgreen", `color: ${color}`);
});
