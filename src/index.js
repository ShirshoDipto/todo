import List from './list'
import Todo from './todo'
import {lists, addNewListInterface, removeExistingMarker, updateListsAndTodos, updateArrayAndTodo, editList, undoChange} from './manageListInterface'
import {addNewTodoInterface, changeTodoHeader, showListsTodos, deleteRelatedTodo, editTodo, updateTodoDOM} from './manageTodoInterface'
import {saveData, loadData} from './storageManagement'

let activeListNumber = '0';


function addList(e) {
    console.log(e.target);
    e.preventDefault()
    // manage Array of lists
    let newList = new List(newListinput.value, [], lists.length);
    removeExistingMarker(allList);
    const newListDOM = addNewListInterface(newList, allList, newListModal);
    newListDOM.setAttribute('id', 'active-list');
    const allTodos = Array.from(document.querySelectorAll('.a-todo'));

    // manage todo interface
    changeTodoHeader(todoHeader, newList.getListNumber, newList.getTitle);
    showListsTodos(allTodos, newList.getListNumber.toString());
    activeListNumber = newList.getListNumber.toString();
    newListDOM.onclick = makeListActive;
    e.target.reset();
    newListModal.setAttribute('id', 'hide');
    allList.scrollTo(0, allList.scrollHeight);
    console.log(lists);
    saveData(lists, activeListNumber);
}


function add_a_Todo(e) {
    e.preventDefault()
    // manage Array of lists
    const listNumber = parseInt(todoHeader.getAttribute('list-number'));
    const todoNumber = lists[parseInt(listNumber)].getTodos.length;
    let newTodo = new Todo(todoName.value, description.value, dueDate.value, priority.value, listNumber, 0, todoNumber);
    lists[parseInt(listNumber)].getTodos.push(newTodo);


    // bring the todo interface
    const newTodoDOM = addNewTodoInterface(allTodo, newTodo);
    newTodoDOM.onclick = modifyTodo;

    // hide modal
    newTodoModal.setAttribute('id', 'hide');
    allTodo.scrollTo(0, allTodo.scrollHeight);
    e.target.reset();
    console.table(lists);
    saveData(lists, activeListNumber);
}


function saveEditedList(e) {
    e.preventDefault();
    console.log(activeListNumber);
    let theList = lists[parseInt(activeListNumber)];
    theList.setTitle = e.target.firstElementChild.value;
    e.target.previousElementSibling.textContent = e.target.firstElementChild.value;
    // console.log(e.target.parentNode.parentNode);
    undoChange(e.target.parentNode.parentNode);
    saveData(lists, activeListNumber);
}


function makeListActive(e) {
    // handle delete, up, down, complete
    if (e.target.classList.value === 'delete') {
        deleteElement(this);
    }
    else if (e.target.classList.value === 'edit') {
        const listNameForm = editList(this);
        listNameForm.onsubmit = saveEditedList;
    }
    else {
        removeExistingMarker(allList);
        this.setAttribute('id', 'active-list');
        
        // get the listObject
        let listNumber = this.getAttribute('list-number');
        changeTodoHeader(todoHeader, listNumber, this.firstElementChild.lastElementChild.textContent);
        const allTodos = Array.from(document.querySelectorAll('.a-todo'));
        showListsTodos(allTodos, listNumber);
        activeListNumber = listNumber;
        localStorage.removeItem('activeListNumber');
        localStorage.setItem('activeListNumber', activeListNumber);
    }

    console.log(lists);
}


function showRelatedTodos(x, listNo){
    if (lists.length === 0) {
        changeTodoHeader(todoHeader, null, 'Add a List');
    }
    else if (listNo === `0`) {
        const activeList = document.querySelector('.all-list div[list-number="0"]');
        activeList.setAttribute('id', 'active-list');
        changeTodoHeader(todoHeader, listNo, lists[0].getTitle);
        showListsTodos(x, `0`);
        activeListNumber = '0';
    }
    else {
        const activeList = document.querySelector(`.all-list div[list-number="${parseInt(listNo)-1}"]`);
        activeList.setAttribute('id', 'active-list');
        changeTodoHeader(todoHeader, listNo, lists[parseInt(listNo)-1].getTitle);
        showListsTodos(x, `${parseInt(listNo)-1}`);
        activeListNumber = `${parseInt(listNo)-1}`;
    }
}


function deleteElement(element) {
    if (element.classList.value === 'a-list') {
        const index = element.getAttribute('list-number');
        // removeExistingMarker(allList);
        allList.removeChild(element)
        const container = Array.from(document.querySelectorAll('.a-list'));
        let x = Array.from(document.querySelectorAll('.all-todo .a-todo'));
        deleteRelatedTodo(allTodo, x, index);
        x = Array.from(document.querySelectorAll('.all-todo .a-todo'));
        updateListsAndTodos(container, index, x);
        if (index === activeListNumber) {
            showRelatedTodos(x, index);}
        activeListNumber = document.querySelector('#active-list').getAttribute('list-number');
        console.log(activeListNumber);
    }
    saveData(lists, activeListNumber);
}

function changeCheck(element) {
    if (element.checked === true) {
        element.checked = false;
    }
    else {
        element.checked = true;
    }
}


