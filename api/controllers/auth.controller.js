import User from "../model/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) =>{
    const {username, email, password} = req.body;
    if(!username || !email || !password || username ==='' || email==='' || password===''){
        next(errorHandler(400, "All fields are required"));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = new User({username, email, password : hashedPassword})
    try {
        await user.save()
        res.json("signup successful")
    } catch (error) {
        next(error)
    }
    
}