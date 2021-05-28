const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Author = require('../models/Authors');
const Book = require('../models/Books');

//read the document
router.get('/', (req, res, next) => {
    Author.find()
      .exec()
      .then(authorList => 
        {
          async.each(authorList, function(book, callback)
          {
            console.log(book)
            callback()
          })
          res.status(200).json(authorList)})
      .catch(err => res.status(500).json({ error: err }));
});

//create the document
router.post('/', (req, res, next) => {
    const author = new Author({
      _id: new mongoose.Types.ObjectId(),
      Names: req.body.Names,
      description: req.body.description,
    });
    author
      .save()
      .then(result => console.log(result))
      .catch(err => console.log(err));
    res.status(200).json({
      message: 'Author has been added'
    });
})

//delete the document
router.delete('/:author', (req, res, next) => {
  const id = req.params.author;
  Author.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => res.status(500).json({ error: err }));
});

//Lookup stage
router.post('/lookUp', (req,res, next) =>{
  Book.aggregate([
    {
     $lookup:
      {
       from: "authors",
       localField: "author",
       foreignField: "_id",
       as: "books_doc"
      }
    }
  ])
  .exec()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => res.status(500).json({ error: err }));
});


module.exports = router;


