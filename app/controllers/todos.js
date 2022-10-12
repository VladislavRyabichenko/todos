const { uniqId } = require("../helpers/uniqueIdGenerator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = require("../config/config").db("test").collection("users");
const ObjectId = require("mongodb").ObjectId;

const createTodo = async (userId, todo) => {
  const uniqTodoId = uniqId();

  todo.id = uniqTodoId;
  console.log("CREATE TODO", todo);
  return await users
    .findOneAndUpdate({ _id: new ObjectId(userId) }, { $push: { todos: todo } })
    .then((found) => {
      console.log("CREATE FOUND", found);
      console.log("HERE SUCESS UPDATE");
      return todo;
    })
    .catch((error) => {
      console.log("CATCH ERROR");
      throw new Error(error.message);
    });
};

module.exports = {
  createTodo,
};
