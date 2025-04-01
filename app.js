const todoForm = document.getElementById("todos-form");
const todoInput = document.getElementById("todo-input");
const isValidMsg = document.getElementById("isValid-msg");
const todoList = document.getElementById("todos-list");
const todoCounter = document.getElementById("todo-counter");

// loading todos and initialize todo counter
loadTodos();
handleTodosCount();

// create adding todo helper function
// make sure remove the white space of input
// check if there is input value
// if there is, create new li element and add todos
// make sure to append child li element to ul
// clear the input for the next todo
function addTodos() {
  let todosInputValue = todoInput.value.trim();

  if (todosInputValue) {
    // Add fragment for performance improvement, i got hint from gemini how should be added
    const fragment = document.createDocumentFragment();
    let todoItems = document.createElement("li");
    todoItems.innerHTML = `
    <input type="checkbox" class="checkedTodo">
              <span class="todo-text">${todosInputValue}</span>
              <button class="delete-btn">x</button>
    `;
    fragment.appendChild(todoItems); //added
    todoList.appendChild(fragment); // changed
    todoInput.value = "";
    handleSaveTodos();
    handleTodosCount();
  }
}

//// save todos in local storage
// create array of todos
// select all todos with queryAll
// iterate over the todos and push them as obj to array
// set them to local storage
function handleSaveTodos() {
  const todos = [];
  let todoItems = todoList.querySelectorAll("li");

  todoItems.forEach((todo) => {
    let todoText = todo.querySelector(".todo-text").textContent;
    let checkedSpan = todo.querySelector(".todo-text");
    let checkedTodo = checkedSpan.classList.contains("checked");
    todos.push({ text: todoText, completed: checkedTodo });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// loading todos from local storage.
// iterate over stored todos and collect them with the inner HTML method.
function loadTodos() {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  // add fragment for performance improvement
  const fragment = document.createDocumentFragment();
  // Clear existing todos to avoid showing duplicate todo
  todoList.innerHTML = "";

  if (savedTodos === todoList) {
    return;
  } else {
    savedTodos.forEach((todo) => {
      let todos = document.createElement("li");
      todos.innerHTML = `
        <input type="checkbox" class="checkedTodo">
        <span class="todo-text ${todo.completed ? "checked" : ""}">${
        todo.text
      }</span>
        <button class="delete-btn">x</button>
      `;
      fragment.appendChild(todos);
    });
    todoList.appendChild(fragment);
  }
}

// handle the todos count
// select all the li and count the length of them
function handleTodosCount() {
  let todos = todoList.querySelectorAll("li");
  todoCounter.textContent = `Your total todo is: ${todos.length}`;
}

// add eventListener to todoList and handle the delete and checkBoxes.
// check if pressed element has class of deleteBtn
// remove the the todo and call the handleSAVE
// check else if the selected checked box has class of checked todo
// toggle the checked class on it
// call the handleSAFE()

todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    let todo = e.target.parentNode;
    todo.remove();
    handleSaveTodos();
    handleTodosCount();
  } else if (e.target.classList.contains("checkedTodo")) {
    let checkedSpan = e.target.nextElementSibling;
    checkedSpan.classList.toggle("checked");
    handleSaveTodos();
  }
});

// attach event listener to form and validate the input before submit.
// remember the event prevent default
// make sure to cut the white spaces
// display the error message using is valid variable
// call the addTodos helper at the end

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!todoInput.value.trim()) {
    isValidMsg.textContent = "Enter your todos.";
    return;
  } else if (todoInput.value.trim().length < 4) {
    isValidMsg.textContent = "todo must be 4 or more characters long.";
    return;
  } else {
    isValidMsg.textContent = "";
  }

  addTodos();
});

// handle dom content loading,
// to ensuring the loadTodos function is called after the DOM is loaded

document.addEventListener("DOMContentLoaded", () => {
  loadTodos();
  handleTodosCount();
  ////
  // check for new user
  // if user is new display welcome message with alert()
  // otherwise display their todos and let them know their last visit
  if (localStorage.getItem("lastVisit")) {
    alert(
      `Welcome back! Your last visit was: ${localStorage.getItem("lastVisit")}`
    );
  } else {
    alert(`Welcome! is This  your first visit?`);
    localStorage.setItem("lastVisit", new Date().toLocaleString());
  }
});
