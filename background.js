/**
 * ---------------------------------------------------------------------------------
 * | 백그라운드 |
 * ---------------------------------------------------------------------------------
 **/
// 초기 상태 설정
chrome.storage.local.set({
  applyRandomPastelColorsToNewLinks: false, // 초기 값을 false로 설정
});

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.action === "toggle-applyRandomPastelColorsToNewLinks") {
//     chrome.storage.local.get("applyRandomPastelColorsToNewLinks", (data) => {
//       chrome.storage.local.set(
//         {
//           applyRandomPastelColorsToNewLinks: !data.applyRandomPastelColorsToNewLinks,
//         },
//         () => {
//           // 현재 활성 탭에 메시지를 전송합니다.
//           chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//             chrome.tabs.sendMessage(tabs[0].id, {
//               action: "update-applyRandomPastelColorsToNewLinks",
//               value: data.applyRandomPastelColorsToNewLinks,
//             });
//           });
//         }
//       );
//     });
//   }
// });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "toggle-applyRandomPastelColorsToNewLinks") {
    chrome.storage.local.get("applyRandomPastelColorsToNewLinks", (data) => {
      const newValue = !data.applyRandomPastelColorsToNewLinks;
      chrome.storage.local.set({ applyRandomPastelColorsToNewLinks: newValue }, () => {
        // 모든 탭에 대해 메시지를 전송합니다.
        chrome.tabs.query({}, function (tabs) {
          tabs.forEach((tab) => {
            chrome.tabs.sendMessage(tab.id, {
              action: "update-applyRandomPastelColorsToNewLinks",
              value: newValue,
            });
          });
        });
      });
    });
  }
});
