/**
 * ---------------------------------------------------------------------------------
 * | 팝업 |
 * ---------------------------------------------------------------------------------
 **/
window.onload = function () {
  let functionWrapperCount = 4; // 생성하려는 function-wrapper 요소의 수
  for (let i = 0; i < functionWrapperCount; i++) {
    createFunctionWrapper(i);
  }
};

function createFunctionWrapper(id) {
  // function-wrapper 생성
  let functionWrapper = document.createElement("div");
  functionWrapper.setAttribute("id", "fw" + id); // 개별 ID 부여
  functionWrapper.setAttribute("class", "function-wrapper");
  // 첫 번째 div 생성
  let div1 = document.createElement("div");
  div1.textContent = "채팅창 닉네임 색상 적용";
  functionWrapper.appendChild(div1);

  // 두 번째 div 생성
  let div2 = document.createElement("div");
  div2.setAttribute("class", "checkbox-wrapper");
  functionWrapper.appendChild(div2);

  // checkbox 생성
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "sc-gJwTLC ikxBAC");
  div2.appendChild(checkbox);

  // body에 function-wrapper 추가
  document.body.appendChild(functionWrapper);
}
