var selectedFont = "Kumbh Sans";
var selectedColor = "#f87070";
var pomodoroTime = 25;
var shortBreakTime = 5;
var longBreakTime = 15;
var tempPomodoroTime = 0;
var tempShortBreakTime = 5;
var tempLongBreakTime = 15;
var pomodoroTimeLeft = 0;
var shortBreakTimeLeft = 0;
var longBreakTimeLeft = 0;
var pomodoroTotalSeconds = pomodoroTime * 60;
var shortBreakTotalSeconds = shortBreakTime * 60;
var longBreakTotalSeconds = longBreakTime * 60;

const settingsModal = document.getElementById("settings-modal");
const closeModal = () => {
  settingsModal.classList.remove("show");
};

const inputs = document.querySelectorAll(".input");
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    // console.log(e.target.value)
    const name = e.target.name;
    // if (name === "pomodoro") {
    //   pomodoroTime = e.target.value;
    // } else if (name === "short-break") {
    //   shortBreakTime = e.target.value;
    // }else if(name === "long-break"){
    //   longBreakTime = e.target.value
    // }

    switch (name) {
      case "pomodoro":
        tempPomodoroTime = e.target.value;
        break;
      case "short-break":
        tempShortBreakTime = e.target.value;
        break;
      case "long-break":
        tempLongBreakTime = e.target.value;
        break;
      default:
        break;
    }
  });
});

const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    const activeTab = document.querySelector(".tab.active");
    activeTab.classList.remove("active");
    activeTab.style.backgroundColor = "rgba(22, 25, 50, 1)";
    activeTab.style.color = "#d7e0ff";
    tab.classList.add("active");
    tab.style.backgroundColor = selectedColor;
    tab.style.color = "#1e213f";
  });
});

const settingsModalBtn = document.getElementById("settings-modal-btn");
settingsModalBtn.addEventListener("click", (e) => {
  tempPomodoroTime = pomodoroTime;
  tempShortBreakTime = shortBreakTime;
  tempLongBreakTime = longBreakTime;
  inputs.forEach((input) => {
    const name = input.name;
    input.value;

    switch (name) {
      case "pomodoro":
        input.value = pomodoroTime;
        break;
      case "short-break":
        input.value = shortBreakTime;
        break;
      case "long-break":
        input.value = longBreakTime;
        break;
      default:
        break;
    }
  });

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
  pomodoroTime = tempPomodoroTime;
  shortBreakTime = tempShortBreakTime;
  longBreakTime = tempLongBreakTime;

  pomodoroTotalSeconds = Number(tempPomodoroTime) * 60;
  shortBreakTotalSeconds = Number(tempShortBreakTime) * 60;
  longBreakTotalSeconds = Number(tempLongBreakTime) * 60;

  document.body.style.fontFamily = selectedFont;
  applyBtn.style.backgroundColor = selectedColor;
  document.querySelector(".tab.active").style.backgroundColor = selectedColor;
  document.querySelector(".circle").style.stroke = selectedColor;
  closeModal();
});

var toatalSeconds = 0;
var secondsLeft = 1;
var timerInterval = null;
const startPomodoroTimer = () => {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      pomodoroTotalSeconds--;
      const seconds = pomodoroTotalSeconds % 60
      const minutes = Math.floor(pomodoroTotalSeconds / 60)
      document.getElementById("seconds").innerText = seconds < 10 ? `0${seconds}` : seconds;
      document.getElementById("minutes").innerText = minutes < 10 ? `0${minutes}` : minutes;
    }, 1000);
  }
};

document.getElementById("start").addEventListener("click", startPomodoroTimer);
