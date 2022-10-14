const Router = require("koa-router");
const { registerUser, authenticateUser } = require("../api/usersApi");

const router = new Router({
  prefix: "/users",
});

router.post("/register", registerUser);

router.post("/authenticate", authenticateUser);

module.exports.usersRouter = router;
