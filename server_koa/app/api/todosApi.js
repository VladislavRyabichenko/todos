const {
  createTodo,
  deleteTodo,
  editTodoText,
  setTodoStatus,
} = require("../controllers/todos");

const postTodo = async (ctx) => {
  const { todo, userId } = ctx.request.body;

  await createTodo(userId, todo)
    .then((todoId) => {
      ctx.response.status = 200;
      ctx.body = {
        status: "success",
        data: {
          todoId: todoId,
        },
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

const removeTodo = async (ctx) => {
  const { userId, todoId } = ctx.request.body;

  await deleteTodo(userId, todoId)
    .then((todoId) => {
      ctx.response.status = 200;
      ctx.body = {
        status: "success",
        data: {
          todoId: todoId,
        },
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

const editTodo = async (ctx) => {
  const { userId, todoId, editedText } = ctx.request.body;

  await editTodoText(userId, todoId, editedText)
    .then((todoId) => {
      ctx.response.status = 200;
      ctx.body = {
        status: "success",
        data: {
          todoId: todoId,
        },
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

const setStatus = async (ctx) => {
  const { userId, todoId, newStatus } = ctx.request.body;

  await setTodoStatus(userId, todoId, newStatus)
    .then((todoId) => {
      ctx.response.status = 200;
      ctx.body = {
        status: "success",
        data: {
          todoId: todoId,
        },
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
  postTodo,
  removeTodo,
  editTodo,
  setStatus,
};
