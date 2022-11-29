const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const connectDB = require("./app/api/config/config").connectDB;
const cors = require("cors");
const logger = require("morgan");

const { usersRouter } = require("./app/api/routes/users");
const { todoRouter } = require("./app/api/routes/todos.js");
const {
  createTodo,
  deleteTodo,
  setTodoStatus,
  editTodo,
  getAllTodos,
} = require("./app/api/controllers/todos");

function validateUser(userId, token) {
  let validationResult = false;
  jwt.verify(token, app.get("secretKey"), function (error, decoded) {
    if (error) {
      validationResult = false;
    } else {
      console.log("VALIDATION SUCCESS");
      validationResult = true;
    }
  });
  return validationResult;
}

const app = express();
app.set("secretKey", "nodeRestApi");

app.use(cors({ origin: "*" }));
app.use(logger("dev"));
app.use(bodyParser.json()); // for json encoded bodies
// public route
app.use("/users", usersRouter);
// private route
app.use("/todos", validateUser, todoRouter);
// handle 404 error
app.use(function (req, res, next) {
  let error = new Error("Not Found");
  error.status = 404;
  next(error);
});

const httpServer = new http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:8080",
  },
});

const emitToAll = (socket, ev) => {
  return (data) => {
    socket.emit(ev, data);
    socket.broadcast.emit(ev, data);
  };
};

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  const userId = socket.handshake.auth.userId;

  if (validateUser(userId, token)) {
    next();
  } else {
    next(new Error("TOKEN IS NOT VALID"));
  }
});

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });

  socket.on("todo.getAllTodos", (userId) => {
    getAllTodos(userId, emitToAll(socket, "todo.allTodos"));
  });

  socket.on("todo.add", (userId, todo) => {
    createTodo(userId, todo, emitToAll(socket, "todo.new"));
  });
  socket.on("todo.delete", (userId, todoId) => {
    deleteTodo(userId, todoId, emitToAll(socket, "todo.deleted"));
  });
  socket.on("todo.updateStatus", (userId, todoId, newStatus) => {
    setTodoStatus(
      userId,
      todoId,
      newStatus,
      emitToAll(socket, "todo.statusUpdated")
    );
  });
  socket.on("todo.editTodo", (userId, todoId, editedText) => {
    console.log("HERE", userId, todoId, editedText);
    editTodo(userId, todoId, editedText, emitToAll(socket, "todo.todoEdited"));
  });
});

connectDB().catch((err) => console.log(err));

app.get("/", function (req, res) {
  res.json({ tutorial: "BUILD REST API" });
});

httpServer.listen(3000, function () {
  console.log("Node server.js listening on port 3000");
});
