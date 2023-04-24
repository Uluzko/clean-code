
let taskInput = document.querySelector(".new-task");
let addButton = document.querySelector(".add-btn");
let incompletedTaskHolder = document.querySelector(".incompleted-tasks");
let completedTaskHolder = document.querySelector(".completed-tasks");


let createNewTask = function (taskString) {
  let listItem = document.createElement("li");
  let checkBox = document.createElement("input");
  let label = document.createElement("label");
  let editInput = document.createElement("input");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  let deleteButtonImg = document.createElement("img");
  listItem.className = "list-item";
  checkBox.type = "checkbox";
  checkBox.className = "checkbox";
  label.innerText = taskString;
  label.className = "label";
  editInput.type = "text";
  editInput.className = "input-field";
  editButton.innerText = "Edit";
  editButton.className = "edit-btn";
  deleteButton.className = "del-btn";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "remove-icon";
  deleteButton.append(deleteButtonImg);
  listItem.append(checkBox, label, editInput, editButton, deleteButton);
  return listItem;
}


let addTask = function () {
  if (!taskInput.value) return;
  let newTask = createNewTask(taskInput.value);
  incompletedTaskHolder.append(newTask);
  bindTaskEvents(newTask, taskCompleted);
  taskInput.value = "";
}


let editTask = function () {
  let listItem = this.parentNode;
  let editInput = listItem.querySelector('.input-field');
  let label = listItem.querySelector(".label");
  let editBtn = listItem.querySelector(".edit-btn");
  let containsClass = listItem.classList.contains("edit-mode");
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
      editInput.value = label.innerText;
      editBtn.innerText = "Save";
    }
  listItem.classList.toggle("edit-mode");
};


let deleteTask = function () {
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  ul.removeChild(listItem);
}


let taskCompleted = function () {
  let listItem = this.parentNode;
  completedTaskHolder.append(listItem);
  bindTaskEvents(listItem, taskIncompleted);
}


let taskIncompleted = function () {
  let listItem = this.parentNode;
  incompletedTaskHolder.append(listItem);
  bindTaskEvents(listItem, taskCompleted);
}


let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  let checkBox = taskListItem.querySelector(".checkbox");
  let editButton = taskListItem.querySelector(".edit-btn");
  let deleteButton = taskListItem.querySelector(".del-btn");
  editButton.addEventListener("click", editTask);
  deleteButton.addEventListener("click", deleteTask);
  checkBox.onchange = checkBoxEventHandler;
}


for (let i=0; i < incompletedTaskHolder.children.length; i++) {
  bindTaskEvents(incompletedTaskHolder.children[i], taskCompleted);
}


for (let i=0; i < completedTaskHolder.children.length; i++) {
  bindTaskEvents(completedTaskHolder.children[i], taskIncompleted);
}


addButton.addEventListener("click", addTask);