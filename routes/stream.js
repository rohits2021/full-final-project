const router = require('express-promise-router')();
const StreamController = require('../controllers/stream');

router.route('/')
.get(StreamController.stream);

router.route('/video')
.get(StreamController.video);

module.exports = router;