function updateDatas(theTodo, e) {
    e.preventDefault();
    theTodo.setTitle = e.target.firstElementChild.value;
    theTodo.setDueDate = e.target.firstElementChild.nextElementSibling.lastElementChild.value;
    theTodo.setPriority = e.target.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild.value;
    theTodo.setDescription = e.target.lastElementChild.previousElementSibling.value;
    e.target.parentNode.setAttribute('id', 'hide');
    const todoDOM = document.querySelector(`.all-todo div[todo-number="${theTodo.getTodoNumber}"]`);
    updateTodoDOM(theTodo, todoDOM);
    saveData(lists, activeListNumber);
}


function modifyTodo(e) {
    if (e.target.classList.value === 'delete') {
        const listNumber = this.getAttribute('list-number');
        const todoNumber = this.getAttribute('todo-number');

        // delete todo from the lists Array and the dom
        lists[parseInt(listNumber)].getTodos.splice(parseInt(todoNumber), 1);
        console.table(lists);
        allTodo.removeChild(this);

        // update todo array
        const allTodos = Array.from(document.querySelectorAll('.all-todo .a-todo'));
        updateArrayAndTodo(allTodos);
    }
    else if (e.target.classList.value === 'edit') {
        const editModal = document.querySelector('.edit-todo-modal');
        editModal.removeAttribute('id');
        const theTodo = editTodo(this, editModal, lists);
        const editForm = editModal.lastElementChild;
        editForm.onsubmit = (e) => {
            updateDatas(theTodo, e);
        }
        editForm.onreset = () => {
            editModal.setAttribute('id', 'hide');
        }
    }
    else {
        if (e.target.getAttribute('type') === 'checkbox') {
            changeCheck(e.target);
        }
        const listNumber = this.getAttribute('list-number');
        const todoNumber = this.getAttribute('todo-number');
        let theList = lists[parseInt(listNumber)];
        let theTodo = theList.getTodos[parseInt(todoNumber)];
        theTodo.changeCompleteStatus();
        changeCheck(this.firstElementChild.firstElementChild.firstElementChild);
        console.log(this.firstElementChild.firstElementChild.firstElementChild);
    }
    saveData(lists, activeListNumber);
}


function loadPage(anArray) {
    if (anArray.length === 0) return;
    for (let list of anArray) {
        addNewListInterface(list, allList, newListModal);
        for (let todo of list.getTodos) {
            addNewTodoInterface(allTodo, todo);
        }
    }
    const activeList = document.querySelector(`.all-list div[list-number="${activeListNumber}"]`);
    // removeExistingMarker(allList);
    if (activeList !== null) {
        activeList.setAttribute('id', 'active-list');
    }
    const allTodos = Array.from(document.querySelectorAll('.a-todo'));
    changeTodoHeader(todoHeader, activeListNumber, lists[parseInt(activeListNumber)].getTitle);
    showListsTodos(allTodos, activeListNumber);
    console.log(lists);
}


// ############## MAIN FUNCTION #################


// All global variables and eventListeners
const allList = document.querySelector('.all-list');
const newListinput = document.querySelector('#list-name');
const listForm = document.querySelector('.list-form');
const addNewList = document.querySelector('.add-new-list');
const newListModal = document.querySelector('.new-list-modal');
const addTodo = document.querySelector('.add-todo');
const newTodoModal = document.querySelector('.new-todo-modal');
const todoForm = document.querySelector('.todo-form');
const todoName = document.querySelector('#todo-name');
const dueDate = document.querySelector('#due-date');
const priority = document.querySelector('#priority');
const description = document.querySelector('#description');
const allTodo = document.querySelector('.all-todo');
const todoHeader = document.querySelector('.todo-header');



// loading the existing data
if (localStorage.getItem('activeListNumber')) {
    let anArray = loadData();
    activeListNumber = localStorage.getItem('activeListNumber');
    loadPage(anArray);
    // loadPage(anArray);
}
else {
    // Adding default list
    let defaultList = new List('My Day', [], 0, 1);
    addNewListInterface(defaultList, allList, newListModal);
    changeTodoHeader(todoHeader, '0', 'My Day');
    const activeList = document.querySelector(`.all-list div[list-number="${defaultList.getListNumber}"]`);
    activeList.setAttribute('id', 'active-list');
    // activeList.classList.toggle('default-list');
    // activeList.removeAttribute('src');
    // activeList.setAttribute('src', 'icons/weather-sunny.png');
    saveData(lists, activeListNumber);
}


const defaultListDOM = document.querySelectorAll('.all-list .a-list');
const allTodoDOMS = document.querySelectorAll('.all-todo .a-todo');

addTodo.onclick = () => {
    newTodoModal.removeAttribute('id');
}

addNewList.addEventListener('click', () => {
    newListModal.removeAttribute('id');
    allList.scrollTo(0, allList.scrollHeight);
})


listForm.onsubmit = addList;
listForm.onreset = () => {
    newListModal.setAttribute('id', 'hide');
}

todoForm.onsubmit = add_a_Todo;
todoForm.onreset = () => {
    newTodoModal.setAttribute('id', 'hide');
}

defaultListDOM.forEach(list => {
    list.onclick = makeListActive;
});

allTodoDOMS.forEach(todo => {
    todo.onclick = modifyTodo;
});