const Router = require("@koa/router");
const { create, authenticate } = require("../controllers/users");

const router = new Router({
  prefix: "/users",
});

router.post("/register", async (ctx, next) => {
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
});

router.post("/authenticate", async (ctx, next) => {
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
});


//Export the router
module.exports.usersRouter = router;
