const Router = require("@koa/router");
const { createTodo } = require("../controllers/todos");

const jwt = require("jsonwebtoken");
function validateUser(ctx, next) {
  console.log("VALIDATION");
  jwt.verify(
    ctx.request.headers["x-access-token"],
    "SECRET_KEY",
    function (error, decoded) {
      if (error) {
        console.log("TROUBLE HERE");
        ctx.request.json({
          status: "error",
          message: error.message,
          data: null,
        });
      } else {
        console.log("DECODED", decoded.id);
        console.log("USER ID", ctx.request.body.userId);
        ctx.request.body.userId = decoded.id;
        next();
      }
    }
  );
}

const router = new Router({
  prefix: "/todos",
});
router.use(validateUser);

router.post("/create", async (ctx) => {
  console.log("REQUEST TO CREATE");
  const { userId, todo } = ctx.request.body;

  await createTodo(userId, todo)
    .then((res) => {
      console.log("HERE SUCEss", res);
      ctx.response.status = 200;
      ctx.body = {
        status: "success",
        data: res,
      };
    })
    .catch((error) => {
      console.log("HERE ERRR");
      ctx.response.status = 200;
      ctx.response.body = {
        status: "error",
        message: error.message,
        data: null,
      };
    });
});

//Export the router
module.exports.todosRouter = router;
