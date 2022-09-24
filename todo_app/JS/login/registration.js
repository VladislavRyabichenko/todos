import { Loader } from "../loader/loader";
import { Hint } from "../hint/hint";
import { createContainer } from "../../helpers/createContainer.js";
import { createInput } from "../../helpers/createInput.js";
import { createButton } from "../../helpers/createButton.js";
import { registerUser } from "../services/services.js";


export class Registration {
  constructor(selectedHTMLContainer, redirect) {
    this.selectedHTMLContainer = selectedHTMLContainer;
    this.redirect = redirect

    this.loader = new Loader();
    this.hint = new Hint();

    this.render();
  }

  async regUser(login, password) {
    if (login.trim().length <= 0 || password.trim().length <= 0) {
      this.hint.renderHintText("Fields must not be empty");
      return;
    }

    this.hint.hideHintText();
    this.loader.renderLoader();

    await registerUser(login, password).then((data) => {
      this.loader.hideLoader();
      if (!data) {
        this.loader.hideLoader();
        this.hint.renderHintText(`Login is not available`);
      } else {
        this.hint.renderHintText("Registration successful!", "green");

        setTimeout(()=>{
          this.redirect()
        }, 500)

      }
    });
  }

  render() {
    const loginContainer = createContainer("div", "login--container");
    const loginInput = createInput("text", "Login");
    const buttonsContainer = createContainer("div", "login--buttons-container");
    const registrationButton = createButton("REGISTER");
    const passwordInput = createInput("password", "Password");


    this.loader.render(loginContainer)
    this.hint.render(loginContainer)

    registrationButton.addEventListener("click", (e) => {
      this.regUser(loginInput.value, passwordInput.value);
    });


    loginContainer.appendChild(loginInput);
    loginContainer.appendChild(passwordInput);

    buttonsContainer.appendChild(registrationButton);
    loginContainer.appendChild(buttonsContainer);

    this.selectedHTMLContainer.appendChild(loginContainer);
  }


}
