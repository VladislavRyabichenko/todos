import { createContainer } from "../../helpers/createContainer.js";
import { createInput } from "../../helpers/createInput.js";
import { createButton } from "../../helpers/createButton.js";
import { createLabel } from "../../helpers/createLabel.js";
import { uniqId } from "../../helpers/uniqueIdGenerator.js";

export class UserInput {
  constructor(addTodo) {
    this.addTodo = addTodo;
  }

  render() {
    const container = createContainer("div", "new-todo--container");
    const inputContainer = createContainer("div", "new-todo--input-container");

    const input = createInput("text", "Add task");
    const button = createButton("Add task");
    const label = createLabel("INPUT", "new-task");

    button.addEventListener("click", () => {
      const id = uniqId();
      this.addTodo(id, input.value);
      input.value = "";
    });

    inputContainer.appendChild(input);
    inputContainer.appendChild(button);

    container.appendChild(label);
    container.appendChild(inputContainer);

    return container;
  }
}
