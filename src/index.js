import add from "./add.js"
import remove from "./remove.js"

class Project {
    todoItems = [];
    constructor(projectTitle) {
        this.projectTitle = projectTitle;
    }
}

Object.assign(Project.prototype, add);
Object.assign(Project.prototype, remove);

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
let changeOil = new Todo('Change Oil', 'Change car engine oil', '05/12/26', 'High', 'Clean Car');

let carMaintenance = new Project('Clean Car');
carMaintenance.add(carMaintenance.todoItems, cleanCar)
carMaintenance.add(carMaintenance.todoItems, changeOil)

carMaintenance.remove(carMaintenance.todoItems, cleanCar)
console.log(carMaintenance)