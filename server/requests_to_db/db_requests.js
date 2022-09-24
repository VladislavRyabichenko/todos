const jwt = require("jsonwebtoken");
const { localStorage } = require("../localStorage/localStorage.js");

const SECRET = process.env.SECRET_KEY;
const UserTodos =
  require("../mongooseConfig/mongooseConfig.js").USER_TODOS_MODEL;

async function loginUser(login, password) {
  const result = await UserTodos.findOne({
    login: login,
    password: password,
  })
    .then((userData) => {
      if (userData !== null) {
        const id = userData["_id"].toString();
        const token = jwt.sign({ id: id }, SECRET);
        localStorage.setItem("server-token-".concat(id), token);

        return { id: id, token: token };
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log("Oh Dark!", err);
      return new Error();
    });
  return result;
}

async function registerUser(login, password) {
  let result = null;
  const isPresent = await UserTodos.findOne({
    login: login,
  }).then((data) => {
    if (data) return true;
    if (!data) return false;
  });
  if (!isPresent) {
    const newUser = new UserTodos({
      login: login,
      password: password,
      todos: [],
    });
    result = await newUser
      .save()
      .then((userData) => {
        const id = userData["_id"].toString();
        return id;
      })
      .catch((err) => {
        console.log("ERR IN REG REQUESt", err);

        return new Error(err.message);
      });
  }

  return result;
}

async function getUserTodos(userId) {
  const result = await UserTodos.findOne({ _id: userId.toString() }).catch(
    (e) => {
      console.log("GET USER TODOS ERROR", e);
      return new Error(e.message)
    }
  );
  return result.todos;
}

async function addUserTodo(userId, todo) {
  const res = await UserTodos.findOneAndUpdate(
    { _id: userId.toString() },
    { $push: { todos: todo } }
  ).then(data => {
    return todo
  }).catch(e => {
    return new Error(e.message)
  });
  return res
}

async function updateUserTodo(userId, todoId, text) {
  const res = await UserTodos.findOneAndUpdate(
    { _id: userId.toString(), "todos.id": todoId },
    {
      $set: {
        "todos.$.text": text || "todos.$".text,
      },
    }
  ).catch((err) => {
    console.log("Oh! Dark", err);
  });
  return todoId;
}

async function toggleTodoStatus(userId, todoId, value) {
  const res = await UserTodos.findOneAndUpdate(
    { _id: userId.toString(), "todos.id": todoId },
    {
      $set: {
        "todos.$.completed": value,
      },
    }
  )
    .then(() => {
      return todoId;
    })
    .catch((err) => {
      console.log("Oh! Dark com", err);
      return err;
    });

  return res;
}

async function deleteTodo(userId, todoId) {
  const res = await UserTodos.findOne({ _id: userId.toString() })
    .then((doc) => {
      doc.todos = doc.todos.filter((todo) => {
        return todo.id !== todoId;
      });
      return doc;
    })
    .then((doc) => {
      doc.save();
    })
    .then(() => {
      return todoId;
    })
    .catch((err) => {
      console.log("Oh! Dark", err);
      return err;
    });
  return res;
}

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getUserTodos = getUserTodos;
exports.addUserTodo = addUserTodo;
exports.updateUserTodo = updateUserTodo;
exports.toggleTodoStatus = toggleTodoStatus;
exports.deleteTodo = deleteTodo;
