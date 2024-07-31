document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoDeadline = document.getElementById("todo-deadline");
  const todoList = document.getElementById("todo-list");

  // Load todos from local storage
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  const saveTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
  };

  const renderTodos = () => {
      todoList.innerHTML = "";
      todos.forEach((todo, index) => {
          const li = document.createElement("li");
          li.className = `todo-item ${todo.completed ? "completed" : ""}`;
          li.innerHTML = `
              <span>${todo.text} (Due: ${new Date(todo.deadline).toLocaleString()})</span>
              <div>
                  <button onclick="toggleComplete(${index})">${todo.completed ? "Undo" : "Complete"}</button>
                  <button onclick="deleteTask(${index})">Delete</button>
              </div>
          `;
          todoList.appendChild(li);
      });
  };

  window.toggleComplete = (index) => {
      todos[index].completed = !todos[index].completed;
      saveTodos();
      renderTodos();
  };

  window.deleteTask = (index) => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
  };

  todoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const newTodo = {
          text: todoInput.value,
          deadline: todoDeadline.value,
          completed: false,
      };
      todos.push(newTodo);
      saveTodos();
      renderTodos();
      todoForm.reset();
  });

  renderTodos();
});
