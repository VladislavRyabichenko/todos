export const createButtonWithIcon = (className, iconName = "") => {
  const basePath = "./assets/";
  const button = document.createElement("button");
  button.classList.add(className);

  const icon = document.createElement("img");
  icon.classList.add("button-icon");
  icon.setAttribute("src", basePath.concat(iconName));

  button.appendChild(icon);

  return button;
};
