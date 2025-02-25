/// This will fetch the id from the dom via html
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const taskControls = document.getElementById("task-controls");
const editBtn = document.getElementById("edit-btn");
const removeBtn = document.getElementById("remove-btn");

// Variable to keep track of the selected task
let selectedTask = null;

//Adding this in for loading tasks! ================================
function loadTasks() {
  const userId = localStorage.getItem('userId');  // Getting the logged-in user's ID
  console.log('User ID:', userId); // Debugging to check if user ID is retrieved correctly

  fetch(`/getTasks?userId=${userId}`)  // We request to the server to get all tasks for this user
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        data.tasks.forEach(task => { //Loops through all tasks and creates a list item
          const taskItem = document.createElement('li');
          taskItem.classList.add('task-item');
          taskItem.textContent = `${task.taskName} (${task.taskStatus})`;
          taskItem.dataset.id = task.task_ID; //Stores the task ID itself

          taskList.appendChild(taskItem); // Appends the task to the task list
        });
      }
    })
    .catch(err => console.error('Error loading tasks:', err)); //Error Handling
}

loadTasks(); // Use of function to load tasks when page loads

// Adding a new task ===============================================
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();
  const userId = localStorage.getItem('userId'); // Fetches the user ID from local storage

  if (taskText !== "" && userId) {
    fetch('/addTask', { // Sends a POST request to create a new task
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        taskName: taskText,
        taskStatus: 'Pending',
        taskDueDate: new Date().toISOString().split('T')[0],
        assignedToUser_ID: userId,
        tasklist_ID: 1
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        const taskItem = document.createElement("li"); // Create a new element
        taskItem.classList.add('task-item');
        taskItem.textContent = taskText;
        taskList.appendChild(taskItem); // Adds the task to the task UI
        taskInput.value = "";
      }
    })
    .catch(err => console.error('Error adding task:', err)); //Error Handling
  }
});

// Edit functionality for the selected task ========================
editBtn.addEventListener("click", function () {
  if (selectedTask) {
    const newText = prompt("Edit Task", selectedTask.textContent.trim());
    if (newText !== null && newText.trim() !== "") {
      const taskId = selectedTask.dataset.id;  // Fetch the task ID

      fetch('/editTask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, newTaskName: newText })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          selectedTask.textContent = newText;
        }
      })
      .catch(err => console.error('Error editing task:', err));
    }
  } else {
    alert("Please select a task to edit.");
  }
});

// Remove functionality for the selected task =======================
removeBtn.addEventListener("click", function () {
  if (selectedTask) {
    const taskId = selectedTask.dataset.id;  // Fetch the task ID

    fetch('/removeTask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        selectedTask.remove();
        selectedTask = null; // Reset selected task after removal
      }
    })
    .catch(err => console.error('Error removing task:', err)); //Error Handling
  } else {
    alert("Please select a task to remove.");
  }
});
