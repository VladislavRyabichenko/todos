const Koa = require("koa");
const client = require("./config/config");
const { usersRouter } = require("./routes/users");
const { todosRouter } = require("./routes/todos");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const jwt = require("jsonwebtoken");
const combineRouters = require("koa-combine-routers");

const secretKey = "SECRET_KEY";

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

// // const someRouter = new Router();
// const router = combineRouters(todosRouter, usersRouter);
// app.use(router());
app.use(usersRouter.routes()).use(usersRouter.allowedMethods());
app.use(todosRouter.routes()).use(todosRouter.allowedMethods());
app.listen(3000);

console.log("Application is running on port 3001");
