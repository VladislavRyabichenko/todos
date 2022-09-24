export const createContainer = (
  tagName = "div",
  className = null,
  id = null
) => {
  const container = document.createElement(tagName);
  className && container.classList.add(className);
  id && container.setAttribute("id", id);
  return container;
};
