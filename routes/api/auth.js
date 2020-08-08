const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const jwtToken = require('../../config/keys').jwtSecret;
const User = require('../../models/userModel');

// @route    GET api/auth
// @desc     Get user details by passing token.
// @access   Public
router.get('/', auth, (req, res) =>{
   User.findById(req.newUser.id).select('-password')
        .then(user => res.json(user))
        .catch(()=>res.status(500).json({msg:'server error'}))
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    User.findOne({email})
    .then(newUser =>{
        if(!newUser){
          return res.status(400).json({ errors: [{ msg: 'Invalid Id or Password' }] });
        }
        else{
            bcrypt.compare(password, newUser.password)
            .then(isMatch=>{
                if(isMatch){
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
                }else{
                    return res.status(400).json({ errors: [{ msg: 'Invalid Id or Password' }] });
                }
            })
            
        }
           
        
    })
  });
module.exports = router;
