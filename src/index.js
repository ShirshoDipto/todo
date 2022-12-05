import List from './list'
import Todo from './todo'
import {lists, addNewListInterface} from './manageListInterface'
import {todos, addNewTodoInterface} from './manageTodoInterface'



function addTodoToList(theTodo) {
    console.log(theTodo);
    for (let list in lists) {
        console.log(list);
        if (list.getListNumber === theTodo.getTodoNumber) {
            list.addNewList(theTodo);
        }
    }
}


function addList(e) {
    e.preventDefault()
    let newList = new List(newListinput.value, [], lists.length);
    addNewListInterface(newList, allList, newListModal);
    console.log(newListModal);
    console.log(newList);
    e.target.reset();
    newListModal.setAttribute('id', 'hide');
}


function add_a_Todo(e) {
    e.preventDefault()
    let newTodo = new Todo(todoName.value, description.value, dueDate.value, priority.value, lists.length);
    // console.log(newTodo);
    // add the new todo to the appropriate list
    // addTodoToList(newTodo);
    // console.log(lists);
    // addNewTodoInterface()
    addNewTodoInterface(allTodo, newTodo);
    newTodoModal.setAttribute('id', 'hide');
    e.target.reset();
}


// Adding default list
let defaultList = new List('My Day', [], 0);
lists.push(defaultList); 

console.log(lists);
console.log(todos);


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