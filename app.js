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
    <input type="checkbox" class="task-checkbox">
              <span class="task-text">${todosInputValue}</span>
              <button class="delete-button">Delete</button>
    `;
    todoList.appendChild(todoItems);
    todosInputValue = "";
    console.log(todoItems);
  }
}

addTodos();
