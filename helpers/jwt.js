const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

function issueJWT(user) { 
  const _id = user._id;
  const expiresIn = '1d'; 
  const payload = {
    sub: _id,
    iat: Date.now()
  };
  const signedToken =   jsonwebtoken.sign(payload, process.env.SECRET, 
                            { expiresIn: expiresIn, algorithm: 'HS256' }
                        ); 
  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}

module.exports = issueJWT;


