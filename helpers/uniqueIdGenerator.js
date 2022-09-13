const getRandomNumbers = () => {
  const array = new Uint32Array(10);
  window.crypto.getRandomValues(array);

  for (let i = 0; i < array.length; i++) {
    console.log(array[i] + " ");
  }
};

export const uniqId = () => {
  let a = new Uint32Array(3);
  window.crypto.getRandomValues(a);
  return (
    performance.now().toString(36) +
    Array.from(a)
      .map((A) => A.toString(36))
      .join("")
  ).replace(/\./g, "");
};
