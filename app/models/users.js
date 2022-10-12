const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) {
    console.error(err);
    process.exit(-1);
    console.log("Err");
  }
  console.log("Successfully connected to MongoDB");
});

module.exports = client;

// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const Schema = mongoose.Schema;
//
// const UserSchema = new Schema({
//   login: {
//     type: String,
//     trim: true,
//     required: true,
//   },
//   password: {
//     type: String,
//     trim: true,
//     required: true,
//   },
//   todos: {
//     type: Array,
//     required: false,
//   },
// });
//
// UserSchema.pre("save", function (next) {
//   this.password = bcrypt.hashSync(this.password, saltRounds);
//   next();
// });
//
// module.exports.userModel = mongoose.model("User", UserSchema);
