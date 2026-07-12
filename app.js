```javascript
// ===== JEE Countdown =====
const examDate = new Date("2027-01-20");
const countdown = document.getElementById("countdown");

function updateCountdown() {
    const today = new Date();
    const diff = examDate - today;

    if (diff <= 0) {
        countdown.innerText = "🎉 Best of Luck!";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    countdown.innerText = days + " Days Left";
}

updateCountdown();

// ===== Save Checkboxes =====
const checkboxes = document.querySelectorAll("input[type='checkbox']");

checkboxes.forEach((box, index) => {
    const saved = localStorage.getItem("task" + index);

    if (saved === "true") {
        box.checked = true;
    }

    box.addEventListener("change", () => {
        localStorage.setItem("task" + index, box.checked);
        updateProgress();
    });
});

// ===== Progress =====
function updateProgress() {
    const total = checkboxes.length;
    let completed = 0;

    checkboxes.forEach(box => {
        if (box.checked) completed++;
    });

    const percent = Math.round((completed / total) * 100);

    document.querySelector("progress").value = percent;
    document.querySelector("progress").nextElementSibling.innerText =
        percent + "% Completed";
}

updateProgress();
```

