import { todos } from "../todos_state/todos.js";
import { createTodoElement } from "./createToDoElem.js";

const userInput = document.querySelector("#input");
const itemsContainer = document.querySelector(".items-container");
const totalCount = document.querySelector(".info-total-value");
const completedCount = document.querySelector(".info-completed-value");
const leftCount = document.querySelector(".info-left-value");

const createPlug = () => {
  const plug = document.createElement("div");
  plug.textContent = "Let`s add some tasks!";
  plug.classList.add("plug");
  return plug;
};

export const updateUI = () => {
  itemsContainer.innerHTML = "";
  userInput.value = "";

  const total = todos.data.length;
  const completed = todos.getCompleted().length;
  const left = total - completed;
  totalCount.textContent = `${total}`;
  leftCount.textContent = `${left}`;
  completedCount.textContent = `${completed}`;

  if (todos.data.length === 0) {
    itemsContainer.appendChild(createPlug());
    return;
  }

  todos.data.map((item) => {
    const element = createTodoElement(item);
    // item.completed ? element.classList.add("completed") : true;
    itemsContainer.appendChild(element);
  });
};
