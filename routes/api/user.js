const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const jwtToken = require('../../config/keys').jwtSecret;
const User = require('../../models/userModel');

// @route POST api/user
// creates a new user.
router.post('/',
[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
 (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    User.findOne({email})
      .then(user =>{
          if(user){
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
          }
          else{
            const newUser = new User({
              name,
              email,
              password
            });
            // Hashing the password
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                  .save()
                  .then(user => res.json(user))
                  .catch(err => console.log(err));
                
                const payload = {
                  newUser:{
                    id: newUser.id
                  }
                };

                jwt.sign(payload,
                    jwtToken,
                    { expiresIn: 360000},
                    (err,token)=>{
                      if (err) throw err;
                      res.json({ token })
                    }
                  );
                
              });
            });
          }
      }) 
 });

 //Delete a user completely from database
 router.delete('/',auth, (req,res)=>{
   User.findOneAndDelete(req.newUser.id)
       .then(msg=>{
         return res.json(msg); 
       })
       .catch(err=>{
         res.status(400).json(err);
       })
 });

 module.exports = router;