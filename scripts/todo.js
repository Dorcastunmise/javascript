const todoList = [{
  name: 'Make Dinner',
  dueDate: '12-03-2026'
},{
  name: 'Clean the apartment',
  dueDate: '12-03-2025'
}];


function addTodo(){
  const inputField = document.querySelector('.js-todo-input');
  const inputValue = inputField.value;
  const date = document.querySelector('.js-dueDate');
  const dueDate = date.value;

  todoList.push({
    name: inputValue,
    //dueDate: dueDate
    dueDate // shorthand property
  });
  inputField.value = '';
  renderTodo();
}

document.querySelector('.js-addbtn').addEventListener('click', () => {
  addTodo();
});

function handleKeyInput(event){
  if(event.key == "Enter") {
    addTodo();
  }
}

function renderTodo() {
  
  let todoListHtml = '';

  todoList.forEach((todo, index) => {
    const {name, dueDate} = todo;
    const htmlDisplay = `
      <div>${name}</div>
        <div>${dueDate}</div>
          <button 
            class="delete-btn js-delete-btn"
          >
            Delete
          </button>
      `;
    todoListHtml += htmlDisplay;  
  }, );

  /*
  for(let i = 0; i < todoList.length; i++) {
    const todo = todoList[i];
    
    const todoName = todo.name;
    const todoDueDate = todo.dueDate;
    
   const {name, dueDate} = todo;


    const htmlDisplay = `
      <div>${name}</div>
        <div>${dueDate}</div>
          <button 
            class="delete-btn"
            onclick="
            todoList.splice(${i}, 1);
            renderTodo();
            "
          >
            Delete
          </button>
      `;
    todoListHtml += htmlDisplay;   
    
  }
  */

  document.querySelector('.display-html').innerHTML = todoListHtml;

  /*
    This addEventListener() is used instead of using 
      onclick="
        todoList.splice(${index}, 1);
        renderTodo();
      "
  */
 
  document.querySelectorAll('.js-delete-btn')
  .forEach((deleteBtn, index) => {
    deleteBtn.addEventListener('click', () => {
      todoList.splice(index, 1);
      renderTodo();
    });
  });
}

renderTodo();
