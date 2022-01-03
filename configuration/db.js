const mongoose = require('mongoose');
require('dotenv').config();
const conn = process.env.DB_STRING;
const connection = mongoose.connect(conn, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify:false,
                    useCreateIndex: true,
                    }).then(()=>{
                        console.log('Database is Connected')
                    })
                    .catch((err)=>{
                        console.log('Error in Connection')
                    });
module.exports = connection;