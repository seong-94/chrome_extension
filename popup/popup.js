document.addEventListener("DOMContentLoaded", function () {
  let functionWrapperCount = 4; // 생성하려는 function-wrapper 요소의 수
  for (let i = 0; i < functionWrapperCount; i++) {
    createFunctionWrapper(i);
  }
});

function createFunctionWrapper(id) {
  // function-wrapper 생성
  let functionWrapper = document.createElement("div");
  functionWrapper.setAttribute("class", "function-wrapper");
  functionWrapper.setAttribute("id", "buttonId" + id); // 개별 ID 부여

  // 첫 번째 div 생성
  let div1 = document.createElement("div");
  div1.textContent = "채팅창 닉네임 색상 적용 " + id; // 개별적인 설명 추가

  // 두 번째 div 및 checkbox 생성
  let div2 = document.createElement("div");
  div2.setAttribute("class", "checkbox-wrapper");
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "sc-gJwTLC ikxBAC");
  checkbox.setAttribute("id", "checkbox" + id); // 개별적인 ID 부여
  div2.appendChild(checkbox);

  functionWrapper.appendChild(div1);
  functionWrapper.appendChild(div2);

  // checkbox에 change 이벤트 리스너 추가
  checkbox.addEventListener("change", function () {
    let message = this.checked ? "enable-color" : "disable-color";

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: message });
    });
  });

  // body에 function-wrapper 추가
  document.body.appendChild(functionWrapper);
}
