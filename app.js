const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const Books = require('./api/models/Books');
const Author = require('./api/models/Authors');
global.async = require("async");

mongoose.connect('mongodb://localhost:27017/CurdDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/author',require('./api/routes/Authors'));
app.use('/books',require('./api/routes/Books'))



module.exports = app;
