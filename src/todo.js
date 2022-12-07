


export default class Todo {

    constructor(title, description, dueDate, priority, listNumber, completed, todoNumber) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.listNumber = listNumber;
        this.completed = completed;
        this.todoNumber = todoNumber;
    }

    get getTodoNumber() {
        return this.todoNumber;
    }

    set setTodoNumber(value) {
        this.todoNumber = value;
    }

    get getIsCompleted() {
        return this.completed;
    }

    changeCompleteStatus() {
        if (this.completed === true) {
            this.completed = false;
        }
        else {
            this.completed = true;
        }
    }

    get getListNumber() {
        return this.listNumber;
    }

    set setListNumber(value) {
        this.listNumber = value;
    }

    get getTitle() {
        return this.title;
    }
    get getDescription() {
        return this.description;
    }
    get getDueDate() {
        return this.dueDate;
    }
    get getPriority() {
        return this.priority;
    }

    set setTitle(value) {
        this.title = value;
    }

    set setDescription(value) {
        this.description = value;
    }
    set setDueDate(value) {
        this.dueDate = value;
    }
    set setPriority(value) {
        this.priority = value;
    }
}