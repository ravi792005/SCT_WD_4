let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById('task-list');
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
  li.innerHTML = `
  <div>
    <strong>${task.title}</strong> 
    <span class="category-label">${task.category}</span><br>
    ${task.date} ${task.time}
  </div>
  <div class="task-buttons">
    <button onclick="toggleComplete(${index})">Complete</button>
    <button onclick="editTask(${index})">Edit</button>
    <button onclick="deleteTask(${index})">Delete</button>
  </div>
`;


    list.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
}

function editTask(index) {
  const task = tasks[index];
  document.getElementById('task-title').value = task.title;
  document.getElementById('task-category').value = task.category;
  document.getElementById('task-date').value = task.date;
  document.getElementById('task-time').value = task.time;
  deleteTask(index);
}

document.getElementById('task-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('task-title').value;
  const category = document.getElementById('task-category').value;
  const date = document.getElementById('task-date').value;
  const time = document.getElementById('task-time').value;

  if (title && category && date && time) {
    tasks.push({ title, category, date, time, completed: false });
    saveTasks();
    this.reset();
  }
});

renderTasks();
