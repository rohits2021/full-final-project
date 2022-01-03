const passport = require('passport');
require('../helpers/passport')(passport);

const userAuth = passport.authenticate("jwt", { session: false });


const checkRole = roles => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized! or Access Not Allowed")
    : next();


const serializeUser = user => {
  // console.log(user)
  return {
    email: user.email,
    _id: user._id,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt
  };
};


module.exports = {
  userAuth,
  checkRole,
  serializeUser
}