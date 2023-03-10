var selectedFont = "Kumbh Sans";
var selectedColor = "#f87070";



const settingsModal = document.getElementById("settings-modal");
const closeModal = () => {
  settingsModal.classList.remove("show");
};

const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    const activeTab = document.querySelector(".tab.active");
    activeTab.classList.remove("active");
    activeTab.style.backgroundColor = "rgba(22, 25, 50, 1)"
    activeTab.style.color = "#d7e0ff"
    tab.classList.add("active");
    tab.style.backgroundColor = selectedColor;
    tab.style.color = "#1e213f"
  });
});

const settingsModalBtn = document.getElementById("settings-modal-btn");
settingsModalBtn.addEventListener("click", (e) => {
  settingsModal.classList.add("show");
});

const modalCloseBtn = document.getElementById("modal-close-btn");
modalCloseBtn.addEventListener("click", (e) => {
  closeModal();
});

const fonts = document.querySelectorAll(".font-style");
fonts.forEach((font) => {
  font.addEventListener("click", (e) => {
    document.querySelector(".font-style.active").classList.remove("active");
    font.classList.add("active");
    selectedFont = font.getAttribute("data-font");
    // document.body.style.fontFamily = font.getAttribute("data-font")
  });
});

const colorStyles = document.querySelectorAll(".color-style");
colorStyles.forEach((colorStyle) => {
  colorStyle.addEventListener("click", (e) => {
    const activeColorStyle = document.querySelector(".color-style.active");
    activeColorStyle.innerHTML = "";
    activeColorStyle.classList.remove("active");
    colorStyle.classList.add("active");
    colorStyle.innerHTML = "&check;";
    selectedColor = colorStyle.getAttribute("data-color");
  });
});

const applyBtn = document.getElementById("apply-btn");
applyBtn.addEventListener("click", (e) => {
  document.body.style.fontFamily = selectedFont;
  applyBtn.style.backgroundColor = selectedColor;
  document.querySelector(".tab.active").style.backgroundColor = selectedColor;
  document.querySelector(".circle").style.stroke = selectedColor;
  closeModal();
});



