export const createButton = (className, innerText, url = null) => {
  const button = document.createElement("button");
  button.classList.add(className);
  button.innerText = innerText;

  return button;
};
