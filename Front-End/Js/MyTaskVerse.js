// This will fetch the id from the dom via html
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const taskControls = document.getElementById("task-controls");
const editBtn = document.getElementById("edit-btn");
const removeBtn = document.getElementById("remove-btn");

// Variable to keep track of the selected task
let selectedTask = null;

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        taskItem.textContent = `${taskText}`;

        // Event listener to select a task when clicked
        taskItem.addEventListener("click", function () {
            if (selectedTask) {
                selectedTask.classList.remove("selected");
            }
            selectedTask = taskItem;
            selectedTask.classList.add("selected");
        });

        taskList.appendChild(taskItem);
        taskInput.value = ""; // Reset input after adding the task
    }
});

// Edit functionality for the selected task
editBtn.addEventListener("click", function () {
    if (selectedTask) {
        const newText = prompt("Edit Task", selectedTask.textContent.trim());
        if (newText !== null && newText.trim() !== "") {
            selectedTask.textContent = newText.trim();
        }
    } else {
        alert("Please select a task to edit.");
    }
});

// Remove functionality for the selected task
removeBtn.addEventListener("click", function () {
    if (selectedTask) {
        selectedTask.remove();
        selectedTask = null; // Reset selected task after removal
    } else {
        alert("Please select a task to remove.");
    }
});