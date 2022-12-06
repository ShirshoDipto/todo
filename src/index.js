import List from './list'
import Todo from './todo'
import {lists, addNewListInterface, remoreExistingMarker} from './manageListInterface'
import {addNewTodoInterface, changeTodoHeader, showListsTodos} from './manageTodoInterface'



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
    changeTodoHeader(todoHeader, newList.getListNumber, newList.getTitle);
    const allTodos = Array.from(document.querySelectorAll('.a-todo'));
    showListsTodos(allTodos, newList.getListNumber);
    const newListDOM = document.getElementById('active-list');
    newListDOM.onclick = makeListActive;
    e.target.reset();
    newListModal.setAttribute('id', 'hide');
    console.log(newList);
}


function add_a_Todo(e) {
    e.preventDefault()
    const listNumber = todoHeader.getAttribute('list-number');
    let newTodo = new Todo(todoName.value, description.value, dueDate.value, priority.value, listNumber);
    addTodoToList(newTodo, listNumber);
    addNewTodoInterface(allTodo, newTodo);
    newTodoModal.setAttribute('id', 'hide');
    e.target.reset();
}



// when clicked on the div:
//  send all the lists into the manageInterface module
//  remove the existing border
//  set the border to the thing that is selected

function makeListActive(e) {
    remoreExistingMarker(allList);
    this.setAttribute('id', 'active-list');
    
    // get the listObject
    let listNumber = e.target.getAttribute('list-number');
    changeTodoHeader(todoHeader, listNumber, this.firstElementChild.lastElementChild.textContent);
    const allTodos = Array.from(document.querySelectorAll('.a-todo'));
    showListsTodos(allTodos, listNumber);
    console.log(lists);
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
const allTodo = document.querySelector('.todos');
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

// all list event listener
// defaultListDOMChildren.forEach(theList => {
//     theList.addEventListener('click', makeListActive, {capture:true});
// });

defaultListDOM.onclick = makeListActive;