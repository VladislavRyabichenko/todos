export const createLabel = (text, forValue) => {
  const label = document.createElement("label");
  label.innerText = text;

  label.setAttribute("for", forValue);
  return label;
};
