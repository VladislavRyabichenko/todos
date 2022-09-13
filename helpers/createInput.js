export const createInput = (
  type = "text",
  placeHolder = "",
  isActive = false
) => {
  const input = document.createElement("input");
  input.setAttribute("type", type);

  type === "checkbox" && isActive && input.setAttribute("checked", isActive);
  input.autofocus = true;
  input.placeholder = placeHolder;
  return input;
};
