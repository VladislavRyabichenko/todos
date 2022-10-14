const Router = require("koa-router");
const {
  postTodo,
  removeTodo,
  editTodo,
  setStatus,
} = require("../api/todosApi");
const { tokenValidation } = require("../middleware/tokenValidation");

const todosRouter = new Router({
  prefix: "/todos",
});

todosRouter.post("/create", tokenValidation, postTodo);
todosRouter.delete("/delete", tokenValidation, removeTodo);
todosRouter.patch("/edit", tokenValidation, editTodo);
todosRouter.patch("/status", tokenValidation, setStatus);

module.exports = todosRouter;
