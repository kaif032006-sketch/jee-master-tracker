// ===== JEE Countdown =====
const examDate = new Date("2027-01-20");
const countdown = document.getElementById("countdown");

function updateCountdown() {
    const today = new Date();
    const diff = examDate - today;

    if (diff <= 0) {
        countdown.textContent = "🎉 Best of Luck!";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    countdown.textContent = days + " Days Left";
}

updateCountdown();


// ===== Elements =====
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");


// ===== Load Tasks =====
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// ===== Save Tasks =====
function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// ===== Progress =====
function updateProgress(){

    const total = tasks.length;

    const completed = tasks.filter(task => task.done).length;

    const percent = total === 0 ? 0 : Math.round((completed/total)*100);

    progressBar.value = percent;

    progressText.textContent = percent + "% Completed";
}


// ===== Render =====
function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        const div=document.createElement("div");

        div.className="task";

        div.innerHTML=`
        <label>
            <input type="checkbox" ${task.done ? "checked":""}>
            ${task.text}
        </label>

        <button class="deleteBtn">❌</button>
        `;

        const checkbox=div.querySelector("input");

        checkbox.addEventListener("change",()=>{

            tasks[index].done=checkbox.checked;

            saveTasks();

            updateProgress();

        });

        div.querySelector(".deleteBtn").addEventListener("click",()=>{

            tasks.splice(index,1);

            saveTasks();

            renderTasks();

        });

        taskList.appendChild(div);

    });

    updateProgress();

}


// ===== Add Task =====
addTaskBtn.addEventListener("click",()=>{

    const text=taskInput.value.trim();

    if(text==="") return;

    tasks.push({

        text:text,

        done:false

    });

    taskInput.value="";

    saveTasks();

    renderTasks();

});


// ===== Start =====
renderTasks();
