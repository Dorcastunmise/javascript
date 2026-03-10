const todoList = [];

function addTodo(cls){
  const inputField = document.querySelector(`.${cls}`);
  const inputValue = inputField.value;

  todoList.push(inputValue);
  inputField.value = '';
}

function renderTodo(cls) {
  addTodo(cls);
  let todoListHtml = '';

  for(let i = 0; i < todoList.length; i++) {
    const todo = todoList[i];
    const htmlDisplay = `<p>${todo}</p>`;
    todoListHtml += htmlDisplay;
    document.querySelector('.display-html').innerHTML = todoListHtml;
  }
}
