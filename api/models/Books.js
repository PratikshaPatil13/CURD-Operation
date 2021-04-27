const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  quantity: Number,
  author: String,
  estYear: Date,
  quotes: [String],
  index: [Number]
});

module.exports = mongoose.model('Books', booksSchema);
