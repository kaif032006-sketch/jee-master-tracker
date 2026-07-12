// ==========================
// JEE MASTER TRACKER
// ==========================

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load Tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <input type="checkbox">
            ${task}
            <button onclick="deleteTask(${index})">❌</button>
        `;

        taskList.appendChild(div);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

addTaskBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();

    if (task === "") return;

    tasks.push(task);

    saveTasks();
    renderTasks();

    taskInput.value = "";
});

renderTasks();


// ==========================
// JEE COUNTDOWN
// ==========================

const examDate = new Date("January 25, 2027 09:00:00").getTime();

const timer = setInterval(() => {

    const now = new Date().getTime();

    const distance = examDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    document.getElementById("countdown").innerHTML =
        days + " Days Left";

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML =
        "Best of Luck!";
    }

}, 1000);
// ==========================
// AUTO PROGRESS + SAVE
// ==========================

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

// Load saved checkbox states
const savedStates = JSON.parse(localStorage.getItem("checkboxStates")) || [];

checkboxes.forEach((box, index) => {
    if (savedStates[index] !== undefined) {
        box.checked = savedStates[index];
    }
});

function updateProgress() {

    const total = checkboxes.length;
    let completed = 0;

    const states = [];

    checkboxes.forEach(box => {
        states.push(box.checked);

        if (box.checked) completed++;
    });

    localStorage.setItem("checkboxStates", JSON.stringify(states));

    const percent = Math.round((completed / total) * 100);

    progressBar.value = percent;
    progressText.innerHTML = percent + "% Completed";
}

checkboxes.forEach(box => {
    box.addEventListener("change", updateProgress);
});

updateProgress();
// ==========================
// STUDY STREAK
// ==========================

const streakElement = document.querySelector(".box:nth-of-type(3) h1");

let streak = Number(localStorage.getItem("studyStreak")) || 0;
let lastVisit = localStorage.getItem("lastVisit");

const today = new Date().toDateString();

if (lastVisit !== today) {
    streak++;
    localStorage.setItem("studyStreak", streak);
    localStorage.setItem("lastVisit", today);
}

streakElement.textContent = streak + " Days";
// ==========================
// DARK MODE
// ==========================

const themeBtn = document.getElementById("themeBtn");

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
}

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme","dark");
    }else{
        localStorage.setItem("theme","light");
    }

});
// ==========================
// POMODORO TIMER
// ==========================

let time = 25 * 60;
let timerInterval;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

function updateTimer() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    timerDisplay.innerHTML =
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}

startBtn.addEventListener("click", () => {

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {

        if (time > 0) {
            time--;
            updateTimer();
        } else {
            clearInterval(timerInterval);
            alert("🎉 Study Session Complete!");
        }

    },1000);

});

pauseBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
});

resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    time = 25 * 60;
    updateTimer();
});

updateTimer();
