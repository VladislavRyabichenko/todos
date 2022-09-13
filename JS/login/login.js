import { createContainer } from "../../helpers/createContainer.js";
import { createInput } from "../../helpers/createInput.js";
import { createButton } from "../../helpers/createButton.js";
import { fakeRequest } from "./DB.js";

export class Login {
  constructor(selectedHTMLContainer, applyLogin) {
    console.log(this);
    this.applyLogin = applyLogin;
    this.selectedHTMLContainer = selectedHTMLContainer;

    this.loader = null;
    this.error = null;

    this.render();
  }

  getUser(login, password) {
    this.hideErrorText();
    this.renderLoader();

    fakeRequest(login, password)
      .then((data) => {
        this.hideLoader();
        this.applyLogin(data);
      })
      .catch((e) => {
        this.hideLoader();
        this.renderErrorText();
      });
  }

  render() {
    const loginContainer = createContainer("div", "login--container");
    const loginInput = createInput("text", "Login");
    const loginButton = createButton("SIGN IN");
    const passwordInput = createInput("password", "Password");

    this.loader = createContainer("div", "login-loader");
    this.loader.innerText = "LOADING...";

    this.error = createContainer("div", "login-error");
    this.error.innerText = "Login or password is incorrect";

    loginButton.addEventListener("click", (e) => {
      this.getUser(loginInput.value, passwordInput.value);
    });

    loginContainer.appendChild(this.loader);
    loginContainer.appendChild(this.error);
    loginContainer.appendChild(loginInput);
    loginContainer.appendChild(passwordInput);
    loginContainer.appendChild(loginButton);

    this.selectedHTMLContainer.appendChild(loginContainer);
  }

  renderErrorText() {
    this.error.classList.add("active");
  }
  renderLoader() {
    this.loader.classList.add("active");
  }
  hideErrorText() {
    this.error.classList.remove("active");
  }
  hideLoader() {
    this.loader.classList.remove("active");
  }
}
