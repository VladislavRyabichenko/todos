import {createContainer} from "../../helpers/createContainer.js";

export class Loader {
    constructor() {
        this.loader = null
    }

    renderLoader() {
        this.loader.classList.add("active");
    }

    hideLoader() {
        this.loader.classList.remove("active");
    }

    render (container) {
        this.loader = createContainer("div", "login-loader");
        this.loader.innerText = "LOADING...";
        container.appendChild(this.loader)
    }
}