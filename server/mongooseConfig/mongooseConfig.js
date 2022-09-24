const mongoose = require("mongoose");

const userTodosSchema = new mongoose.Schema({
  login: String,
  password: String,
  userId: String,
  todos: Array,
});

userTodosSchema.methods.getTodos = function getTodos() {
  return this.todos;
};

const UserTodos = mongoose.model("UserTodos", userTodosSchema);

async function main() {
  const uri =
    "mongodb+srv://VladislavRiabichenko:Cooler123@freecluster.0v0xtzp.mongodb.net/test";
  await mongoose.connect(uri);
}

exports.USER_TODOS_MODEL = UserTodos;
exports.mongooseMain = main;
