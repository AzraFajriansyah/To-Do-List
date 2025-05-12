const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";
        taskItem.textContent = taskText;

        taskList.appendChild(taskItem);
        taskInput.value = "";
    }
});