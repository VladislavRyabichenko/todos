import {createContainer} from "../../helpers/createContainer";

export class Hint {
    constructor() {
        this.hint =  null
    }

    renderHintText(hintText = "HINT", color = "red") {
        this.hint.innerText = hintText;
        this.hint.style.color = color;
        this.hint.classList.add("active");
    }

    hideHintText() {
        this.hint.classList.remove("active");
    }

    render (container) {
        this.hint = createContainer("div", "login-error");
        container.appendChild(this.hint)
    }
}