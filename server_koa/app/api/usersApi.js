const { create, authenticate } = require("../controllers/users");

const registerUser = async (ctx) => {
  let body = ctx.request.body;

  await create(body.login, body.password)
    .then((res) => {
      ctx.response.status = 200;
      ctx.response.body = {
        status: "success",
        data: null,
      };
    })
    .catch((error) => {
      ctx.response.status = 200;
      ctx.response.body = {
        status: "error",
        message: error.message,
        data: null,
      };
    });
};

const authenticateUser = async (ctx) => {
  let body = ctx.request.body;

  await authenticate(body.login, body.password)
    .then((userInfo) => {
      ctx.response.status = 200;
      ctx.response.body = {
        status: "success",
        data: userInfo,
      };
    })
    .catch((error) => {
      ctx.response.status = 200;
      ctx.response.body = {
        status: "error",
        message: error.message,
        data: null,
      };
    });
};

module.exports = {
  registerUser,
  authenticateUser,
};
