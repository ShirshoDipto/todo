import List from './list'
import {addNewListInterface} from './manageListInterface'



function addList(e) {
    if (newListinput.value === '') return
    const newList = new List(newListinput.value, []);
    // console.log(newList.getTitle);
    // give this new list to the new module to bring it one
    addNewListInterface(newList, allList, newListModal);
    newListModal.setAttribute('id', 'hide');
    console.log(newListModal);
    console.log(newList);
    newListinput.textContent = '';
    e.preventDefault()
}


const allList = document.querySelector('.all-list');
const newListinput = document.querySelector('#list-name');
const addListButton = document.querySelector('.add-list');
const cancelListButton = document.querySelector('.cancel-list');
const addNewList = document.querySelector('.add-new-list');
const newListModal = document.querySelector('.new-list-modal');

addNewList.addEventListener('click', () => {
    newListModal.removeAttribute('id');
})


addListButton.addEventListener('click', addList);
// cancelListButton.addEventListener('click', cancelList);