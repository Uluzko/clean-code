

let taskInput = document.querySelector(".new-task");//Add a new task.
let addButton = document.querySelector(".add-btn");//first button
let incompletedTaskHolder = document.querySelector(".incompleted-tasks");//ul of #incompleted-tasks
let completedTaskHolder = document.querySelector(".completed-tasks");//completed-tasks


//New task list item
let createNewTask = function (taskString) {

    let listItem = document.createElement("li");
    //input (checkbox)
    let checkBox = document.createElement("input");//checkbx
    //label
    let label = document.createElement("label");//label
    //input (text)
    let editInput = document.createElement("input");//text
    //button.edit
    let editButton = document.createElement("button");//edit button
    //button.delete
    let deleteButton = document.createElement("button");//delete button
    let deleteButtonImg = document.createElement("img");//delete button image



    //Each elements, needs appending
    checkBox.type = "checkbox";
    label.innerText = taskString;
    label.className = "label";
    editInput.type = "text";
    editInput.className = "input-field";
    editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
    editButton.className = "edit-btn";
    deleteButton.className = "del-btn";
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.className = "remove-icon";
    deleteButton.append(deleteButtonImg);


    //and appending.
    listItem.append(checkBox, label, editInput, editButton, deleteButton);
    return listItem;
}



let addTask = function () {
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    let listItem = createNewTask(taskInput.value);

    //Append listItem to incompletedTaskHolder
    incompletedTaskHolder.append(listItem);
    console.log(incompletedTaskHolder.children.length);
    taskInput.value = "";
    bindTaskEvents(listItem, taskIncompleted);



}

//Edit an existing task.

let editTask = function () {

    let listItem = this.parentNode;
    let editInput = listItem.querySelector('.input-field');
    let label = listItem.querySelector(".label");
    let editBtn = listItem.querySelector(".edit-btn");
    let containsClass = listItem.classList.contains("edit-mode");
    //If class of the parent is .edit-mode
    if (containsClass) {

        //switch to .edit-mode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    //toggle .edit-mode on the parent.
    listItem.classList.toggle("edit-mode");
};


//Delete task.
let deleteTask = function () {

    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
let taskCompleted = function () {

    //Append the task list item to the #completed-tasks
    let listItem = this.parentNode;
    //incompletedTaskHolder.removeChild(listItem);
    completedTaskHolder.append(listItem);
    bindTaskEvents(listItem, taskIncompleted);

}


let taskIncompleted = function () {
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleted-tasks.
    let listItem = this.parentNode;
    //completedTaskHolder.removeChild(listItem);
    incompletedTaskHolder.append(listItem);
    bindTaskEvents(listItem, taskCompleted);
}



let ajaxRequest = function () {
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
//addButton.onclick=addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);



let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {

//select ListItems children
    let checkBox = taskListItem.querySelector(".checkbox");
    let editButton = taskListItem.querySelector(".edit-btn");
    let deleteButton = taskListItem.querySelector(".del-btn");


    //Bind editTask to edit button.
    editButton.addEventListener("click", editTask);
    //Bind deleteTask to delete button.
    deleteButton.addEventListener("click", deleteTask);
    //Bind taskCompleted to checkBoxEventHandler.
    //checkBox.onchange = checkBoxEventHandler;
    checkBox.addEventListener("change", checkBoxEventHandler);
}

//cycle over incompletedTaskHolder ul list items
//for each list item
for (let i=0; i < incompletedTaskHolder.children.length; i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompletedTaskHolder.children[i], taskCompleted);
}

console.log(incompletedTaskHolder.children.length);


//cycle over completedTasksHolder ul list items
for (let i=0; i < completedTaskHolder.children.length; i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTaskHolder.children[i], taskIncompleted);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.