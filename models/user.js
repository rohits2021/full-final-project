const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { 
            type:String,
            required:true
        },
    password: { 
            type:String,
            required: true
        },
    role: {
            type:String,
            default: 'user',
            enum: ['user','admin']
    },
    
},{ timestamps: true} )

const User = mongoose.model('user',UserSchema);
module.exports = User;