const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    filename: {type:String}
})

const Files = mongoose.model('file',FileSchema);
module.exports = Files;


