const router = require('express-promise-router')();
const UserController = require('../controllers/user');
const { userAuth,checkRole,serializeUser} = require('../helpers/Auth');


router.route('/register')
.post(UserController.register)

router.route('/login')
.post(UserController.login)

router.route('/protected')
.get(userAuth,checkRole(['admin']),UserController.protected)

router.route('/rediscaching/')
.get(UserController.rediscaching)

router.route('/callback')
.get(UserController.callBackTest)

router.route('/addcomment')
.post(UserController.addComment)

router.route('/getallcomment')
.get(UserController.getAllComment)

// passport.authenticate('jwt', { session: false })
module.exports = router;