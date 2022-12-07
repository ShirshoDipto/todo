

export let todos = [];


export function addNewTodoInterface(container, theTodo) {

    // descriptions goes here

    todos.push(theTodo);

    const aTodo = document.createElement('div');
    aTodo.classList.add('a-todo');
    aTodo.setAttribute('list-number', `${theTodo.getListNumber}`);
    aTodo.setAttribute('todo-number', `${theTodo.getTodoNumber}`);
    container.appendChild(aTodo);

    const aList = document.createElement('div');
    aList.classList.add('a-list');
    aTodo.appendChild(aList);

    const description = document.createElement('div');
    description.classList.add('description');
    description.textContent = theTodo.getDescription;
    aTodo.appendChild(description);

    const collapse = document.createElement('div');
    collapse.classList.add('collapse');
    aTodo.appendChild(collapse);

    const left = document.createElement('div');
    left.classList.add('left');
    aList.appendChild(left);

    const right = document.createElement('div');
    right.classList.add('right');
    aList.appendChild(right);

    const collapseImg = document.createElement('img');
    collapseImg.setAttribute('src', 'icons/plus.png');
    collapseImg.setAttribute('alt', 'collapse icon');
    collapse.appendChild(collapseImg);

    const input1 = document.createElement('input');
    input1.setAttribute('type', 'checkbox');
    input1.setAttribute('id', 'todo-checkbox');
    input1.setAttribute('name', 'todo-checkbox');
    // input1.classList.add('icon');
    left.appendChild(input1);

    const titleTodo = document.createElement('div');
    titleTodo.textContent = `${theTodo.getTitle} (Due: ${theTodo.getDueDate})`;
    left.appendChild(titleTodo);

    const icon2 = document.createElement('img');
    icon2.setAttribute('src', 'icons/plus.png');
    collapseImg.setAttribute('alt', 'icon img');
    icon2.classList.add('icon');
    right.appendChild(icon2);

    const icon3 = document.createElement('img');
    icon3.setAttribute('src', 'icons/plus.png');
    collapseImg.setAttribute('alt', 'icon img');
    icon3.classList.add('icon');
    right.appendChild(icon3);

    const icon4 = document.createElement('img');
    icon4.setAttribute('src', 'icons/plus.png');
    collapseImg.setAttribute('alt', 'icon img');
    icon4.classList.add('icon');
    right.appendChild(icon4);

    const icon5 = document.createElement('img');
    icon5.setAttribute('src', 'icons/plus.png');
    collapseImg.setAttribute('alt', 'icon img');
    icon5.classList.add('delete');
    right.appendChild(icon5);
}


// change todo header
export function changeTodoHeader(todoHeader, listNumber, title) {
    todoHeader.setAttribute('list-number', `${listNumber}`);
    todoHeader.firstElementChild.textContent = title;
}

// show all todos of a particular list
export function showListsTodos(allTodos, listNumber) {
    // method description goes here
    if (allTodos === null) return
    for (let todo of allTodos) {
        if (todo.getAttribute('list-number') === listNumber) {
            todo.removeAttribute('id');
        }
        else {
            todo.setAttribute('id', 'hide');
        }
    }
}



// <div class="a-todo">
//     <div class="a-list">
//         <div class="left">
//             <img class="icon" src="icons/plus.png" alt="">
//             <div>name of the todo</div>
//         </div>
//         <div class="right">
//             <img class="icon" src="icons/plus.png" alt="E">
//             <img class="icon" src="icons/plus.png" alt="U">
//             <img class="icon" src="icons/plus.png" alt="D">
//             <img class="icon" src="icons/plus.png" alt="Del">
//         </div>
//     </div>
//     <div class="description" id="hide">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse ipsam fugiat eum hic ipsum dolorum blanditiis iusto deleniti perferendis enim nisi adipisci iure natus ad maxime, amet, corporis quibusdam aliquam!</div>
//     <div class="collapse">
//         <img src="icons/plus.png" alt="collapse icon">
//     </div>
// </div>

