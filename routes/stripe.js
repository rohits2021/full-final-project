const router = require('express-promise-router')();
const StripeController = require('../controllers/stripe');

router.route('/')
.get(StripeController.paymentui);

router.route('/payment')
.post(StripeController.paymentMethod);

router.route('/mail')
.get(StripeController.mail);

router.route('/message')
.get(StripeController.inbox);

module.exports = router;