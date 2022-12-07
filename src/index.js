import List from './list'
import Todo from './todo'
import {lists, addNewListInterface, removeExistingMarker} from './manageListInterface'
import {todos, addNewTodoInterface, changeTodoHeader, showListsTodos} from './manageTodoInterface'


function addList(e) {
    e.preventDefault()
    // manage Array of lists
    let newList = new List(newListinput.value, [], lists.length);
    addNewListInterface(newList, allList, newListModal, todoHeader);
    const allTodos = Array.from(document.querySelectorAll('.a-todo'));

    // manage todo interface
    changeTodoHeader(todoHeader, newList.getListNumber, newList.getTitle);
    showListsTodos(allTodos, newList.getListNumber);
    const newListDOM = document.getElementById('active-list');
    newListDOM.onclick = makeListActive;
    e.target.reset();
    newListModal.setAttribute('id', 'hide');
    console.log(lists);
}


function add_a_Todo(e) {
    e.preventDefault()
    // manage Array of lists
    const listNumber = todoHeader.getAttribute('list-number');
    const todoNumber = lists[parseInt(listNumber)].getTodos.length;
    let newTodo = new Todo(todoName.value, description.value, dueDate.value, priority.value, listNumber, false, todoNumber);
    lists[parseInt(listNumber)].getTodos.push(newTodo);


    // bring the todo interface
    addNewTodoInterface(allTodo, newTodo);

    // hide modal
    newTodoModal.setAttribute('id', 'hide');
    e.target.reset();
    console.log(lists);
}


function makeListActive(e) {
    removeExistingMarker(allList);
    this.setAttribute('id', 'active-list');
    
    // get the listObject
    let listNumber = e.target.getAttribute('list-number');
    changeTodoHeader(todoHeader, listNumber, this.firstElementChild.lastElementChild.textContent);
    const allTodos = Array.from(document.querySelectorAll('.a-todo'));
    showListsTodos(allTodos, listNumber);
    console.log(lists);
}


function handleTodoCheckbox(e) {
    console.log('It was clicked');
}


// Adding default list
let defaultList = new List('My Day', [], 0);
lists.push(defaultList);

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

const defaultListDOM = document.querySelector('.all-list .a-list');

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

defaultListDOM.onclick = makeListActive;