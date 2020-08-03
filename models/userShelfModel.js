const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating Schema
const userShelfSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    bookShelf:[{
        bookId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'bookDetailsModel'
        },
        status:{
            type: String
        },
        rating:{
            type: Number
        },
        review:{
            type: String
        },
        date:{
            type: Date,
            default: Date.now 
        }
   }]
})

module.exports = userShelfModel = mongoose.model('userShelfModel', userShelfSchema);