

export default class List {
    constructor(title, todos, listNumber) {
        this.title = title;
        this.todos = todos;
        this.listNumber = listNumber;
    }

    get getListNumber() {return this.listNumber}

    set setListNumber(value) {
        this.listNumber = value;
    }

    get getTitle() {return this.title}

    get getTodos() {return this.todos}

    set setTodos(value) {
        this.todos = value;
    }

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