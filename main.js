let selectedFont = "Kumbh Sans";
let selectedColor = "orange";
let tempSelectedColor = "orange";
let pomodoroTime = 25;
let shortBreakTime = 5;
let longBreakTime = 15;
let tempPomodoroTime = 0;
let tempShortBreakTime = 5;
let tempLongBreakTime = 15;
let pomodoroTimeLeft = 0;
let shortBreakTimeLeft = 0;
let longBreakTimeLeft = 0;
let pomodoroTotalSeconds = pomodoroTime * 60;
let shortBreakTotalSeconds = shortBreakTime * 60;
let longBreakTotalSeconds = longBreakTime * 60;
let timerInterval = null;

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const restartBtn = document.getElementById("restart");
const arrowUpBtns = document.querySelectorAll(".arrow-up");
const arrowDownBtns = document.querySelectorAll(".arrow-down");

const progressBarCircle = document.querySelector(".progress-bar-circle");

const setProgress = (percent) => {
  const circumference = 2 * Math.PI * progressBarCircle.r.baseVal.value;
  const offset = circumference - (percent / 100) * circumference;
  progressBarCircle.style.strokeDasharray = `${circumference} ${circumference}`;
  progressBarCircle.style.strokeDashoffset = offset;
};

const reset = () => {
  // get id of active tab
  const activeTabId = document.querySelector(".tab.active").getAttribute("id");
  let totalSeconds = 0;
  if (activeTabId === "pomodoro") {
    totalSeconds = pomodoroTotalSeconds;
  } else if (activeTabId === "short-break") {
    totalSeconds = shortBreakTotalSeconds;
  } else if (activeTabId === "long-break") {
    totalSeconds = longBreakTotalSeconds;
  }

  // stopping setInterval from running
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  setProgress(100);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  document.getElementById("minutes").innerText =
    minutes < 10 ? `0${minutes}` : minutes;
  document.getElementById("seconds").innerText =
    seconds < 10 ? `0${seconds}` : seconds;

  pauseBtn.classList.add("hide");
  restartBtn.classList.add("hide");
  startBtn.classList.remove("hide");
};
reset();

// get all tab elements
const tabs = document.querySelectorAll(".tab");

//looped through all tabs and added click event
tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    const activeTab = document.querySelector(".tab.active");
    activeTab.classList.remove("active", `bg-${selectedColor}`);
    tab.classList.add("active", `bg-${selectedColor}`);
    reset();
  });
});

//get all modal input fields
const inputs = document.querySelectorAll(".input");

// get settings button and open modal on click
const settingsModalBtn = document.getElementById("settings-modal-btn");
settingsModalBtn.addEventListener("click", (e) => {
  tempPomodoroTime = pomodoroTime;
  tempShortBreakTime = shortBreakTime;
  tempLongBreakTime = longBreakTime;
  tempSelectedColor = selectedColor;
  inputs.forEach((input) => {
    const name = input.name;
    // set inputs felds to their values
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

//closing modal
const settingsModal = document.getElementById("settings-modal");

const closeModal = () => {
  settingsModal.classList.remove("show");
};

const modalCloseBtn = document.getElementById("modal-close-btn");
modalCloseBtn.addEventListener("click", (e) => {
  closeModal();
});

// add input eventlistener
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    const name = e.target.name;

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

// arrows
arrowUpBtns.forEach((arrowUpBtn) => {
  arrowUpBtn.addEventListener("click", (e) => {
    const inputId = e.target.getAttribute("data-name");
    const inputElement = document.getElementById(inputId);
    inputElement.value++;

    const name = inputElement.name;

    //keep a temporary value of input
    switch (name) {
      case "pomodoro":
        tempPomodoroTime = inputElement.value;
        break;
      case "short-break":
        tempShortBreakTime = inputElement.value;
        break;
      case "long-break":
        tempLongBreakTime = inputElement.value;
        break;
      default:
        break;
    }
  });
});
arrowDownBtns.forEach((arrowDownBtn) => {
  arrowDownBtn.addEventListener("click", (e) => {
    const inputId = e.target.getAttribute("data-name");
    const inputElement = document.getElementById(inputId);
    inputElement.value--;

    const name = inputElement.name;
    switch (name) {
      case "pomodoro":
        tempPomodoroTime = inputElement.value;
        break;
      case "short-break":
        tempShortBreakTime = inputElement.value;
        break;
      case "long-break":
        tempLongBreakTime = inputElement.value;
        break;
      default:
        break;
    }
  });
});

const fonts = document.querySelectorAll(".font-style");
fonts.forEach((font) => {
  font.addEventListener("click", (e) => {
    document.querySelector(".font-style.active").classList.remove("active");
    font.classList.add("active");
    //to get selected font from the data-font attribute
    selectedFont = font.getAttribute("data-font");
  });
});

const colorStyles = document.querySelectorAll(".color-style");
colorStyles.forEach((colorStyle) => {
  colorStyle.addEventListener("click", (e) => {
    const activeColorStyle = document.querySelector(".color-style.active");
    //removing check from current active style
    activeColorStyle.innerHTML = "";
    activeColorStyle.classList.remove("active");
    colorStyle.classList.add("active");
    colorStyle.innerHTML = "&check;";
    tempSelectedColor = colorStyle.getAttribute("data-color");
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

  progressBarCircle.classList.remove(`stroke-${selectedColor}`);
  progressBarCircle.classList.add(`stroke-${tempSelectedColor}`);

  selectedColor = tempSelectedColor;

  document.body.style.fontFamily = selectedFont;
  applyBtn.className = applyBtn.className.replace(
    /\bbg.\w*\b/g,
    `bg-${selectedColor}`
  );
  const activeTab = document.querySelector(".tab.active");
  activeTab.className = activeTab.className.replace(
    /\bbg.\w*\b/g,
    `bg-${selectedColor}`
  );

  reset();
  closeModal();
});

const startTimer = () => {
  startBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");

  const activeTabId = document.querySelector(".tab.active").getAttribute("id");
  let totalSeconds = 0;
  let overAllSeconds = 0;
  if (activeTabId === "pomodoro") {
    totalSeconds = pomodoroTotalSeconds;
    overAllSeconds = pomodoroTotalSeconds;
  } else if (activeTabId === "short-break") {
    totalSeconds = shortBreakTotalSeconds;
    overAllSeconds = shortBreakTotalSeconds;
  } else if (activeTabId === "long-break") {
    totalSeconds = longBreakTotalSeconds;
    overAllSeconds = longBreakTotalSeconds;
  }

  //it runs the function every one second
  timerInterval = setInterval(() => {
    totalSeconds--;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const percentage = (totalSeconds / overAllSeconds) * 100;
    setProgress(percentage);

    document.getElementById("minutes").innerText =
      minutes < 10 ? `0${minutes}` : minutes;
    document.getElementById("seconds").innerText =
      seconds < 10 ? `0${seconds}` : seconds;

    //if timer gets to zerooq
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      pauseBtn.classList.add("hide");
      restartBtn.classList.remove("hide");
      setProgress(100)
    }
  }, 1000);
};

const pauseTimer = () => {
  clearInterval(timerInterval);
  startBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
};

const restartTimer = () => {
  pomodoroTotalSeconds = Number(tempPomodoroTime) * 60;
  startTimer();
  restartBtn.classList.add("hide");
};

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
restartBtn.addEventListener("click", restartTimer);
