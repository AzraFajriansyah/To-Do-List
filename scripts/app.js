const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";
        
        const textSpan = document.createElement("span");
        textSpan.textContent = taskText;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Hapus";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", () => {
            taskList.removeChild(taskItem);
        });

        taskItem.appendChild(textSpan);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
        
        taskInput.value = "";
    }
});