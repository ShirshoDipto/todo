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


export function saveData(lists, activeListNumber) {
    localStorage.clear()
    let l = 0;

    // save lists
    localStorage.setItem('activeListNumber', activeListNumber);
    for (let elem of lists) {
        let listTitle = elem.getTitle;
        let listNumber = elem.getListNumber;
        localStorage.setItem(`list_${l}`, `${listTitle},${listNumber}`);
        saveTodo(elem.getTodos, l);
        l++;
    }
}


function sortArrays(arrayLists) {
    const newLists = arrayLists.sort((a,b) => {
        if (a.getListNumber > b.getListNumber) {
            return 1;
        }
        else {
            return -1;
        }
    })

    return newLists;
}

function insertTodosToLists(finalArray, arrayTodos) {
    for (let todo of arrayTodos) {
        finalArray[todo.getListNumber].getTodos.push(todo);
    }
    // sort the todos
    for (let list of finalArray) {
        const newTodo = list.getTodos.sort((a,b) => {
            if (a.getTodoNumber > b.getTodoNumber) {
                return 1;
            }
            else {
                return -1;
            }
        })
        list.setTodos = newTodo;
    }
}


export function loadData() {
    let arrayLists = [];
    let arrayTodos = [];
    for (let elem in localStorage) {
        if (elem.includes('list') && !elem.includes('todo')) {
            const listDetails = localStorage.getItem(elem).split(',');
            const title = listDetails[0];
            const listNumber = parseInt(listDetails[1])
            const newList = new List(title, [], listNumber);
            arrayLists.push(newList);
        }
        else if (elem.includes('todo')) {
            const todoDetails = localStorage.getItem(elem).split(',');
            const title = todoDetails[0];
            const description = todoDetails[1];
            const dueDate = todoDetails[2];
            const priority = todoDetails[3];
            const listNumber = parseInt(todoDetails[4]);
            const completed = parseInt(todoDetails[5]);
            const todoNumber = parseInt(todoDetails[6]);
            const newTodo = new Todo(title, description, dueDate, priority, listNumber, completed, todoNumber);
            arrayTodos.push(newTodo);
        }
    }
    let finalArray = sortArrays(arrayLists);
    insertTodosToLists(finalArray, arrayTodos);
    return finalArray;
    console.log('printing the converted array')
    console.log(finalArray);
}