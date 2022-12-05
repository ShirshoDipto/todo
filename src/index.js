import List from './list'
import Todo from './todo'
import {lists, addNewListInterface, showAllTodos} from './manageListInterface'
import {todos, addNewTodoInterface, changeTodoHeader} from './manageTodoInterface'



function addTodoToList(theTodo, listNumber) {
    console.log(lists);
    for (let list of lists) {
        if (list.getListNumber === parseInt(listNumber)) {
            list.addNewList(theTodo);
        }
    }
}


function addList(e) {
    e.preventDefault()
    let newList = new List(newListinput.value, [], lists.length);
    addNewListInterface(newList, allList, newListModal, todoHeader);
    changeTodoHeader(todoHeader, newList);
    console.log(lists);
    e.target.reset();
    newListModal.setAttribute('id', 'hide');
}


function add_a_Todo(e) {
    e.preventDefault()
    const listNumber = todoHeader.getAttribute('list-number');
    let newTodo = new Todo(todoName.value, description.value, dueDate.value, priority.value, listNumber);
    addTodoToList(newTodo, listNumber);
    console.log(lists);
    addNewTodoInterface(allTodo, newTodo);
    newTodoModal.setAttribute('id', 'hide');
    e.target.reset();
}


function makeListActive(e) {
    e.target.classList.add('.active-list');
    // get the listObject
    let listNumber = e.target.getAttribute('list-number');
    const allTodos = document.querySelectorAll('.a-todo');
    showAllTodos(todoHeader, allTodos, listNumber);
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
const cancelTodo = document.querySelector('.cancel-todo');
const todoName = document.querySelector('#todo-name');
const dueDate = document.querySelector('#due-date');
const priority = document.querySelector('#priority');
const description = document.querySelector('#description');
const allTodo = document.querySelector('.todos');
const todoHeader = document.querySelector('.todo-header');

// grab all the lists
const allLists = document.querySelectorAll('.all-list a-list');

console.log(todoForm);
console.log(cancelTodo);
console.log(todoName);
console.log(dueDate);
console.log(priority);
console.log(description);

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

// all list event listener
allLists.onclick = makeListActive;