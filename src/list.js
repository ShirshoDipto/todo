

export default class List {
    constructor(title, todos, listNumber) {
        this.title = title;
        this.todos = todos;
        this.listNumber = listNumber;
        // this.dueDate = dueDate;
        // this.active = active;
    }

    // get getActive() {
    //     return this.active;
    // }
    // set setActive(value) {
    //     this.active = value;
    // }

    // get getDueDate() {
    //     return this.dueDate;
    // }

    // set setDueDate(value) {
    //     this.dueDate = value;
    // }

    get getListNumber() {return this.listNumber}

    set setListNumber(value) {
        this.listNumber = value;
    }

    get getTitle() {return this.title}

    get getTodos() {return this.todos}

    set setTitle(value) {
        this.title = value;
    }

    set setTodos(value) {
        this.todos = value;
    }

    addNewList(theTodo) {
        this.todos.push(theTodo);
    }
}