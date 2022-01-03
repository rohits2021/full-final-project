const router = require('express-promise-router')();
const fileUploadController = require('../controllers/fileupload');
const upload = require('../helpers/fileHelper').upload; 

router.route('/')
.get(fileUploadController.index);


router.route('/upload-profile-pic')
.post(upload.single('profile_pic'),fileUploadController.upload);

module.exports = router;