const userModel = require("../models/users").userModel;
const { uniqId } = require("../../helpers/uniqueIdGenerator");

module.exports = {
  createTodo: function (req, res, next) {
    const id = req.body.userId;
    const todo = req.body.todo;
    const uniqTodoId = uniqId();
    todo.id = uniqTodoId;

    userModel.findOneAndUpdate(
      { _id: id },
      { $push: { todos: todo } },
      (error, result) => {
        if (error) next(new Error("ERROR ON ADD"));
        res.json({
          status: "success",
          message: "Successfully added",
          data: {
            todoId: uniqTodoId,
          },
        });
      }
    );
  },
  deleteTodo: function (req, res, next) {
    const id = req.body.userId;
    const todoId = req.body.todoId;
    console.log("HERE", id, todoId);
    //
    userModel.update(
      { _id: id },
      {
        $pull: {
          todos: { id: todoId },
        },
      },
      { safe: true }, ///!!!!!!!!!!!!!!!!!!!!!!!1
      function (error, result) {
        if (error) next(new Error("ERROR ON DELETE"));

        console.log("RESULT", result);

        res.json({
          status: "success",
          message: "Successfully Deleted",
          data: {
            todoId: todoId,
          },
        });
      }
    );
  },
  editTodo: function (req, res, next) {
    const id = req.body.userId;
    const todoId = req.body.todoId;
    const editedText = req.body.editedText;

    userModel.update(
      { _id: id, "todos.id": todoId },
      {
        $set: {
          "todos.$.text": editedText || "todos.$".text,
        },
      },
      { safe: true },
      function (error, result) {
        if (error) next(new Error("ERROR ON EDIT"));

        console.log("RESULT EDIT", result);

        res.json({
          status: "success",
          message: "Successfully edited",
          data: {
            todoId: todoId,
          },
        });
      }
    );
  },
  setTodoStatus: function (req, res, next) {
    const id = req.body.userId;
    const todoId = req.body.todoId;
    const newStatus = req.body.newStatus;

    //!!!!!!!!!!!!!!!!!!!!!!!1

    userModel.update(
      { _id: id, "todos.id": todoId },
      {
        $set: {
          "todos.$.completed": newStatus,
        },
      },
      { safe: true },
      function (error, result) {
        if (error) next(new Error("ERROR ON EDIT status"));

        console.log("RESULT EDIT", result);

        res.json({
          status: "success",
          message: "Successfully edited status",
          data: {
            todoId: todoId,
          },
        });
      }
    );
  },
};
