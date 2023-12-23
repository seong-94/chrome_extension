/**
 * ---------------------------------------------------------------------------------
 * | 팝업 |
 * ---------------------------------------------------------------------------------
 **/

document.getElementById("toggle").addEventListener((message, sender, sendRspose) => {
  if (message.action === "toggleDisplay") {
    const elements = document.querySelectorAll(".chat_area dl img");
    elements.forEach((element) => {
      element.style.display = element.style.display === "none" ? "block" : "none";
    });
  }
});
