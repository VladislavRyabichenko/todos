import { createContainer } from "../../helpers/createContainer.js";
import { createInput } from "../../helpers/createInput.js";

export class Todo {
  constructor(taskText, completed, id) {
    this.text = taskText;
    this.isCompleted = completed;
    this.id = id;
  }

  render(idx, ul, removeTodo, editTodo, toggleStatus) {
    const li = createContainer("li", "todo");
    const removeTaskButton = createContainer("div", "delete-todo-button");
    const removeIcon = document.createTextNode("\u00D7");
    const controlsContainer = createContainer(
      "div",
      "todo--controls-container"
    );

    const checkBox = createInput("checkbox", "", this.isCompleted);
    controlsContainer.appendChild(checkBox);

    const liText = createContainer("div", "todo--text-container");

    const editInput = createInput();
    editInput.classList.add("todo--edit-input");

    this.isCompleted && editInput.setAttribute("disabled", "disabled");

    editInput.value = this.text;

    editInput.addEventListener("click", (e) => {
      e.target.classList.add("editMode");
    });
    editInput.addEventListener("blur", (e) => {
      e.target.classList.remove("editMode");
      e.target.value = e.target.value ? e.target.value : this.text;
      this.text = e.target.value || this.text;
      editTodo(this.id, this.text);
    });

    liText.appendChild(editInput);

    li.appendChild(liText);

    checkBox.addEventListener("click", () => {
      toggleStatus(this.id);
    });

    removeTaskButton.addEventListener("click", () => {
      li.parentNode.removeChild(li);
      removeTodo(this.id);
    });

    removeTaskButton.appendChild(removeIcon);

    if (this.isCompleted) {
      liText.style.textDecoration = "line-through";
      liText.style.textDecorationColor = "green";
    }

    controlsContainer.appendChild(removeTaskButton);
    li.appendChild(controlsContainer);
    ul.appendChild(li);
  }
}
