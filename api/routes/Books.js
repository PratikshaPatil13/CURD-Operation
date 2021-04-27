const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Books = require('../models/Books');
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

// display the documents by defining the page number 
router.post('/find', (req,res, next) =>{
  var skip = req.body.page
  var page = req.body.page;
  page =parseInt(page)
  var name = req.body.name  
  var price =req.body.price
  console.log(req.body)
  console.log(2,skip)
  skip = parseInt(skip)
  const limit = 2
  skip = (page-1)*limit
  //To Find at Start
  //Book.find({ name: { $regex: /^ab/i}}).skip(skip).limit(2)
  //To Find in Middle
  //Book.find({ name: { $regex: "ab"}}).skip(skip).limit(2)
  //To Find in the End
  //Book.find({ name: { $regex: /ab$/}}).skip(skip).limit(2)
  //Book.find({ name: { $not:{$regex: /^ab.*/}}}).skip(skip).limit(2)
  Book.find({name:name}).skip(skip).limit(2)
  //Book.find({name : {$regex: name,$options:'i'}
  //Book.find({$and: [{name: {$regex : name,$options:'i'}},{price: price}]})
  .exec()
  .then(booksList => res.status(200).json(booksList))
  .catch(err => res.status(500).json({ error: err }));
});


//Here I use Post Method for Create
router.post('/', (req, res, next) => {
  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    author: req.body.author,
    estYear: req.body.estYear
    
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
router.delete('/:books', (req, res, next) => {
  const id = req.params.books;
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
  //const price = req.body.price;
  const author = req.body.author;
  const quotes = req.body.quotes;
  const index = req.body.index;
  const estYear = req.body.estYear;
  const quantity = req.body.quantity;
  var objectToSave = {}
  if(quotes){
    console.log("save value for quotes")
    objectToSave.quotes = quotes
  }
  if(author){
    objectToSave.author = author
  }
  if(index){
    objectToSave.index = index
  }
  if(estYear){
    objectToSave.estYear = estYear
  }
  if(quantity){
    objectToSave.quantity = quantity
  }

  Book.updateOne({name : name},{$set:{quantity:quantity} })
  //Book.updateOne({name: name}, 
  //  {$push:{quotes : req.body.quotes }
  //})
   //{$set:objectToSave
   // })
   .exec()
   .then(booksList => res.status(200).json(booksList))
   .catch(err => res.status(500).json({ error: err }));
});

//Aggregate Pipeline Stages 
router.post('/pipeline', (req,res, next) =>{
  console.log("post")
  const name = req.body.name;
  Book.aggregate([{$project:{
     name:name, index:1
    }},
     {$unwind:"$index"},
    {$match:{name:name}}])
        .exec()
        .then(booksList => res.status(200).json(booksList))
        .catch(err => res.status(500).json({ error: err }));
});

//Group Stage:
router.post('/group' , (req , res , next) => {
  Book.aggregate([{
      $group:{
        _id: "$name",
        totalPriceAmount:{ $sum : { $multiply: ["$price", "$quantity"] } },
        averageQuantity: {$avg: "$quantity"},
        count:{$sum:1}
      }}
    ])
    .exec()
    .then(booksList => res.status(200).json(booksList))
    .catch(err => res.status(500).json({ error: err }));
});

router.post('/limit' , (req , res , next) => {
  Book.aggregate([{
    $limit: 1
  }])
    .exec()
    .then(booksList => res.status(200).json(booksList))
    .catch(err => res.status(500).json({ error: err }));
})


module.exports = router;
