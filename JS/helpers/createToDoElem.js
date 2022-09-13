import { createButtonWithIcon } from "./createButtonWithIcon.js";

export const createTodoElement = (data) => {
  const element = document.createElement("div");

  element.classList.add("item");
  element.id = data.id;
  element.innerText = data.value;

  data.completed && element.classList.add("completed");

  const itemButtonsContainer = document.createElement("div");
  itemButtonsContainer.classList.add("item-btn-container");

  const removeBtn = createButtonWithIcon("remove-btn", "icon-delete.svg");
  const completeBtn = createButtonWithIcon(
    "complete-btn",
    "icon-completed.svg"
  );
  const editBtn = createButtonWithIcon("edit-btn", "icon-edit.svg");

  itemButtonsContainer.appendChild(completeBtn);
  itemButtonsContainer.appendChild(editBtn);
  itemButtonsContainer.appendChild(removeBtn);
  element.appendChild(itemButtonsContainer);
  console.log("CREATE", element);

  return element;
};
