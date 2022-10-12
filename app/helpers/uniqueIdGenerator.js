const crypto = require("crypto").webcrypto;

const uniqId = () => {
  let a = new Uint32Array(3);
  crypto.getRandomValues(a);
  return (
    performance.now().toString(36) +
    Array.from(a)
      .map((A) => A.toString(36))
      .join("")
  ).replace(/\./g, "");
};

module.exports.uniqId = uniqId;
