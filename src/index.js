import List from './list'
import Todo from './todo'
import {lists, addNewListInterface, removeExistingMarker, updateListsAndTodos, updateArrayAndTodo} from './manageListInterface'
import {addNewTodoInterface, changeTodoHeader, showListsTodos, deleteRelatedTodo} from './manageTodoInterface'
import {saveData, loadData} from './storageManagement'



function addList(e) {
    e.preventDefault()
    // manage Array of lists
    let newList = new List(newListinput.value, [], lists.length);
    removeExistingMarker(allList);
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
    saveData(lists);
}


function add_a_Todo(e) {
    e.preventDefault()
    // manage Array of lists
    const listNumber = todoHeader.getAttribute('list-number');
    const todoNumber = lists[parseInt(listNumber)].getTodos.length;
    let newTodo = new Todo(todoName.value, description.value, dueDate.value, priority.value, listNumber, 0, todoNumber);
    lists[parseInt(listNumber)].getTodos.push(newTodo);


    // bring the todo interface
    const newTodoDOM = addNewTodoInterface(allTodo, newTodo);
    newTodoDOM.onclick = modifyTodo;

    // hide modal
    newTodoModal.setAttribute('id', 'hide');
    e.target.reset();
    console.log(lists);
    saveData(lists);
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
    }

    console.log(lists);
}


function showRelatedTodos(x, listNo){
    if (lists.length === 0) {
        todoHeader.firstElementChild.textContent = 'Add a List';
        todoHeader.firstElementChild.nextElementSibling.textContent = '';
    }
    else if (listNo === `0`) {
        const activeList = document.querySelector('.all-list div[list-number="0"]');
        activeList.setAttribute('id', 'active-list');
        changeTodoHeader(todoHeader, listNo, lists[0].getTitle);
        showListsTodos(x, `0`);
    }
    else {
        const activeList = document.querySelector(`.all-list div[list-number="${parseInt(listNo)-1}"]`);
        activeList.setAttribute('id', 'active-list');
        changeTodoHeader(todoHeader, listNo, lists[parseInt(listNo)-1].getTitle);
        showListsTodos(x, `${parseInt(listNo)-1}`);
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
        showRelatedTodos(x, index);
        if (todoHeader.getAttribute('list-number') === index) {
            showRelatedTodos(x, index);
        }
    }
    saveData(lists);
}


function modifyTodo(e) {
    if (e.target.classList.value === 'delete') {
        const listNumber = this.getAttribute('list-number');
        const todoNumber = this.getAttribute('todo-number');

        // delete todo from the lists Array and the dom
        lists[parseInt(listNumber)].getTodos.splice(parseInt(todoNumber), 1);
        console.log(lists);
        allTodo.removeChild(this);

        // update todo array
        const allTodos = Array.from(document.querySelectorAll('.all-todo .a-todo'));
        updateArrayAndTodo(allTodos);
    }
    saveData();
}


localStorage.clear();





// Adding default list
let defaultList = new List('My Day', [], 0);
lists.push(defaultList);




// ############## MAIN FUNCTION #################


if (localStorage.getItem('html-page')) {
    loadData();
}


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