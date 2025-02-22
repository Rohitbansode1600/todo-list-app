document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");

    let li = document.createElement("li");
    li.textContent = taskText;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.onclick = function () {
        taskList.removeChild(li);
        saveTasks();
    };

    li.onclick = function () {
        li.classList.toggle("completed");
        saveTasks();
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = "";
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({ text: li.textContent.replace("X", "").trim(), completed: li.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        let tasks = JSON.parse(storedTasks);
        tasks.forEach(task => {
            let taskList = document.getElementById("taskList");

            let li = document.createElement("li");
            li.textContent = task.text;

            if (task.completed) {
                li.classList.add("completed");
            }

            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "X";
            deleteBtn.onclick = function () {
                taskList.removeChild(li);
                saveTasks();
            };

            li.onclick = function () {
                li.classList.toggle("completed");
                saveTasks();
            };

            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }
}
