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
    <input type="checkbox" class="todo-checkbox">
              <span class="todo-text">${todosInputValue}</span>
              <button class="delete-btn">Delete</button>
    `;
    todoList.appendChild(todoItems);
    todoInput.value = "";
  }
}

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
    isValidMsg.textContent = ""; //clear any previous message.
  }

  addTodos();
});
