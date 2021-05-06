const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Names: String,
  description: String,
   
});

module.exports = mongoose.model('Authors', authorSchema);