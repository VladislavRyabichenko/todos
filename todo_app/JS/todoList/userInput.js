import { createContainer } from "../../helpers/createContainer.js";
import { createInput } from "../../helpers/createInput.js";
import { createButton } from "../../helpers/createButton.js";
import { createLabel } from "../../helpers/createLabel.js";
import { uniqId } from "../../helpers/uniqueIdGenerator.js";

export class UserInput {
  constructor(addTodo, logout) {
    this.addTodo = addTodo;
    this.logout = logout;
  }

  render() {
    const container = createContainer("div", "new-todo--container");
    const inputContainer = createContainer("div", "new-todo--input-container");
    const logoutContainer = createContainer("div", "logout-container");

    const input = createInput("text", "Add task");
    const button = createButton("Add task");
    const label = createLabel("INPUT", "new-task");

    const logoutButton = createButton("Logout");
    logoutButton.addEventListener("click", () => {
      this.logout();
    });

    button.addEventListener("click", () => {
      const id = uniqId();
      this.addTodo(id, input.value);
      input.value = "";
    });

    logoutContainer.appendChild(logoutButton);
    inputContainer.appendChild(input);
    inputContainer.appendChild(button);

    container.appendChild(logoutContainer);
    container.appendChild(label);
    container.appendChild(inputContainer);

    return container;
  }
}
