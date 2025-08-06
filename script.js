let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(filter = "all") {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  const filteredTasks = tasks.filter(task =>
    filter === "all" ? true : filter === "completed" ? task.completed : !task.completed
  );

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <input type="checkbox" onchange="toggleComplete(${index})" ${task.completed ? "checked" : ""} />
        <span>${task.text}</span>
      </div>
      <div>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    input.value = "";
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    renderTasks();
  }
}

function filterTasks(filter) {
  renderTasks(filter);
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Initial render
renderTasks();
