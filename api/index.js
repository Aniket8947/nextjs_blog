import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to db");
    }).catch((err)=>{
        console.log(err);
    })
const app = express();

app.listen(3000, ()=>{
    console.log("server started at port 3000");
})