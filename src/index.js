import add from "./add.js"
import remove from "./remove.js"

class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }
}

class Todo extends Project {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = super(title);
    }
}