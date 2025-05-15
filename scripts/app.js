const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Ambil data dari localStorage saat halaman dibuka
window.addEventListener("load", loadTasks);

addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    const taskCategory = document.getElementById("task-category").value;
    const taskPriority = document.getElementById("task-priority").value;
    const taskDeadline = document.getElementById("task-deadline").value;

    if (taskText !== "") {
        const taskObj = { 
            text: taskText,
            category: taskCategory,
            priority: taskPriority,
            deadline: taskDeadline
        };
        addTaskToList(taskObj);
        saveTask(taskObj);
        taskInput.value = "";
    }
});

function addTaskToList(task){
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
        
    const textSpan = document.createElement("span");
    textSpan.textContent = task.text;

    const categoryTag = document.createElement("span");
    categoryTag.className = "task-category";
    categoryTag.textContent = `[${task.category}]`;

    const priorityTag = document.createElement("span");
    const priority = task.priority || "Rendah"; // default jika undefined
    priorityTag.className = `task-priority ${task.priority.toLowerCase()}`;
    priorityTag.textContent = priority;

    const deadlineText = task.deadline ? new Date(task.deadline).toLocaleString() : "Tidak ada deadline";

    const deadlineSpan = document.createElement("span");
    deadlineSpan.className = "task-deadline";
    deadlineSpan.textContent = `Deadline: ${deadlineText}`;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    // Tombol Edit
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";

    editBtn.addEventListener("click", () => {
        const newTask = prompt("Edit tugas:", textSpan.textContent);
        if (newTask && newTask.trim() !== "") {
            updateTask(task.text, newTask.trim());
            textSpan.textContent = newTask.trim();
            task.text = newTask.trim(); // update object
        }
    });

    // Tombol Hapus
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", () => {
        taskList.removeChild(taskItem);
        removeTask(task.text);
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    taskItem.appendChild(textSpan);
    taskItem.appendChild(categoryTag);
    taskItem.appendChild(priorityTag);
    taskItem.appendChild(deadlineSpan);
    taskItem.appendChild(actions);
    taskList.appendChild(taskItem);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToList(task));
}

function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTask(oldText, newText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = tasks.findIndex(task => task.text === oldText);
    if (index !== -1) {
        tasks[index].text = newText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}