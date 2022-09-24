import { Login } from "./login.js";
import { Registration } from "./registration.js";
import { createContainer } from "../../helpers/createContainer.js";
import { createButton } from "../../helpers/createButton.js";

export class AuthFromWrapper {
  constructor(selectedHTMLContainer, applyLogin) {
    this.applyLogin = applyLogin;
    this.selectedHTMLContainer = selectedHTMLContainer;
    this.authContainer = createContainer("div", "auth-container");
    this.isSignIn = true;
    this.renderForm();
  }

  redirection() {
    this.isSignIn = !this.isSignIn;
    this.button.innerText = this.isSignIn ? "Register" : "Sign in";
    this.renderForm();
  }

  renderButton() {
    this.button = createButton();
    this.button = createButton(
      this.isSignIn ? "Go to registration form" : "Go to sign in form"
    );
    this.button.addEventListener("click", (e) => {
      this.redirection();
    });
    this.authContainer.appendChild(this.button);
  }

  renderForm() {
    this.authContainer.innerHTML = "";
    this.renderButton();

    this.isSignIn
      ? new Login(this.authContainer, this.applyLogin)
      : new Registration(this.authContainer, this.redirection.bind(this));

    this.selectedHTMLContainer.appendChild(this.authContainer);
  }
}
