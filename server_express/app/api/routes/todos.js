const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todos");

router.post("/create", todoController.createTodo);
router.delete("/delete", todoController.deleteTodo);
router.patch("/edit", todoController.editTodo);
router.patch("/status", todoController.setTodoStatus);

module.exports.todoRouter = router;
