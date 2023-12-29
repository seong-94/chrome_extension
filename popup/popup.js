document.addEventListener("DOMContentLoaded", function () {
  // function-wrapper 요소를 생성합니다.
  createFunctionWrapper(0);

  // 생성된 function-wrapper 내부의 체크박스에 대한 참조를 가져옵니다.
  const checkbox = document.getElementById("buttonId0");

  // 체크박스가 존재하는지 확인하고, change 이벤트 리스너를 등록합니다.
  if (checkbox) {
    checkbox.addEventListener("change", function () {
      chrome.runtime.sendMessage({
        action: "toggle-applyRandomPastelColorsToNewLinks",
      });
    });
  } else {
    console.error("체크박스를 찾을 수 없습니다: #checkbox0");
  }
});

function createFunctionWrapper(id) {
  // function-wrapper 생성
  let functionWrapper = document.createElement("div");
  functionWrapper.setAttribute("class", "function-wrapper");
  functionWrapper.setAttribute("id", "buttonId" + id);

  // 첫 번째 div 생성
  let div1 = document.createElement("div");
  div1.textContent = "채팅창 닉네임 색상 적용 ";

  // 두 번째 div 및 checkbox 생성
  let div2 = document.createElement("div");
  div2.setAttribute("class", "checkbox-wrapper");
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "sc-gJwTLC ikxBAC");
  checkbox.setAttribute("id", "checkbox" + id);

  // 설정 값을 조회하여 체크박스 상태를 결정합니다.
  chrome.storage.local.get("applyRandomPastelColorsToNewLinks", function (data) {
    if (data.applyRandomPastelColorsToNewLinks) {
      checkbox.checked = true; // true일 때 체크합니다.
    } else {
      checkbox.checked = false; // false일 때 체크하지 않습니다.
    }
  });

  div2.appendChild(checkbox);

  functionWrapper.appendChild(div1);
  functionWrapper.appendChild(div2);

  // body에 function-wrapper 추가
  document.body.appendChild(functionWrapper);
}
