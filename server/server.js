const http = require("http");
const url = require("url");
const querystring = require("querystring");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const HOST = process.env.HOST;
const PORT = process.env.PORT;
const SECRET = process.env.SECRET_KEY;

const connectDB = require("./mongooseConfig/mongooseConfig.js").mongooseMain;
const {
  registerUser,
  loginUser,
  getUserTodos,
  addUserTodo,
  updateUserTodo,
  toggleTodoStatus,
  deleteTodo,
} = require("./requests_to_db/db_requests.js");

connectDB().catch((err) => console.log(err));

const tokenVerify = (token) => {
  if (token !== "null" && token !== "undefined") {
    const { id } = jwt.verify(token, SECRET);
    const serverToken = localStorage.getItem("server-token-".concat(id));
    return serverToken === token;
  } else {
    return false;
  }
};

const handleOptions = (req, res) => {
  const headers = {};

  headers["Access-Control-Allow-Origin"] = "*";
  headers["Access-Control-Allow-Methods"] =
    "POST, GET, PUT, PATCH, DELETE, OPTIONS";
  headers["Access-Control-Allow-Credentials"] = false;
  headers["Access-Control-Max-Age"] = "86400"; // 24 hours
  headers["Access-Control-Allow-Headers"] =
    "X-Requested-With, X-HTTP-Method-Override, content-type, x-access-token";
  res.writeHead(200, headers);
  res.end();
};

const requestListener = async function (req, res) {
  const method = req.method;

  if (req.method === "OPTIONS") {
    handleOptions(req, res);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type,x-access-token "
    );
  }
  const parsedUrl = url.parse(req.url);
  const parsedQuery = querystring.parse(parsedUrl.query);
  const userId = parsedQuery["userId"];

  if (req.url.indexOf("/login") === 0) {
    if (req.url.includes("/signIn")) {
      if (method === "POST") {
        let body = "";
        req.on("data", function (chunk) {
          body += chunk;
        });

        req.on("end", function () {
          let todoObjJson = JSON.parse(body);
          const { login, password } = todoObjJson;

          loginUser(login, password)
            .then((data) => {
              res.writeHead(200);
              res.end(JSON.stringify(data));
            })
            .catch((e) => {
              res.writeHead(500);
              res.end(JSON.stringify({ STATUS: "FAIL" }));
            });
        });
      }
    }

    if (req.url.includes("/registration")) {
      if (method === "POST") {
        let body = "";

        req.on("data", function (chunk) {
          body += chunk;
        });

        req.on("end", function () {
          let todoObjJson = JSON.parse(body);
          const { login, password } = todoObjJson;

          registerUser(login, password)
            .then((data) => {
              res.end(JSON.stringify(data));
            })
            .catch((e) => {
              res.end(JSON.stringify(null));
            });
        });
      }
    }
  }

  if (req.url.indexOf("/todos") === 0) {
    if (method === "GET") {
      getUserTodos(userId)
        .then((data) => {
          res.writeHead(200);
          res.end(JSON.stringify(data));
        })
        .catch((e) => {
          res.writeHead(500);
          res.end(JSON.stringify({ STATUS: "FAIL" }));
        });
    }

    if (method === "POST") {
      const isAuth = tokenVerify(req.headers["x-access-token"]);
      if (!isAuth) {
        res.statusCode = 500;
        res.end("Token in not verified");
        return;
      } else {
        let body = "";
        req.on("data", function (chunk) {
          body += chunk;

          req.on("end", function () {
            const { todo } = JSON.parse(body);
            addUserTodo(userId, todo)
              .then((data) => {
                res.writeHead(200);
                // res.statusCode = 200;
                res.end(JSON.stringify(data));
              })
              .catch((e) => {
                res.writeHead(500);
                res.end(JSON.stringify({ STATUS: "FAIL" }));
              });
          });
        });
      }
    }

    if (method === "DELETE") {
      const isAuth = tokenVerify(req.headers["x-access-token"]);
      if (!isAuth) {
        res.statusCode = 500;
        res.end("Token in not verified");
        return;
      } else {
        let body = "";
        req.on("data", function (chunk) {
          body += chunk;
        });

        req.on("end", function () {
          const { todoId } = JSON.parse(body);
          deleteTodo(userId, todoId)
            .then((data) => {
              res.writeHead(200);
              res.end(JSON.stringify(data));
            })
            .catch((e) => {
              res.writeHead(500);
              res.end(JSON.stringify({ STATUS: "FAIL" }));
            });
        });
      }
    }

    if (req.url.includes("/edit")) {
      const { text, status } = parsedQuery;
      if (method === "PATCH" && text) {
        const isAuth = tokenVerify(req.headers["x-access-token"]);
        if (!isAuth) {
          res.statusCode = 500;
          res.end("Token in not verified");
          return;
        } else {
          let body = "";
          req.on("data", function (chunk) {
            body += chunk;
          });
          req.on("end", function () {
            const { todoId, text } = JSON.parse(body);
            updateUserTodo(userId, todoId, text)
              .then((data) => {
                res.writeHead(200);
                res.end(JSON.stringify(data));
              })
              .catch((e) => {
                res.writeHead(500);
                res.end(JSON.stringify({ STATUS: "FAIL" }));
              });
          });
        }
      }

      if (method === "PATCH" && status) {
        const isAuth = tokenVerify(req.headers["x-access-token"]);
        if (!isAuth) {
          res.statusCode = 500;
          res.end("Token in not verified");
          return;
        } else {
          let body = "";
          req.on("data", function (chunk) {
            body += chunk;
          });

          req.on("end", function () {
            const { userId, todoId, value } = JSON.parse(body);
            toggleTodoStatus(userId, todoId, value)
              .then((data) => {
                res.writeHead(200);
                res.end(JSON.stringify(data));
              })
              .catch((e) => {
                res.writeHead(500);
                res.end(JSON.stringify(e));
              });
          });
        }
      }
    }
  }
};

const server = http.createServer(requestListener);

server.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
