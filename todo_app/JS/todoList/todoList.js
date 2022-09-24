import { UserInput } from "./userInput.js";
import { Todo } from "./todo.js";
import { createContainer } from "../../helpers/createContainer.js";
import { createLabel } from "../../helpers/createLabel.js";
import { uniqId } from "../../helpers/uniqueIdGenerator.js";
import {
  getAllTodos,
  postTodo,
  updateTodo,
  deleteTodo,
  toggleTodoStatus,
} from "../services/services.js";
import { store } from "../../index.js";


export class TodoList {
  constructor(containerElement, userId, logout) {
    this.selectedHtmlContainer = containerElement || document.body;
    this.ul = createContainer("ul", "todo-list", "incomplete-tasks");
    this.ulCompleted = createContainer("ul", "todo-list", "completed-tasks");
    this.userId = userId;
    this.todos = this.getUserTodos(this.userId) || [];
    this.logout = logout;

  }


  async getUserTodos(id) {
    await getAllTodos(id)
      .then((data) => {
        store.dispatch({
          type: "todos/setAllTodos",
          payload: {
            todos: data,
          },
        });
      })
      .catch((e) => {
        this.logout()
      });
  }

  render() {
    this.selectedHtmlContainer.innerHTML = "";
    this.renderUserInputBlock();
    this.renderTodoListContainer();
  }

  renderUserInputBlock() {
    const inputBlock = new UserInput(
      this.addTodo.bind(this),
      this.logout
    ).render();
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

  toggleStatus(id, value) {
    toggleTodoStatus(this.userId, id, value)
      .then((todoId) => {
        store.dispatch({
          type: "todos/toggleTodoStatus",
          payload: {
            id: id,
          },
        });
      })
      .catch((err) => {
        this.logout()
      });
  }


  async editTodo(id, editedText) {
    updateTodo(this.userId, id, editedText)
      .then((todoId) => {
        store.dispatch({
          type: "todos/editTodo",
          payload: {
            id: todoId,
            text: editedText,
          },
        });
      })
      .catch((err) => {
        this.logout()

      });
  }

  updateData({ todosList }) {
    this.todos = todosList;
    this.renderTodos(this.todos);
  }

  async addTodo(id, todoText, completed = false) {
    if (todoText.trim() === "") {
      return false;
    }
    await postTodo(this.userId, {
      id: id || uniqId(),
      text: todoText,
      completed: completed,
    })
      .then((todo) => {
        store.dispatch({
          type: "todos/addTodo",
          payload: todo,
        });
      })
      .catch((err) => {
        this.logout();
        console.log("HANDe ERROR ON CLIENT", err.message);
      });
  }

  async removeTodo(id) {
    await deleteTodo(this.userId, id)
      .then((todo) => {
        store.dispatch({
          type: "todos/removeTodo",
          payload: {
            id: id,
          },
        });
      })
      .catch((err) => {
        this.logout();
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
}
