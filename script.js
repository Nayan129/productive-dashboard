// ................ Landing Page Logic ...................
function landingPageData() {
  let header = document.querySelector("header");

  const API_KEY = CONFIG.WEATHER_API_KEY;

  function timeDate(data) {
    let landingPageData = "";
    const totalDaysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let now = new Date();
    let date = now.getDate();
    let dayOfWeek = totalDaysOfWeek[now.getDay()];
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let month = months[now.getMonth()];
    let year = now.getFullYear();

    // it is for 24 to 12 hours conversion and minutes into 2 digit format logic

    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    landingPageData += `
        
        <div class="header-1">
          <h2>${date} ${month}, ${year}</h2>
          <h1>${dayOfWeek}, ${hours}:${minutes}:${seconds} ${ampm}</h1>
          <h4>${data.name}</h4>
        </div>

        <div class="header-2">
          <h2>${Math.round(data.main.temp)} °C
</h2>
          <h4>${data.weather[0].description}</h4>
          <h4>Humidity: ${data.main.humidity}%</h4>
          <h4>${(data.wind.speed * 3.6).toFixed(1)} km/h</h4>
        </div>`;

    header.innerHTML = landingPageData;
  }

  async function fetchWeatherData() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Nagpur&units=metric&appid=${API_KEY}`
      );
      let data = await response.json();

      timeDate(data);
      setInterval(() => {
        timeDate(data);
      }, 1000);
    } catch (error) {
      console.error("Weather API Error:", error);
      header.innerHTML = "<h2>Unable to load weather data</h2>";
    }
  }

  fetchWeatherData();
}
landingPageData();

// ............ fullTasks Openfeature Logic ..............
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
      allTasksSection.style.display = "block";
    });
  });
}
openFeatures();
// ............. todo list logic .....................
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
todoList();

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
    let savedData = dayPlanData[idx] || "";
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
dailyPlanner();

// ............. Motivation Quotes logic ..................

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
motivationalQuote();

// ............. Pomodoro Timer Logic .....................

function PomodoroTimer() {
  let timer = document.querySelector(".pomo-timer h1");
  let startBtn = document.querySelector(".pomo-timer .start-timer");
  let pauseBtn = document.querySelector(".pomo-timer .pause-timer");
  let resetBtn = document.querySelector(".pomo-timer .reset-timer");
  let displaySession = document.querySelector(".timer-fullTasks .session");

  let timerInterval = null;
  let totalseconds = 25 * 60;

  startBtn.disabled = false;
  let isWorkSession = true;

  function updateTimer() {
    let minutes = Math.floor(totalseconds / 60);
    let seconds = totalseconds % 60;
    timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }

  function startTimer() {
    clearInterval(timerInterval);
    startBtn.disabled = true;

    if (isWorkSession) {
      if (totalseconds === 0) totalseconds = 25 * 60;

      displaySession.innerHTML = "Work Session";
      displaySession.style.backgroundColor = "green";

      timerInterval = setInterval(() => {
        if (totalseconds > 0) {
          totalseconds--;
          updateTimer();
        } else {
          isWorkSession = false;
          totalseconds = 0;
          clearInterval(timerInterval);
          totalseconds = 5 * 60;
          updateTimer();
          startBtn.disabled = false;
          displaySession.innerHTML = "Break";
          displaySession.style.backgroundColor = "blue";
        }
      }, 1000);
    } else {
      if (totalseconds === 0) totalseconds = 5 * 60;

      displaySession.innerHTML = "Break";
      displaySession.style.backgroundColor = "blue";

      timerInterval = setInterval(() => {
        if (totalseconds > 0) {
          totalseconds--;
          updateTimer();
        } else {
          isWorkSession = true;
          totalseconds = 0;
          clearInterval(timerInterval);
          totalseconds = 25 * 60;
          updateTimer();
          startBtn.disabled = false;
          displaySession.innerHTML = "Work Session";
          displaySession.style.backgroundColor = "green";
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
  }

  function resetTimer() {
    clearInterval(timerInterval);
    displaySession.innerHTML = "Work Session";
    displaySession.style.backgroundColor = "green";
    isWorkSession = true;
    startBtn.disabled = false;
    totalseconds = 25 * 60;
    updateTimer();
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}
PomodoroTimer();
