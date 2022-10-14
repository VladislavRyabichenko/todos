const { uniqId } = require("../helpers/uniqueIdGenerator");
const client = require("../config/config");
const ObjectId = require("mongodb").ObjectId;

const users = client.db("test").collection("users");

const createTodo = async (userId, todo) => {
  const uniqTodoId = uniqId();

  todo.id = uniqTodoId;
  return await users
    .findOneAndUpdate({ _id: new ObjectId(userId) }, { $push: { todos: todo } })
    .then(() => {
      return uniqTodoId;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

const deleteTodo = async (userId, todoId) => {
  return await users
    .findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $pull: { todos: { id: todoId } } }
    )
    .then(() => {
      return todoId;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

const editTodoText = async (userId, todoId, editedText) => {
  return await users
    .findOneAndUpdate(
      { _id: new ObjectId(userId), "todos.id": todoId },
      {
        $set: {
          "todos.$.text": editedText || "todos.$".text,
        },
      }
    )
    .then(() => {
      return todoId;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

const setTodoStatus = async (userId, todoId, newStatus) => {
  return await users
    .findOneAndUpdate(
      { _id: new ObjectId(userId), "todos.id": todoId },
      {
        $set: {
          "todos.$.completed": newStatus,
        },
      }
    )
    .then(() => {
      return todoId;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

module.exports = {
  createTodo,
  deleteTodo,
  editTodoText,
  setTodoStatus,
};
