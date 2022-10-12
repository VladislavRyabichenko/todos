const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const users = require("../config/config").db("test").collection("users");

const create = async (login, password) => {
  const user = {
    login: login,
    password: bcrypt.hashSync(password, saltRounds),
    todos: [],
  };
  const isExists = await users.findOne({ login: login });

  if (!isExists) {
    return await users
      .insertOne(user)
      .catch((error) => new Error("Error in registration"));
  } else {
    console.log("EXIST");
    throw new Error("User Exists");
  }
};

const authenticate = async (login, password) => {
  const user = await users.findOne({ login: login }).catch((error) => {
    throw new Error("Failed request to DB");
  });
  console.log("AUTH", user);
  if (!user) throw new Error("User does not exist");

  if (
    user &&
    (bcrypt.compareSync(password, user.password) ||
      bcrypt.compare(password, user.password))
  ) {
    const token = jwt.sign({ id: user._id }, "SECRET_KEY", {
      expiresIn: "1h",
    });

    return {
      user: user,
      token: token,
    };
  }
};

module.exports = {
  create,
  authenticate,
};
