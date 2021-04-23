const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const booksRouter = require('./api/routes/Books');

mongoose.connect('mongodb://localhost:27017/CurdDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/books', booksRouter);


module.exports = app;
