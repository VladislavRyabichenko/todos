const userModel = require("../models/users").userModel;
const { uniqId } = require("../../helpers/uniqueIdGenerator");

module.exports = {
  getAllTodos: function (userId, emitter) {
    userModel.findOne({ _id: userId }, (error, result) => {
      if (error) emitter(new Error("ERROR ON GET TODOS"));
      return emitter(result.todos);
    });
  },

  createTodo: function (userId, todo, emitter) {
    todo.id = uniqId();

    userModel.findOneAndUpdate(
      { _id: userId },
      { $push: { todos: todo } },
      (error) => {
        if (error) return emitter(new Error("ERROR ON ADD"));
        return emitter(todo);
      }
    );
  },

  deleteTodo: function (userId, todoId, emitter) {
    userModel.update(
      { _id: userId },
      {
        $pull: {
          todos: { id: todoId },
        },
      },
      function (error, result) {
        if (error) return emitter(new Error("ERROR ON DELETE"));
        return emitter(todoId);
      }
    );
  },

  editTodo: function (userId, todoId, editedText, emitter) {
    userModel.updateOne(
      { _id: userId, "todos.id": todoId },
      {
        $set: {
          "todos.$.text": editedText || "todos.$".text,
        },
      },
      function (error, result) {
        if (error) return emitter(new Error("ERROR ON EDIT"));

        return emitter({
          id: todoId,
          text: editedText,
        });
      }
    );
  },
  setTodoStatus: function (userId, todoId, newStatus, emitter) {
    userModel.updateOne(
      { _id: userId, "todos.id": todoId },
      {
        $set: {
          "todos.$.completed": newStatus,
        },
      },
      function (error) {
        if (error) return emitter(new Error("ERROR ON DELETE"));
        return emitter(todoId);
      }
    );
  },
};
