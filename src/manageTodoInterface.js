

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
    if (theTodo.getIsCompleted === 1) {
        input1.checked = true;
    }
    left.appendChild(input1);

    const titleTodo = document.createElement('div');
    titleTodo.textContent = `${theTodo.getTitle} (Due: ${theTodo.getDueDate})`;
    left.appendChild(titleTodo);

    const icon2 = document.createElement('img');
    icon2.setAttribute('src', 'icons/plus.png');
    icon2.classList.add('edit');
    right.appendChild(icon2);

    const icon3 = document.createElement('img');
    icon3.setAttribute('src', 'icons/plus.png');
    icon3.classList.add('icon');
    right.appendChild(icon3);

    const icon4 = document.createElement('img');
    icon4.setAttribute('src', 'icons/plus.png');
    icon4.classList.add('icon');
    right.appendChild(icon4);

    const icon5 = document.createElement('img');
    icon5.setAttribute('src', 'icons/plus.png');
    icon5.classList.add('delete');
    right.appendChild(icon5);

    return aTodo;
}


// change todo header
export function changeTodoHeader(todoHeader, listNumber, title) {
    if (listNumber === null) {
        todoHeader.firstElementChild.textContent = title;
    }
    todoHeader.setAttribute('list-number', `${listNumber}`);
    todoHeader.firstElementChild.textContent = title;
}

// show all todos of a particular list
export function showListsTodos(allTodos, listNumber) {
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


export function deleteRelatedTodo(container, allTodos, listNumber){
    for (let todo of allTodos) {
        const list_num = todo.getAttribute('list-number');
        if (list_num === listNumber) {
            container.removeChild(todo);
        }
    }
}


function setPriorityValue(selectedOne, priorityInput) {

    let input = priorityInput.firstElementChild;
    while (true) {
        if (input.getAttribute('value') === selectedOne) {
            input.selected = true;
            break;
        }
        input = input.nextElementSibling;
    }
}


export function editTodo(element, editModal, lists) {
    let listNumber = element.getAttribute('list-number');
    let todoNumber = element.getAttribute('todo-number');
    let theTodo = lists[parseInt(listNumber)].getTodos[parseInt(todoNumber)];
    theTodo.setTitle = 'hi there';
    let editForm = editModal.firstElementChild.nextElementSibling;
    editForm.firstElementChild.value = theTodo.getTitle;
    editForm.firstElementChild.nextElementSibling.lastElementChild.value = theTodo.getDueDate;
    const selectedOne = theTodo.getPriority;
    let priorityInput = editForm.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild;
    setPriorityValue(selectedOne, priorityInput);
    priorityInput.parentNode.nextElementSibling.value = theTodo.getDescription;

    return theTodo;
}


export function updateTodoDOM(theTodo, todoDOM) {
    todoDOM.firstElementChild.firstElementChild.lastElementChild.textContent = `${theTodo.getTitle} (Due: ${theTodo.getDueDate})`;
    todoDOM.firstElementChild.nextElementSibling.textContent = `${theTodo.getDescription}`
} 



        // <div class="edit-todo-modal" id="hide">
        //     <h2 class="todo-modal-header">Edit Task</h2>

        //     <form class="edit-form" action="#">
        //         <input id="todo-name" type="text" name="todo-name" maxlength="50" placeholder="Title" required>
        //         <div class="due-date">
        //             <label for="due-date">Due Date:</label>
        //             <input id="due-date" type="date" name="due-date">
        //         </div>
        //         <div class="priority">
        //             <label for="priority">Select Priority (Optional)</label>
        //             <select name="priority" id="priority">
        //                 <option value="none" selected>None</option>
        //                 <option value="high">High</option>
        //                 <option value="medium">Medium</option>
        //                 <option value="normal">Normal</option>
        //             </select>
        //         </div>
        //         <textarea name="description" id="description" cols="30" rows="10" maxlength="300" placeholder="give some description (optional)"></textarea>
        //         <div class="add-cancel">
        //             <button type="submit" class="modal-todo">Save</button>
        //             <button type="reset" class="cancel-todo">Cancel</button>
        //         </div>
        //     </form>
        // </div>

