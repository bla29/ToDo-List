import add from "./add.js"
import remove from "./remove.js"
import "./styles.css"

class Project {
    static projects = [];
    todoItems = [];
    constructor(projectTitle) {
        this.projectTitle = projectTitle;
        if (this.constructor === Project) {
            Project.projects.push(this);
        }
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

function addProjectElement() {
    let addPage = document.createElement('div');

    let addPageTitle = document.createElement('h2');
    addPageTitle.textContent = 'Enter your project title:';

    let addPageForm = document.createElement('input');
    let currentValue = '';
    addPageForm.addEventListener('input', (e) => {
        currentValue = e.target.value;
    });

    let addPageButton = document.createElement('button');
    addPageButton.textContent = 'Add';
    addPageButton.addEventListener('click', () => {
        let newProject = new Project(currentValue);
        let projectColumn = document.querySelector('.project-column').firstElementChild;


        let listContainer = document.createElement('li');
        let listItem = document.createElement('div');
        let itemTitle = document.createElement('h2');
        let deleteButton = document.createElement('button');
        itemTitle.textContent = newProject.projectTitle;
        deleteButton.textContent = 'Delete';
        listItem.classList.add('column-title');
        deleteButton.classList.add('delete-button');

        listItem.appendChild(itemTitle);
        listItem.appendChild(deleteButton);

        listContainer.appendChild(listItem)

        projectColumn.appendChild(listContainer)
        setDeleteButtons();
    })

    addPage.appendChild(addPageTitle);
    addPage.appendChild(addPageForm);
    addPage.appendChild(addPageButton);

    document.body.appendChild(addPage)
}

function addItemElement() {
    let addPage = document.createElement('div');

    //add item title
    let addPageTitle = document.createElement('h2');
    addPageTitle.textContent = 'Enter your To-Do Item title:';
    let addTitleForm = document.createElement('input');
    addPageTitle.appendChild(addTitleForm);
    let currentTitleValue = '';
    addTitleForm.addEventListener('input', (e) => {
        currentTitleValue = e.target.value;
    });

    //add item description
    let addPageDescription = document.createElement('h2');
    addPageDescription.textContent = 'Type a description for your item:';
    let addDescriptionForm = document.createElement('textarea');
    addPageDescription.appendChild(addDescriptionForm);
    let currentDescriptionValue = '';
    addDescriptionForm.addEventListener('input', (e) => {
        currentDescriptionValue = e.target.value;
    });

    //add item due date
    let addDueDateTitle = document.createElement('h2');
    addDueDateTitle.textContent = 'Enter a due date:';
    let addDueDate = document.createElement('input');
    addDueDate.type = 'date';
    addDueDateTitle.appendChild(addDueDate);
    let currentDueDateValue = '';
    addDueDate.addEventListener('change', (e) => {
        currentDueDateValue = e.target.value;
    });

    //add item priority
    let addPriorityTitle = document.createElement('h2');
    addPriorityTitle.textContent = 'Enter your To-Do Item title:';
    let addPriorityDropDown = document.createElement('select');
    let low = document.createElement('option');
    low.value = 'Low';
    low.textContent = 'Low';
    let medium = document.createElement('option');
    medium.value = 'Medium';
    medium.textContent = 'Medium';
    let high = document.createElement('option');
    high.value = 'High';
    high.textContent = 'High';
    addPriorityDropDown.appendChild(high);
    addPriorityDropDown.appendChild(medium);
    addPriorityDropDown.appendChild(low);
    addPriorityTitle.appendChild(addPriorityDropDown);

    let currentDropDownValue = high.textContent;
    addPriorityDropDown.addEventListener('change', (e) => {
        currentDropDownValue = e.target.value;
    });

    //add item project title
    let addItemProjectTitle = document.createElement('h2');
    addItemProjectTitle.textContent = 'Select the project this item belongs to:';
    let addProjectDropDown = document.createElement('select');

    let projectDropDownValue = '';
    for (let i = 0; i < Project.projects.length; i++) {
        if (Project.projects[i] != null) {
            let projectOption = document.createElement('option');
            projectOption.value = Project.projects[i].projectTitle;
            projectOption.textContent = Project.projects[i].projectTitle;
            addProjectDropDown.appendChild(projectOption);
            projectDropDownValue = Project.projects[i].projectTitle;
        }
        else {
            let projectOption = document.createElement('option');
            projectOption.value = 'null';
            projectOption.textContent = 'N/A';
            addProjectDropDown.appendChild(projectOption)
        }
    }
    addItemProjectTitle.appendChild(addProjectDropDown);

    addProjectDropDown.addEventListener('change', (e) => {
        projectDropDownValue = e.target.value;
    });

    let addPageButton = document.createElement('button');
    addPageButton.textContent = 'Add';
    addPageButton.addEventListener('click', () => {
        let newItem = new Todo(currentTitleValue, currentDescriptionValue, currentDueDateValue, currentDropDownValue, projectDropDownValue)
        for (let project of Project.projects) {
            console.log(projectDropDownValue)
            if (project.projectTitle === projectDropDownValue) {
                project.add(project.todoItems, newItem);
                console.log(project.todoItems)
            }
        }
        let projectColumn = document.querySelector('.to-do-column').firstElementChild;


        let listContainer = document.createElement('li');
        let listItem = document.createElement('div');
        let itemTitle = document.createElement('h2');
        let itemDescription = document.createElement('h4');
        let itemDueDate = document.createElement('h4');
        let itemPriority = document.createElement('h4');
        let deleteButton = document.createElement('button');
        itemTitle.textContent = newItem.title;
        itemDescription.textContent = newItem.description;
        itemDueDate.textContent = newItem.dueDate;
        itemPriority.textContent = newItem.priority;
        deleteButton.textContent = 'Delete';
        listItem.classList.add('column-title');
        deleteButton.classList.add('delete-button');

        listItem.appendChild(itemTitle);
        listItem.appendChild(itemDescription);
        listItem.appendChild(itemDueDate);
        listItem.appendChild(itemPriority);
        listItem.appendChild(deleteButton);

        listContainer.appendChild(listItem)

        projectColumn.appendChild(listContainer)
        setDeleteButtons();
    })

    addPage.appendChild(addPageTitle);
    addPage.appendChild(addPageDescription);
    addPage.appendChild(addDueDateTitle);
    addPage.appendChild(addPriorityTitle);
    addPage.appendChild(addItemProjectTitle);
    //addPage.appendChild(addPageForm);
    addPage.appendChild(addPageButton);

    document.body.appendChild(addPage)
}

function setDeleteButtons() {
    let deleteButtons = document.querySelectorAll('.delete-button');
    for (let button of deleteButtons) {
        button.addEventListener('click', () => {
            button.parentElement.parentElement.remove();
        })
    }
}

let projects = document.querySelectorAll('.project-column-title');
for (let project of projects) {
    project.addEventListener('click', () => {
        let projectTitle = project.firstElementChild.textContent;
        for (let projectItem of Project.projects) {
            if (projectTitle === projectItem.projectTitle) {
                let listOfItems = document.querySelector('.to-do-column').firstElementChild;
                listOfItems.innerHTML = ' ';
                for (let i = 0; i < projectItem.todoItems.length; i++) {
                    let newItemElement = createTodoItemElement(projectItem.todoItems[i]);
                    listOfItems.appendChild(newItemElement);
                }
            }
            else {
                let listOfItems = document.querySelector('.to-do-column').firstElementChild;
                listOfItems.innerHTML = ' ';
            }
        }
    })
}

function createTodoItemElement(item) {
    let todoListItem = document.createElement('li');

    let todoListItemDiv = document.createElement('div');
    todoListItemDiv.classList.add('.column-title');

    let todoItemHeader = document.createElement('h2');
    todoItemHeader.textContent = item.title;
    todoListItemDiv.appendChild(todoItemHeader);

    let todoItemDescription = document.createElement('h4');
    todoItemDescription.textContent = item.description;
    todoListItemDiv.appendChild(todoItemDescription);

    let todoItemDueDate = document.createElement('h4');
    todoItemDueDate.textContent = item.dueDate;
    todoListItemDiv.appendChild(todoItemDueDate);

    let todoItemPriority = document.createElement('h4');
    todoItemPriority.textContent = item.priority;
    todoListItemDiv.appendChild(todoItemPriority);

    todoListItem.appendChild(todoListItemDiv);
    return todoListItem;
}

let addProjectButton = document.querySelector('.add-project-button');
addProjectButton.addEventListener('click', () => {
    //add a function to create a pop up screen to add items
    addProjectElement();
})

let addItemButton = document.querySelector('.add-item-button');
addItemButton.addEventListener('click', () => {
    //add a function to create a pop up screen to add items
    addItemElement();
})


let cleanCar = new Todo('Clean Carpet', 'Vaccum the carpets', '02/12/26', 'Medium', 'Clean Car');
let changeOil = new Todo('Change Oil', 'Change car engine oil', '05/12/26', 'High', 'Clean Car');

let carMaintenance = new Project('Clean Car');

carMaintenance.add(carMaintenance.todoItems, cleanCar)
carMaintenance.add(carMaintenance.todoItems, changeOil)

carMaintenance.remove(carMaintenance.todoItems, cleanCar)