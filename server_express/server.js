const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const connectDB = require('./app/api/config/config').connectDB;
const cors = require('cors');

const jwt = require('jsonwebtoken');

const { usersRouter } = require('./app/api/routes/users');
const { todoRouter } = require('./app/api/routes/todos.js');
app.set('secretKey', 'nodeRestApi');

connectDB().catch((err) => console.log(err));

app.use(cors({ origin: '*' }));

app.use(logger('dev'));
app.use(bodyParser.json()); // for json encoded bodies

app.get('/', function (req, res) {
  res.json({ tutorial: 'BUILD REST API' });
});

function validateUser(req, res, next) {
  console.log('VALIDATION');
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (error, decoded) {
    if (error) {
      res.json({ status: 'error', message: error.message, data: null });
    } else {
      console.log('DECODED', decoded.id);
      console.log('USER ID', req.body.userId);
      req.body.userId = decoded.id;
      next();
    }
  });
}

// public route
app.use('/users', usersRouter);

// private route
app.use('/todos', validateUser, todoRouter);

// handle 404 error
app.use(function (req, res, next) {
  let error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.listen(3000, function () {
  console.log('Node server.js listening on port 3000');
});
