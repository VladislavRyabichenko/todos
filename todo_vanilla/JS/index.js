import { updateUI } from "./helpers/updateUI.js";
import { todos } from "./todos_state/todos.js";
import { modal } from "./modal/modal.js";

const userInput = document.querySelector("#input");
const addButton = document.querySelector(".input-btn-container button");
const itemsContainer = document.querySelector(".items-container");
const inputWrapper = document.querySelector(".input-wrapper");
const popUp = document.querySelector(".edit-popup-container");
const editInput = document.querySelector("#edit-input");

document.addEventListener("DOMContentLoaded", updateUI);

popUp.addEventListener("click", (e) => {
  console.log(e.target.classList);
  if (e.target.classList.value.includes("popup-cancel-btn")) {
    handleCancelModal();
  }
  if (e.target.classList.value.includes("popup-save-btn")) {
    const { id } = modal.currentItem;
    handleSaveChanges(id, editInput.value);
  }
});

itemsContainer.addEventListener("click", (e) => {
  if (e.target.parentElement.classList.value.includes("remove-btn")) {
    const itemEl = e.target.parentElement;
    handleRemoving(itemEl.id);
  }

  if (e.target.parentElement.classList.value.includes("complete-btn")) {
    const itemEl = e.target.parentElement.parentElement.parentElement;
    handleStatusChange(itemEl.id);
  }

  if (e.target.parentElement.classList.value.includes("edit-btn")) {
    showModal(e.target.parentElement.parentElement.parentElement.id);
  }
});

addButton.addEventListener("click", () => {
  inputWrapper.classList.remove("hint-active");
  userInput.value.trim().length === 0
    ? inputWrapper.classList.add("hint-active")
    : handleAdding(userInput.value);
});

const showModal = (itemId) => {
  popUp.classList.add("shown");
  const currentToDo = todos.getTodo(itemId);
  editInput.value = currentToDo.value;
  modal.setCurrentId(currentToDo.id, currentToDo.value);
};

const handleCancelModal = () => {
  modal.setDefaults();
  popUp.classList.remove("shown");
};

const handleRemoving = (id) => {
  todos.removeToDo(id);
  updateUI();
};

const handleAdding = (value) => {
  todos.addTodo(value);
  updateUI();
};

const handleStatusChange = (id) => {
  todos.changeToDoStatus(id);
  updateUI();
};

const handleSaveChanges = (itemId, value) => {
  todos.editToDo(itemId, value);
  handleCancelModal();
  updateUI();
};
