const userModel = require("../models/users").userModel;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  create: function (req, res, next) {
    userModel.findOne({ login: req.body.login }, function (error, result) {
      if (result) {
        res.json({
          status: "error",
          message: "User with this login already exists",
          data: null,
        });
      } else {
        userModel.create(
          {
            login: req.body.login,
            password: req.body.password,
            todos: [],
          },
          function (error) {
            if (error) {
              next(error);
            } else {
              res.json({
                status: "success",
                message: "Successfully registered",
                data: null,
              });
            }
          }
        );
      }
    });
  },
  authenticate: function (req, res, next) {
    const { login, password } = req.body;
    userModel.findOne(
      {
        login: req.body.login,
      },
      function (error, userInfo) {
        if (error) {
          next(error);
        } else {
          if (userInfo && bcrypt.compareSync(password, userInfo.password)) {
            const token = jwt.sign(
              { id: userInfo._id },
              req.app.get("secretKey"),
              {
                expiresIn: "1h",
              }
            );
            const responseData = {
              _id: userInfo._id,
              login: userInfo.login,
              password: password,
              todos: userInfo.todos,
            };
            // console.log("USER FOUND", userInfo);
            res.json({
              status: "success",
              message: "User found",
              data: {
                user: responseData,
                token: token,
              },
            });
          } else {
            console.log("USER NOT FOUND");
            res.json({
              status: "error",
              message: "Invalid login/password",
              data: null,
            });
          }
        }
      }
    );
  },
};
