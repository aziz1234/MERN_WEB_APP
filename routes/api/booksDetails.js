const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Item Model
const bookDetails = require('../../models/bookDetailsModel');
const userShelf = require('../../models/userShelfModel');

//@route GET api/booksDetails
//This will get all the books with its details
router.get('/', (req, res) =>{
    bookDetails.find()
        .sort({bookName:1})
        .then(booksDetails => res.json(booksDetails))
});


//@route POST api/booksDetails
//This will add book details to the data base
router.post('/', (req, res) =>{
    const newBookDetails = new bookDetails({
        bookName: req.body.bookName,
        bookDescription: req.body.bookDescription,
        bookGenre: req.body.bookGenre,
        review: req.body.review,
        rating: req.body.rating
    });
    
    newBookDetails.save().then(bookDetails => res.json(bookDetails));
});

//@route PUT api/booksDetails/:id
// updates the book details by id
router.put('/:id', (req, res) =>{
    bookDetails.findByIdAndUpdate(req.params.id, req.body)
        .then(()=>res.json({msg: 'Book details updated successfully'}))
        .catch(err => res.status(404).json({msg:'task failure'}));
});

//@route DELETE api/booksDetails/:id
//deletes the book details by id
router.delete('/:id', (req, res) =>{
    bookDetails.findById(req.params.id)
        .then(bookDetails => bookDetails.remove()
        .then(()=>res.json({msg: 'Book details deleted successfully'})))
        .catch(err => res.status(404).json({msg:'task failure'}));
});

//@route PUT api/booksDetails/appendGenre/:id
//appends a new genre to the book by id
router.put('/appendGenre/:id',(req, res) =>{
    bookDetails.findByIdAndUpdate(req.params.id,{$push :{bookGenre: req.body.bookGenre}})
        .then(()=>res.json({msg: 'Book details updated successfully'}))
        .catch(err => res.status(404).json({msg:'task failure'}));
});

//@route PUT api/booksDetails/appendRating/:id
//appends a new Rating to the book by id
router.put('/appendRating/:id',(req, res) =>{
    bookDetails.findByIdAndUpdate(req.params.id,{$push :{bookRating: req.body.bookRating}})
        .then(()=>res.json({msg: 'Book details updated successfully'}))
        .catch(err => res.status(404).json({msg:'task failure'}));
});

//@route PUT api/booksDetails/appendReview/:id
//appends a new review to the book by id
router.put('/appendReview/:id',(req, res) =>{
    bookDetails.findByIdAndUpdate(req.params.id,{$push :{bookReview: req.body.bookReview}})
        .then(()=>res.json({msg: 'Book details updated successfully'}))
        .catch(err => res.status(404).json({msg:'task failure'}));
});

//
//
router.get('/reviews/:bookid', (req, res) =>{

   // mongoose.Types.ObjectId
   userShelf.find({"bookShelf.bookId":mongoose.Types.ObjectId(req.params.bookid)})
            .then(critics=>{
                console.log(critics);
                return res.json({critics});
            })
            .catch(err=>res.status(400).json({error:"server error"}));
        
});
 //
module.exports = router;

