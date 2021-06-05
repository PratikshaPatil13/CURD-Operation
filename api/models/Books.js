const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name:{ 
    type:String,
  },
  price: {
    type:Number,
  },
  quantity:{
    type: Number,
  },
  author:{
    type: mongoose.Schema.Types.ObjectId,
  },
  estYear:{
    type: Date,
  },
  quotes:{
    type: [String],
  },
  index:{
    type: [Number],
  },

});

module.exports = mongoose.model('Books', booksSchema);
