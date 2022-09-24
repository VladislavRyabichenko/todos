import { Hint } from "../hint/hint";
import { Loader } from "../loader/loader";
import { createContainer } from "../../helpers/createContainer.js";
import { createInput } from "../../helpers/createInput.js";
import { createButton } from "../../helpers/createButton.js";
import { loginUser } from "../services/services.js";


export class Login {
  constructor(selectedHTMLContainer, applyLogin) {
    this.applyLogin = applyLogin;
    this.selectedHTMLContainer = selectedHTMLContainer;

    this.loader = new Loader();
    this.hint = new Hint();

    this.render();
  }

  async getUser(login, password) {
    if (login.trim().length <= 0 || password.trim().length <= 0) {
      this.hint.renderHintText("Fields must not be empty");
      return;
    }
    this.hint.hideHintText();
    this.loader.renderLoader();

    await loginUser(login, password).then((data) => {
      this.loader.hideLoader();
      if (data === null) {
        this.hint.renderHintText(
          "Login or password is incorrect. Check credentials or register."
        );
      } else {
        this.applyLogin(data);
      }
    });
  }

  render() {
    const loginContainer = createContainer("div", "login--container");
    const loginInput = createInput("text", "Login");
    const buttonsContainer = createContainer("div", "login--buttons-container");
    const loginButton = createButton("SIGN IN");
    const passwordInput = createInput("password", "Password");

    this.loader.render(loginContainer)
    this.hint.render(loginContainer)

    loginButton.addEventListener("click", (e) => {
      this.getUser(loginInput.value, passwordInput.value);
    });

    loginContainer.appendChild(loginInput);
    loginContainer.appendChild(passwordInput);

    buttonsContainer.appendChild(loginButton);
    loginContainer.appendChild(buttonsContainer);

    this.selectedHTMLContainer.appendChild(loginContainer);
  }
}
