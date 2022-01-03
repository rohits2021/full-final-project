const multer    = require('multer');
const helpers   = require('./imageValidator');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null,`${Date.now()}-${file.originalname}`);
    }   
});

let upload = multer({storage:storage,limits:{fileSize:1000000}, fileFilter: helpers.imageFilter})

exports.upload  = upload;