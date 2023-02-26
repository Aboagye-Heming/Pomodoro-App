const tabs = document.querySelectorAll(".tab")
tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
        document.querySelector(".tab.active").classList.remove("active") 
        tab.classList.add("active")
    })
});
const settingsModal = document.getElementById("settings-modal");
const settingsModalBtn =document.getElementById("settings-modal-btn")
settingsModalBtn.addEventListener("click", e => {
  settingsModal.classList.add("show")
})

const modalCloseBtn = document.getElementById("modal-close-btn")
modalCloseBtn.addEventListener("click", e => {
    settingsModal.classList.remove("show")
})