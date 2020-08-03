const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating Schema
const userSchema = new Schema({
   name:{
       type: String,
       required: true
   },
   email:{
       type: String,
       required: true,
       unique: true
   },
   password:{
       type: String,
       required: true
   },
   date: {
    type: Date,
    default: Date.now
}

});

module.exports = userModel = mongoose.model('userModel', userSchema);