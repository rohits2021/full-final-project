const User = require('../models/user');
const bcrypt = require('bcrypt');
const issueJWT = require('../helpers/jwt');
const axios  = require('axios');
const redis  = require('redis');
const { serializeUser } = require('../helpers/Auth')

module.exports = {
    register: async (req,res)=>{
        try { 
            const email = req.body.email;
            const password = req.body.password;
            const isAlreadyExists = await User.findOne({email});
            if(isAlreadyExists){
                return res.status(500).json({message:"User already exists,cannot be created again"})
            }else{
            const hash = await bcrypt.hash(password,10);
            const newUser = new User({
                email,
                password : hash
            });
            await newUser.save();      
            return res.status(200).json({success:true,msg:'User created Successfully'})
            }
        } catch(err){
            return res.status(500).send({succes:false,msg:err});
        }
    },
    login: async (req,res)=>{
        try {
            const email =  req.body.email;
            const password = req.body.password;
            const user = await User.findOne({email});                     
            if(user){
                const isValid = await bcrypt.compare(password,user.password);
                if(isValid){
                    const tokenObject = issueJWT(user);
                    res.status(200).json({ 
                        success: true, 
                        token: tokenObject.token, 
                        expiresIn: tokenObject.expires 
                    });
                }else{
                    res.status(400).json({success:false,msg:"you have entered a wrong password"});
                }
            }else{
                    res.status(400).json({success:false,msg:"User doesn't exists"})
            }
        } catch(err) {
            console.log(err.message);
        }
    },
    protected: async(req,res)=>{
        res.status(200).json({ success: true, msg: serializeUser(req.user)});
    },

    callBackTest : async (req,res)=>{
        res.render('callback')
    },

    rediscaching : async (req,res)=>{
        const client = redis.createClient({
            host:'127.0.0.1',
            port: 6379,
         })
        const rocket_id = req.query.rocket_id;
        try {
            client.get(rocket_id, async (err, data) => {
                if (err) throw err;
                if (data) {
                    res.status(200).send({
                        data: JSON.parse(data),
                        message: "data retrieved from the cache"
                    });
                }
                else {
                    const response = await axios.get(`https://api.spacexdata.com/v3/rockets/${rocket_id}`);
                    client.setex(rocket_id,6, JSON.stringify(response.data));
                    res.status(200).send({
                        data: response.data,
                        message: "data in cached for 6 sec"
                    });
                }
            });
        } catch(err) {
            res.status(500).send({message: err.message});
        } 
    }
}


