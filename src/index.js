import List from './list'
import Todo from './todo'
import {lists, addNewListInterface, removeExistingMarker, updateListsAndTodos, updateArrayAndTodo} from './manageListInterface'
import {addNewTodoInterface, changeTodoHeader, showListsTodos, deleteRelatedTodo} from './manageTodoInterface'
import {saveData, loadData} from './storageManagement'

let activeListNumber = '0';


function addList(e) {
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
    e.target.reset();
    console.table(lists);
    saveData(lists, activeListNumber);
}


function makeListActive(e) {
    // handle delete, up, down, complete
    if (e.target.classList.value === 'delete') {
        deleteElement(this);
    }
    else {
        removeExistingMarker(allList);
        this.setAttribute('id', 'active-list');
        
        // get the listObject
        let listNumber = e.target.getAttribute('list-number');
        changeTodoHeader(todoHeader, listNumber, this.firstElementChild.lastElementChild.textContent);
        const allTodos = Array.from(document.querySelectorAll('.a-todo'));
        showListsTodos(allTodos, listNumber);
        activeListNumber = listNumber;
        localStorage.removeItem('activeListNumber');
        console.log(localStorage);
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
        activeListNumber = index;
    }
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
    saveData(lists, activeListNumber);
}


// there is an edge case
// 1. what if the page is empty?
// 2. 

// test
// check if activated in the last list
// 
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
    let defaultList = new List('My Day', [], 0);
    addNewListInterface(defaultList, allList, newListModal);
    changeTodoHeader(todoHeader, '0', 'My Day');
    const activeList = document.querySelector(`.all-list div[list-number="${defaultList.getListNumber}"]`);
    activeList.setAttribute('id', 'active-list');
    saveData(lists, activeListNumber);
}


const defaultListDOM = document.querySelectorAll('.all-list .a-list');
const allTodoDOMS = document.querySelectorAll('.all-todo .a-todo');

addTodo.onclick = () => {
    newTodoModal.removeAttribute('id');
}

addNewList.addEventListener('click', () => {
    newListModal.removeAttribute('id');
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