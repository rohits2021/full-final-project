const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
require('dotenv').config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
  algorithms: ['HS256']
};

module.exports = (passport) => {
    passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        // console.log(jwt_payload)
        User.findOne({_id: jwt_payload.sub}, function(err, user) {       
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }         
        });     
    }));
}