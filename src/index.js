import List from './list'
import Todo from './todo'
import {addNewListInterface} from './manageListInterface'



function addList(e) {
    const newList = new List(newListinput.value, []);
    addNewListInterface(newList, allList, newListModal);
    console.log(newListModal);
    console.log(newList);
    e.target.reset();
    newListModal.setAttribute('id', 'hide');
    e.preventDefault()
}


function add_a_Todo(e) {
    const newTodo = new Todo(todoName.value, description.value, dueDate.value, priority.value);
    console.log(newTodo);
    newTodoModal.setAttribute('id', 'hide');
    e.target.reset();
    e.preventDefault()
}


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


// cancelListButton.addEventListener('click', () => {
// });


todoForm.onsubmit = add_a_Todo;
todoForm.onreset = () => {
    newTodoModal.setAttribute('id', 'hide');
}