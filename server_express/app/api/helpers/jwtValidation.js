const jwt = require("jsonwebtoken");

function validateUser(userId, token) {
  let validationResult = false;
  jwt.verify(token, app.get("secretKey"), function (error, decoded) {
    if (error) {
      validationResult = false;
    } else {
      validationResult = true;
    }
  });
  return validationResult;
}
