export const createButton = (innerText, className = null) => {
  const button = document.createElement("button");
  button.innerHTML = `<span>${innerText}</span>`;
  className && button.classList.add(className);
  return button;
};
