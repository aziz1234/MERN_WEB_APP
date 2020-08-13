const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

//model import
const userShelf = require('../../models/userShelfModel');
const User = require('../../models/userModel');

//@route GET api/userShelf/mybooks
//get all the books from the logged in user's self.
router.get('/mybooks', auth, (req,res)=>{
    userShelf.findOne({user: req.newUser.id})
    .populate('user',['name'])
    .populate('bookShelf.bookId',['bookName'])
    .then(mybooks=>{
        if(mybooks)
            return res.json(mybooks);
        else{
            return res.status(400).json({msg:"No books in your shelf yet"});
        }
    })
    .catch(err=>res.status(500).json({msg:'server error'}));
})


//@route POST api/userShelf/mybooks.
//create/update user's bookSelf.
router.post('/:bookid',auth,(req,res)=>{
    const{
        status,
        rating,
        review
    } = req.body;
    const bookShelfFields ={};
    bookShelfFields.bookId = req.params.bookid;
    if(status) bookShelfFields.status = status;
    if(rating) bookShelfFields.rating = rating;
    if(review) bookShelfFields.review = review;
    userShelf.findOne({user: req.newUser.id})
        .then(usershelf=>{
            if(usershelf){
                userShelf.findOneAndUpdate({user:req.newUser.id,"bookShelf.bookId":req.params.bookid},{$set:{"bookShelf.$":bookShelfFields}},{new:true})
                        .then(book=>{
                            if(book)
                                return res.json({book});
                            else{
                                userShelf.findOneAndUpdate({user:req.newUser.id},{$push:{bookShelf:bookShelfFields}},{new:true})
                                .then(book=>{
                                    return res.json({book});
                                })
                            }
                        })
            }
            else{
                newUserShelf = new userShelf({
                    user: req.newUser.id,
                    bookShelf: bookShelfFields
                })
                newUserShelf
                .save()
                .then(userBookShelf=>{
                    return res.json({userBookShelf});
                })
            }
        })


})

module.exports = router;