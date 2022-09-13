import { TodoList } from "./todoList/todoList.js";
import { Login } from "./login/login.js";

import { rootReducer } from "./store/rootReducer.js";
import { createStore } from "./store/store.js";

export class AppFlow {
  constructor(container) {
    this.userIsLogined = false;
    this.userId = null;
    this.container = container;
    this.currentSection = null;
    this.list = null;
    this.render();
  }

  updateData({ isAuth, id }) {
    this.userIsLogined = isAuth;
    this.userId = id;
    this.render();
  }

  applyLogin(user) {
    console.log("HERE");
    store.dispatch({
      type: "login/setSignIn",
      payload: {
        id: user.id,
        login: user.login,
      },
    });
  }

  render() {
    console.log(store.getState());
    if (!this.userIsLogined) {
      this.currentSection = new Login(
        this.container,
        this.applyLogin.bind(this)
      );
    } else {
      if (this.list === null) {
        signInUnsubscribe();
        this.list = new TodoList(this.container, this.userId);
        store.subscribe(() => this.list.updateData(store.getState().todos));
        this.currentSection = this.list;
        this.list.render();
      }
    }
  }
}

export const store = createStore(rootReducer);

const container = document.querySelector(".container");
const app = new AppFlow(container);
const signInUnsubscribe = store.subscribe(() =>
  app.updateData(store.getState().login)
);
