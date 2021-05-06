const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  quantity: Number,
  author: mongoose.Schema.Types.ObjectId,
  estYear: Date,
  quotes: [String],
  index: [Number],
});

module.exports = mongoose.model('Books', booksSchema);
