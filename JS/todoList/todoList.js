import { UserInput } from "./userInput.js";
import { Todo } from "./todo.js";
import { createContainer } from "../../helpers/createContainer.js";
import { createLabel } from "../../helpers/createLabel.js";
import { uniqId } from "../../helpers/uniqueIdGenerator.js";
import { store } from "../script.js";

export class TodoList {
  constructor(containerElement, userId) {
    this.selectedHtmlContainer = containerElement || document.body;
    this.ul = createContainer("ul", "todo-list", "incomplete-tasks");
    this.ulCompleted = createContainer("ul", "todo-list", "completed-tasks");
    this.userId = userId;
    this.todos = [];
  }

  getTodosFromStorage() {
    const storageTodos = JSON.parse(
      window.localStorage.getItem("todos-".concat(this.userId))
    );
    if (storageTodos === null) {
      this.saveInLocalStorage();
    }

    storageTodos.length !== 0 &&
      storageTodos.map((todo) => {
        const { id, text, completed } = todo;
        this.addTodo(id, text, completed);
      });
  }

  render() {
    this.selectedHtmlContainer.innerHTML = "";
    this.renderUserInputBlock();
    this.renderTodoListContainer();
    this.getTodosFromStorage();
  }

  renderUserInputBlock() {
    const inputBlock = new UserInput(this.addTodo.bind(this)).render();
    this.selectedHtmlContainer.appendChild(inputBlock);
  }

  renderTodos(todos) {
    this.ul.innerHTML = "";
    this.ulCompleted.innerHTML = "";
    todos.forEach((item, idx) => {
      const list = item.completed ? this.ulCompleted : this.ul;
      new Todo(item.text, item.completed, item.id).render(
        idx,
        list,
        this.removeTodo.bind(this),
        this.editTodo.bind(this),
        this.toggleStatus.bind(this)
      );
    });
  }

  toggleStatus(id) {
    store.dispatch({
      type: "todos/toggleTodoStatus",
      payload: {
        id: id,
      },
    });
  }

  editTodo(id, editedText) {
    store.dispatch({
      type: "todos/editTodo",
      payload: {
        id: id,
        text: editedText,
      },
    });
  }

  updateData({ todosList }) {
    console.log("updated list", todosList);

    this.todos = todosList;
    this.renderTodos(this.todos);
    this.saveInLocalStorage();
  }

  addTodo(id, todoText, completed = false) {
    if (todoText.trim() === "") {
      return false;
    }
    store.dispatch({
      type: "todos/addTodo",
      payload: {
        id: id || uniqId(),
        text: todoText,
        completed: completed,
      },
    });
  }

  removeTodo(id) {
    store.dispatch({
      type: "todos/removeTodo",
      payload: {
        id: id,
      },
    });
  }

  renderTodoListContainer() {
    const listContainer = createContainer("div", "incomplete-todos--container");
    const label = createLabel("TO DO", "incomplete-todos");
    const listContainerCompleted = createContainer(
      "div",
      "completed-todos--container"
    );
    const labelCompleted = createLabel("COMPLETED", "completed-todos");

    listContainer.appendChild(label);
    listContainer.appendChild(this.ul);

    listContainerCompleted.appendChild(labelCompleted);
    listContainerCompleted.appendChild(this.ulCompleted);

    this.selectedHtmlContainer.appendChild(listContainer);
    this.selectedHtmlContainer.appendChild(listContainerCompleted);
  }

  saveInLocalStorage() {
    window.localStorage.setItem(
      "todos-".concat(this.userId),
      JSON.stringify(this.todos)
    );
  }
}
