

export default class List {
    constructor(title, todos) {
        this.title = title;
        this.todos = todos;
    }

    get getTitle() {return this.title}

    get getTodos() {return this.todos}

    set setTitle(value) {
        this.title = value;
    }

    set setTodos(value) {
        this.todos = value;
    }

    updateTodos(parameters) {
        // mothod description goes here
    }
}