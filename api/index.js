import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
dotenv.config()

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to db");
    }).catch((err)=>{
        console.log(err);
    })

const app = express();
app.use(express.json())

app.listen(5000, ()=>{
    console.log("server started at port 5000");
})

app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })

})