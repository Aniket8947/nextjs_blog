import User from "../model/user.model.js";
import bcryptjs from 'bcryptjs'

export const signup = async (req, res) =>{
    const {username, email, password} = req.body;
    if(!username || !email || !password || username ==='' || email==='' || password===''){
        return res.status(400).json( {message : "all fields are required" })
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = new User({username, email, password : hashedPassword})
    try {
        await user.save()
        res.json("signup successful")
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
}