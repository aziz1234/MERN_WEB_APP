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
        .sort({date:1})
        .then(booksDetails =>{
            return res.json(booksDetails)
        })
        .catch(err=>res.status(500).json({err:"No Books Found"}));
});

//@route GET api/booksDetails/:id
//This will get book by id
router.get('/:id', (req, res) =>{
    bookDetails.findById(req.params.id)
        .then(bookDetails =>{
            return res.json(bookDetails)
        })
        .catch(err=>res.status(500).json({err:"No Book Found"}));
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


//@route GET api/bookDetails/reviews/:bookid
//gets all the reviews for a book
router.get('/reviews/:bookid', (req, res) =>{
   userShelf.find()
            .populate('user',['name'])
            .then(result=>{
                reviews=[];
                for(i=0;i<result.length;i++){
                    reviews[i] = result[i].bookShelf.map((x=>{
                        if(x.bookId.toString() === req.params.bookid){
                            return ({details:x,name:result[i].user.name});
                        }
                        else
                            {
                                return null;
                            }
                        }));
                }
                finalreviews = reviews.flat().filter(x=>x);
                return res.json({finalreviews});
            })
            .catch(err=>res.status(400).json({error:"server error"}));
        
});

//@route GET api/bookDetails/bygenre/:genre
//route to get books by a genre   
router.get('/bygenre/:genre',(req,res)=>{
    bookDetails.find({ bookGenre: { $in: [req.params.genre] } })
                .then(books=> {
                    return res.json(books)
                }) 
                .catch(err=>res.status(400).json({err:"server error"}));
})

module.exports = router;

