const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { collection } = require('../models/Books');
const Book = require('../models/Books');

// Here I use Get Method for Read
 router.get('/:page', (req, res, next) => {
 console.log("get")
 var skip = req.params.page
 console.log(req.params)
 console.log(2, skip)
 skip = parseInt(skip)
  Book.find().skip(skip).limit(2)
  .exec()
  .then(booksList => res.status(200).json(booksList))
  .catch(err => res.status(500).json({ error: err }));
});


router.post('/find', (req,res, next) =>{
  var skip = req.body.page
  var page = req.body.page;
  page =parseInt(page)
  var name = req.body.name
  //var name = new RegExp('^ab');
  
  console.log(req.body)
  console.log(2,skip)
  skip = parseInt(skip)
  const limit = 2
  skip = (page-1)*limit
  //To Find at Start
  Book.find({ name: { $regex: /^ab/i}}).skip(skip).limit(2)
  //To Find in Middle
  Book.find({ name: { $regex: "ab"}}).skip(skip).limit(2)
  //To Find in the End
  Book.find({ name: { $regex: /ab$/}}).skip(skip).limit(2)

  Book.find({ name: { $not:{$regex: /^ab.*/}}}).skip(skip).limit(2)
//Book.find({name: name}).skip(skip).limit(2)
  .exec()
  .then(booksList => res.status(200).json(booksList))
  .catch(err => res.status(500).json({ error: err }));
});


//Here I use Post Method for Create
router.post('/', (req, res, next) => {
  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  book
    .save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
  res.status(200).json({
    message: 'New Book Item has been created'
  });
});

//Here I use Delete Method for Delete
router.delete('/:bookId', (req, res, next) => {
  const id = req.params.bookId;
  Book.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => res.status(500).json({ error: err }));
});

//router.get('/:bookId', (req, res, next) => {
  //console.log("get2")
  //const id = req.params.bookId;
 // Book.findById(id)
   // .exec()
   // .then(book => {
   //   if (book) {
   //     res.status(200).json(book);
   //   } else {
   //     res.status(404).json({ message: 'Book not found' });
   //   }
  //  })
   // .catch(err => {
   //   res.status(500).json({ error: err });
   // });
//});

//Here I use Post Method for Update
router.post('/updateBook', (req,res, next) => {
  const name = req.body.name;
  const id = req.body.id;
  const price = req.body.price;
  Book.updateOne({$or:[{name: name}, {_id: id}]}, 
  {$set:{price: price}})
  .exec()
    .then(book => {
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    })
  
  //router.get('/', (req, res, next) => {
   // console.log("get3")
   // var skip = req.params.page
    //const cursor = collection.find(query, options);
   // Books.find().skip(skip).limit(2)
   //     .exec()
   //     .then(booksList => res.status(200).json(booksList))
   //     .catch(err => res.status(500).json({ error: err }));
   // });
  

})

module.exports = router;
