const Koa = require("koa");

require("./config/config");
const { usersRouter } = require("./routes/users.routes");
const todosRouter = require("./routes/todos.routes");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
require("dotenv").config();

const koaOptions = {
  origin: "*",
  credentials: false,
};

const app = new Koa();

app.use(cors(koaOptions));
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    err.status = err.statusCode || err.status || 500;
    throw err;
  }
});
app.use(bodyParser());

app.use(usersRouter.routes()).use(usersRouter.allowedMethods());
app.use(todosRouter.routes()).use(todosRouter.allowedMethods());
app.listen(process.env.PORT);

console.log("Application is running on port 3000");
