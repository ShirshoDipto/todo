


export default class Todo {

    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
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