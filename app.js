const todoForm = document.getElementById("todos-form");
const todoInput = document.getElementById("todo-input");
const isValidMsg = document.getElementById("isValid-msg");
const todoList = document.getElementById("todos-list");

// create adding todo helper function
// make sure remove the white space of input
// check if there is input value
// if there is, create new li element and add todos
// make sure to append child li element to ul
// clear the input for the next todo
function addTodos() {
  let todosInputValue = todoInput.value.trim();

  if (todosInputValue) {
    let todoItems = document.createElement("li");
    todoItems.innerHTML = `
    <input type="checkbox" class="checkedTodo">
              <span class="todo-text">${todosInputValue}</span>
              <button class="delete-btn">x</button>
    `;
    todoList.appendChild(todoItems);
    todoInput.value = "";
    handleSaveTodos();
    // handleDeleteBtn(todoItems);

    // handleCompletedTodo(todoItems);
  }
}

// cash the delete-btn class
//  add eventlistener to it and call remove item on todo items in cal back func.
function handleDeleteBtn(todoItems) {
  let deleteBtn = todoItems.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    todoItems.remove();
    handleSaveTodos();
  });
}

// cash the checkbox and todo-text classes
// with help of eventlistener toggle on completed todo

function handleCompletedTodo(todoItems) {
  let checkedBox = todoItems.querySelector(".checkedTodo");
  let todoText = todoItems.querySelector(".todo-text");
  //   console.log(todoText);

  checkedBox.addEventListener("click", () => {
    todoText.classList.toggle("checked");
    handleSaveTodos();
  });
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
    let checkedSpan = todo.querySelector("todo-text");
    let checkedTodo = checkedSpan.classList.contains("checked");
    todos.push({ text: todoText, completed: checkedTodo });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
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
