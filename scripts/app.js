const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Ambil data dari localStorage saat halaman dibuka
window.addEventListener("load", loadTasks);

addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        addTaskToList(taskText);
        saveTask(taskText);
        taskInput.value = "";
    }
});

    function addTaskToList(taskText){
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";
        
        const textSpan = document.createElement("span");
        textSpan.textContent = taskText;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Hapus";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", () => {
            taskList.removeChild(taskItem);
            removeTask(taskText);
        });

        taskItem.appendChild(textSpan);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
    }

    function saveTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTaskToList(task));
    }

    function removeTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }