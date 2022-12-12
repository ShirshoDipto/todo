

export let lists = [];

export function addNewListInterface(listObject, container, insert_before) {

    lists.push(listObject);

    const aList = document.createElement('div');
    aList.classList.add('a-list');
    aList.setAttribute('list-number', `${listObject.getListNumber}`);
    // aList.setAttribute('id', 'active-list');
    container.insertBefore(aList, insert_before);


    const left = document.createElement('div');
    left.classList.add('left');
    aList.appendChild(left);

    const right = document.createElement('div');
    right.classList.add('right');
    aList.appendChild(right);

    const icon1 = document.createElement('img');
    icon1.classList.add('icon');
    if (listObject.getIsDefault === 1) {
        icon1.setAttribute('src', 'icons/weather-sunny.png');
    }
    else {
        icon1.setAttribute('src', 'icons/todo.png');
    }
    left.appendChild(icon1);

    const listTitle = document.createElement('div');
    listTitle.classList.add('list-title');
    listTitle.textContent = listObject.getTitle;
    left.appendChild(listTitle);

    const icon2 = document.createElement('img');
    icon2.classList.add('edit');
    icon2.setAttribute('src', 'icons/pencil.png');
    right.appendChild(icon2);

    // const icon3 = document.createElement('img');
    // icon3.classList.add('up-arrow');
    // icon3.setAttribute('src', 'icons/arrow-up.png');
    // right.appendChild(icon3);

    // const icon4 = document.createElement('img');
    // icon4.classList.add('down-arrow');
    // icon4.setAttribute('src', 'icons/arrow-down.png');
    // right.appendChild(icon4);

    const icon5 = document.createElement('img');
    icon5.classList.add('delete');
    icon5.setAttribute('src', 'icons/trash.png');
    right.appendChild(icon5);

    return aList;
}


export function removeExistingMarker(container) {
    if (lists.length === 0) return;
    const firstList = container.firstElementChild;
    if (firstList.getAttribute('id') === 'active-list') {
        firstList.removeAttribute('id');
    }
    else {
        let nextList = firstList.nextElementSibling;
        while (true) {
            if (nextList.getAttribute('id') === 'active-list'){
                nextList.removeAttribute('id');
                break;
            }
            nextList = nextList.nextElementSibling;
        }
    }
}


export function updateArrayAndTodo(allTodos) {
    let allTodoIndex = 0;
    for (let i = 0; i < lists.length; i++) {
        lists[i].setListNumber = i;
        if (lists[i].getTodos.length === 0) {
            continue;
        }
        else {
            let todo_no = 0;
            const list_no = lists[i].getListNumber;
            for (let x of lists[i].getTodos) {
                x.setListNumber = i;
                x.setTodoNumber = todo_no;
                let theDOM = allTodos[allTodoIndex];
                theDOM.removeAttribute('list-number');
                theDOM.setAttribute('list-number', `${list_no}`);
                theDOM.removeAttribute('todo-number');
                theDOM.setAttribute('todo-number', `${todo_no}`);
                todo_no++;
                allTodoIndex++;
            }
        }
    }
}

export function updateListsAndTodos(container, listNumber, allTodos) {

    lists.splice(parseInt(listNumber), 1);
    //  update doms
    let index = 0;

    for (let list of container) {
        list.removeAttribute('list-number');
        list.setAttribute('list-number', `${index}`);
        index++;
    }

    // update Array and todo DOM's
    updateArrayAndTodo(allTodos);
}


export function editList(element) {
    const listTitle = element.firstElementChild.lastElementChild;
    listTitle.setAttribute('id', 'hide');

    // create an input Element
    const listNameInput = document.createElement('input');
    listNameInput.setAttribute('type', 'text');
    listNameInput.setAttribute('maxlength', '30');
    listNameInput.required = true;
    listNameInput.value = listTitle.textContent;

    // create the form
    const listNameForm = document.createElement('form');
    listNameForm.setAttribute('action', '#');
    listNameForm.classList.add('edit-list-form')

    element.firstElementChild.appendChild(listNameForm);
    listNameForm.appendChild(listNameInput);
    console.log(element);

    return listNameForm;
}


export function undoChange(element) {
    element.firstElementChild.removeChild(element.firstElementChild.lastElementChild);
    element.firstElementChild.lastElementChild.removeAttribute('id');
}