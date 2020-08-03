const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating Schema
const bookDetailsSchema = new Schema({
    bookName: {
        type: String,
        required: true
    },
    bookDescription: {
        type: String,
        required: true
    },
    bookGenre: {
        type: Array
    },
    publicationDate: {
        type: Date
    },
    review: {
        type: [String]
    },
    rating: {
        type: [Number]
    },
    date: {
        type: Date,
        default: Date.now
    }
});



module.exports = bookDetailsModel = mongoose.model('bookDetailsModel', bookDetailsSchema);