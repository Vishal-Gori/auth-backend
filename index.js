const express = require("express");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose =require('mongoose');
const cors = require("cors");
const User = require('./userSchema.js');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect(DB).then(()=>console.log('Database connected successfully')).catch((err)=>console.log(err));

app.post('/login', async(req, res) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({
            email,
            password
        });
        res.status(200).json({
            status:'success',
            message:'Logged in',
            user
        })
    }
    catch(err){
        res.status(400).json({
            status:'fail',
            err
        });
    }
});

app.post('/signup',async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.create({
            email,
            password
        });
        res.status(200).json({
            status:'success',
            message:'User created successfully',
            user
        })
    }
    catch(err){
        res.status(400).json({
            status:'fail',
            err
        });
    }
});

const PORT = 5000;
const server = app.listen(PORT,()=>{
    console.log('Listening on port 5000');
});