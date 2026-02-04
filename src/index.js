import add from "./add.js"
import remove from "./remove.js"

class Project {
    constructor(projectTitle) {
        this.projectTitle = projectTitle;
    }
}

class Todo extends Project {
    constructor(title, description, dueDate, priority, projectTitle) {
        super(projectTitle);
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

let cleanCar = new Todo('Clean Carpet', 'Vaccum the carpets', '02/12/26', 'Medium', 'Clean Car');
console.log(cleanCar);