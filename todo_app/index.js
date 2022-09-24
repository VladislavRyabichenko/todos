import './styles/styles.css'
import { rootReducer } from "./JS/store/rootReducer.js";
import { TodoList } from "./JS/todoList/todoList.js";
import { AuthFromWrapper } from "./JS/login/authFromWrapper.js";
import { createStore } from "./JS/store/store.js";

export class AppFlow {
  constructor(container) {
    this.userIsLogined = false;
    this.userId = null;
    this.container = container;
    this.currentSection = null;
    this.list = null;
    this.applyPreload();
    this.render();
  }

  updateData({ isAuth, id }) {
    this.userIsLogined = isAuth;
    this.userId = id;
    this.render();
  }

  applyLogin(userData) {
    this.saveInLocalStorage("token-".concat(userData.id), userData.token);

    this.saveInLocalStorage(
      "local-user-data",
      JSON.stringify({
        id: userData.id,
        token: userData.token,
      })
    );

    store.dispatch({
      type: "login/setSignIn",
      payload: {
        id: userData["id"],
      },
    });
  }

  applyLogout() {
    this.unsubscribeList();
    store.dispatch({
      type: "login/signOut",
    });
    store.subscribe(() => this.updateData(store.getState().login));

    this.userIsLogined = false;
    this.list = null;
    this.container.innerHTML = "";
    window.localStorage.clear();
    this.render();
  }

  render() {
    if (!this.userIsLogined) {
      this.currentSection = new AuthFromWrapper(
        this.container,
        this.applyLogin.bind(this)
      );
    } else {
      if (this.list === null) {

        this.list = new TodoList(
          this.container,
          this.userId,
          this.applyLogout.bind(this)
        );
        this.unsubscribeList = store.subscribe(() =>
          this.list.updateData(store.getState().todos)
        );
        this.currentSection = this.list;
        this.list.render();
      }
    }
  }

  applyPreload() {
    const preload = JSON.parse(window.localStorage.getItem("local-user-data"));
    if (preload && preload["id"] && preload["token"]) {
      this.applyLogin(preload);
      this.updateData({ isAuth: true, id: preload["id"] });
    }
  }

  saveInLocalStorage(id, data) {
    window.localStorage.setItem(
      id,
      data
    );
  }
}

export const store = createStore(rootReducer);

const container = document.querySelector(".container");
const app = new AppFlow(container);
const signInUnsubscribe = store.subscribe(() =>
  app.updateData(store.getState().login)
);
