const jwt = require('jsonwebtoken');
const jwtToken = require('../config/keys').jwtSecret;

module.exports = function(req, res, next){
    //get token from header
    const token = req.header('x-auth-token');

    //check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
      }
    
      // Verify token
      try {
        jwt.verify(token, jwtToken, (error, decoded) => {
          if (error) {
            return res.status(401).json({ msg: 'Token is not valid' });
          } else {
            req.newUser = decoded.newUser;
            next();
          }
        });
      } catch (err) {
        console.error('something wrong with auth middleware');
        res.status(500).json({ msg: 'Server Error' });
      }
   
 };
