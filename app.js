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
