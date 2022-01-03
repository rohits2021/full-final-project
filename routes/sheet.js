const router = require('express-promise-router')();
const sheetController = require('../controllers/sheet')

router.route('/')
.get(sheetController.getSheet)

router.route('/post')
.post(sheetController.postSheet)

module.exports =  router;