const express    = require('express');
const app        = express();
const path       = require('path');
const passport = require('passport');
require('dotenv').config();
const responseTime = require('response-time');

const user     = require('./routes/user');
const stream   = require('./routes/stream');
const fileupload = require('./routes/fileupload');
const stripe     = require('./routes/stripe');
const chat     =  require('./routes/chat');
const sheet    = require('./routes/sheet');

const dbConfig   = require('./configuration/db');
dbConfig.connection;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(responseTime());
app.use(passport.initialize());
app.use('/static',express.static('public/static'));

app.use('/users',user);
app.use('/stream',stream);
app.use('/fileUpload',fileupload);
app.use('/stripe',stripe);
app.use('/chat',chat);
app.use('/sheet',sheet);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const server = app.listen(3000,()=>{
    console.log(`Server is running on http://localhost:3000`)
});

const io = require('socket.io')(server);
let socketsConected = new Set();
io.on('connection', onConnected);

function onConnected(socket) {
  console.log('Socket connected', socket.id)
  socketsConected.add(socket.id)
  io.emit('clients-total', socketsConected.size)

  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id)
    socketsConected.delete(socket.id)
    io.emit('clients-total', socketsConected.size)
  })

  socket.on('message', (data) => {
    socket.broadcast.emit('chat-message', data)
  })

  socket.on('feedback', (data) => {
    socket.broadcast.emit('feedback', data)
  })
}






// const axios  = require('axios');
// const redis  = require('redis');
// const responseTime = require('response-time');
// const client = redis.createClient({
//    host:'127.0.0.1',
//    port: 6379,
// })

// app.get('/rockets/',async (req,res)=>{
//    const rocket_id = req.query.rocket_id;
//     try {
//         client.get(rocket_id, async (err, data) => {
//             if (err) throw err;
//             if (data) {
//                 res.status(200).send({
//                     data: JSON.parse(data),
//                     message: "data retrieved from the cache"
//                 });
//             }
//             else {
//                 const response = await axios.get(`https://api.spacexdata.com/v3/rockets/${rocket_id}`);
//                 client.setex(rocket_id, 6, JSON.stringify(response.data));
//                 res.status(200).send({
//                     data: response.data,
//                     message: "cache message"
//                 });
//             }
//         });
//     } catch(err) {
//         res.status(500).send({message: err.message});
//     }      
// })

// twilio.messages
//     .create({
//     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//     from: '+13252403465',
//     to: '+918777694371'
//     })
//     .then(message => console.log(message.sid));

// const msg = {
//                 to: 'rohit@gmail.com', 
//                 from: {
//                     name:"ROHIT SHAW",
//                     email:"rohitkanchanshaw95@gmail.com"
//                 },
//                 subject: 'Sending with SendGrid Library',
//                 text: 'Implementing with Node.js',
//                 html: '<strong>Hi! My name is Rohit, I am a Software Developer!</strong>',
//             }
// sendgrid.send(msg)
//     .then((response) => {
//         console.log(response[0].statusCode)
//         console.log(response[0].headers)
//     })
//     .catch((error) => {
//         console.error(error)
//     })

// app.get('/stripePayment', function(req, res){ 
//     res.render('stripe', { 
//     key: process.env.stripe_PublishableKey 
//     }) 
// })

// app.post('/payment', function(req, res){ 
//     stripe.customers.create({ 
//         email: req.body.stripeEmail, 
//         source: req.body.stripeToken, 
//         name: 'Rohit Shaw', 
//         address: { 
//             line1: 'TC 9/4 Old MES colony', 
//             postal_code: '110092', 
//             city: 'Kolkata', 
//             state: 'West Bengal', 
//             country: 'India', 
//         } 
//     }) 
//     .then((customer) => { 
//         return stripe.charges.create({ 
//             amount: 99999,    
//             description: 'Payment Testing', 
//             currency: 'INR', 
//             customer: customer.id 
//         }); 
//     }) 
//     .then((charge) => { 
//         res.send("Success") 
//     }) 
//     .catch((err) => { 
//         res.send(err)    
//     }); 
// }) 


// const ejs        = require('ejs');
// const cons       = require('consolidate');
// const { swig }   = require('swig');
// const fs         = require("fs");
// const upload = require('./helpers/fileHelper').upload; 
// const Files  = require('./models/file');
// const stripe = require('stripe')(process.env.stripe_SecretKey) 
// const sendgrid = require('@sendgrid/mail');
// sendgrid.setApiKey(process.env.SendGridSecret);

// app.get('/',(req,res)=>{
//    res.render('index')
// })

// app.post('/fileUpload/upload-profile-pic',upload.single('profile_pic'),async (req,res)=>{
//    let filename = req.file.filename;
//    let newfile = await Files({filename});
//    await newfile.save();
//    res.status(201).json({success:true,data:filename})
// });

// app.get('/callbackTest',(req,res)=>{
//     res.render('callback')
// })

// app.get('/user/private',passport.authenticate('jwt',{session:false}),(req,res)=>{
//     res.status(200).json({ success: true, msg: "successfully authenticated "});
// })

// app.engine('html', cons.swig)
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');


// app.post('/upload-profile-pics',upload.array('profile_pics',5),(req,res)=>{
//    let fileInfo = req.files;
//    res.send(fileInfo);
// });

// app.get('/stream',(req,res)=>{  
//    res.render('video');
// })


// app.get("/video", function (req, res) { 
//   const range = req.headers.range;
// //   console.log(range);
//   if (!range) {
//     res.status(400).send("Requires Range header");
//   }  
//   const videoPath = "video.mp4";
//   const videoSize = fs.statSync("video.mp4").size;
//   const CHUNK_SIZE = 10 ** 6; 
//   const start = Number(range.replace(/\D/g, ""));
//   const end = Math.min(start + CHUNK_SIZE, videoSize - 1); 
//   const contentLength = end - start + 1;
//   const headers = {
//     "Content-Range": `bytes ${start}-${end}/${videoSize}`,
//     "Accept-Ranges": "bytes",
//     "Content-Length": contentLength,
//     "Content-Type": "video/mp4",
//   };
//   res.writeHead(206, headers);  
//   const videoStream = fs.createReadStream(videoPath, { start, end });
//   videoStream.pipe(res);
// });

// const cluster    = require('cluster');
// const os         = require('os');

// var app          = express();
// const numCpu     = os.cpus().length;

// if(cluster.isMaster){
//    for(let i=0;i<numCpu;i++){
//       cluster.fork();
//    }
//    cluster.on('exit',(worker,code,signal)=>{
//       console.log(`${process.id}  died`);
//       cluster.fork();
//    })
// }else{
//     app.listen(3000,()=>{
//        console.log(`${process.pid} server is running on http://localhost:3000`)
//     });
// }


// -------  not working 


// const {promisify} = require('util');
// const GET_ASYNC = promisify(client.get).bind(client)
// const SET_ASYNC = promisify(client.set).bind(client)

// try {
      //    const result = GET_ASYNC('rockets');
      //    if(Object.entries(result).length === 0 && result.constructor === Object){
      //       console.log('getting cached data');
      //       res.send(JSON.parse(result));
      //       return
      //    }
      //    const response = await axios.get('https://api.spacexdata.com/v3/rockets');
      //    const saveResult = await SET_ASYNC('rockets',JSON.stringify(response.data),'EX',6);
      //    console.log('new data cached',saveResult)
      //    res.send(response.data);
      // } catch (error) {
      //    res.send(error.message)
      // }