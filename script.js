function openFeatures() {
  const allTasksSection = document.querySelector(".allTasks");
  let allTasks = document.querySelectorAll(".elem");
  let separateTasks = document.querySelectorAll(".separateTasks");
  let separateTasksBackBtn = document.querySelectorAll(".backBtn");

  allTasks.forEach((elem) => {
    elem.addEventListener("click", () => {
      allTasksSection.style.display = "none";
      separateTasks[elem.id].style.display = "block";
    });
  });

  separateTasksBackBtn.forEach((back) => {
    back.addEventListener("click", () => {
      separateTasks[back.id].style.display = "none";
      allTasksSection.style.display = "flex";
    });
  });
}
openFeatures();
// ............. todo list logic .................
function todoList() {
  var currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  }

  // here we write logic of input field that redner on allTaskSection

  function renderTask() {
    let allInputTasks = document.querySelector(".allInputTasks");
    var sum = "";

    currentTask.forEach((elem, idx) => {
      sum += ` 
      <div class="displayInputTasks">
        <h3>${elem.task}  ${elem.imp ? "<span>imp</span>" : ""}</h3>
        <button type="button" id=${idx}>Mark as Completed</button>
      </div>
      `;
    });

    allInputTasks.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    // this is to make markbtn working .....

    const markAsReadBtn = document.querySelectorAll(
      ".displayInputTasks button"
    );
    markAsReadBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  renderTask();

  let form = document.querySelector(".inputTasks form");
  let taskInput = document.querySelector(".inputTasks form #taskInput");
  let taskDetailsInput = document.querySelector(".inputTasks form #textarea");
  let taskCheckbox = document.querySelector(".inputTasks form #check");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    currentTask.push({
      task: taskInput.value,
      detail: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });
    taskInput.value = "";
    taskDetailsInput.value = "";
    taskCheckbox.checked = false;

    renderTask();
  });
}
// todoList();

// ............. Daily planner Logic .................
function dailyPlanner() {
  let dayPlanner = document.querySelector(".day-planner");

  const today = new Date().toDateString();
  const savedDate = localStorage.getItem("dayPlanDate");

  if (savedDate !== today) {
    localStorage.removeItem("dayPlanData");
    localStorage.setItem("dayPlanDate", today);
  }

  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  let hours = Array.from(
    { length: 18 },
    (elem, idx) => `${6 + idx}:00 - ${7 + idx}:00`
  );

  let fullDaySum = "";
  hours.forEach((elem, idx) => {
    savedData = dayPlanData[idx] || "";
    fullDaySum += `<div class="day-planner-time">
            <p>${6 + idx}:00 - ${7 + idx}:00</p>
            <input id = ${idx} type="text" placeholder="..." value = "${savedData}"/>
          </div>`;
  });
  dayPlanner.innerHTML = fullDaySum;

  let dayPlannerInput = document.querySelectorAll(".day-planner input");
  dayPlannerInput.forEach((elem) => {
    elem.addEventListener("input", () => {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
// dailyPlanner();

// ............. Motivation Quotes logic ................

function motivationalQuote() {
  let motivation2 = document.querySelector(".motivation-2");
  let motivation3 = document.querySelector(".motivation-3");

  async function fetchQoutes() {
    let response = await fetch("https://dummyjson.com/quotes/random");
    let data = await response.json();
    localStorage.setItem("data", JSON.stringify(data));
    let original = JSON.parse(localStorage.getItem("data"));
    motivation2.innerHTML = `<h1>— ${original.quote}</h1>`;
    motivation3.innerHTML = `<h2>— ${original.author}</h2>`;
    motivation2.classList.add("h1");
  }
  fetchQoutes();
}
// motivationalQuote();

// ............. Pomodoro Timer Logic ..................
let timer = document.querySelector(".pomo-timer h1");
let startBtn = document.querySelector(".pomo-timer .start-timer");
let pauseBtn = document.querySelector(".pomo-timer .pause-timer");
let resetBtn = document.querySelector(".pomo-timer .reset-timer");

let timerInterval = null;
let totalseconds = 25 * 60;

function updateTimer() {
  let minutes = Math.floor(totalseconds / 60);
  let seconds = totalseconds % 60;
  timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (totalseconds <= 0) {
      clearInterval(timerInterval);
      timer = timer.innerHTML;
    } else {
      totalseconds--;
      updateTimer();
    }
  }, 10);
}

function pauseTimer() {
  clearInterval(timerInterval);
}
function resetTimer() {
  clearInterval(timerInterval);
  totalseconds = 25 * 60;
  updateTimer();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
