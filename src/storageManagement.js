import List from './list'
import Todo from './todo'

export function saveTodo(anArray, l) {
    let t = 0;
    for (let todo of anArray) {
        let title = todo.getTitle;
        let description = todo.getDescription;
        let dueDate = todo.dueDate;
        let priority = todo.getPriority;
        let listNumber = todo.getListNumber;
        let completed = todo.getIsCompleted;
        let todoNumber = todo.getTodoNumber;
        localStorage.setItem(`list_${l}_todo_${t}`, `${title},${description},${dueDate},${priority},${listNumber},${completed},${todoNumber}`);
        t++;
    }
}


export function saveData(lists) {
    let l = 0;

    // save lists
    for (let elem of lists) {
        let listTitle = elem.getTitle;
        let listNumber = elem.getListNumber;
        localStorage.setItem(`list_${l}`, `${listTitle},${listNumber}`);
        saveTodo(elem.getTodos, l);
        l++;
    }
    console.log(localStorage);
    loadData(lists);
}


export function loadData(lists) {
    // let arrayLists = [];
    for (let elem in localStorage) {
        if (elem.includes('list') && !elem.includes('todo')) {
            console.log('printing a list')
        }
        else if (elem.includes('todo')) {
            console.log('printing a todo')
        }
    }
    return lists;
}