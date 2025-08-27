import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//new user registration
export const register=async(req,res)=>{
 const {username,email,password,address}=req.body;   
 try{
 if(!username || !email || !password || !address){
    return res.status(400).json({
        message:"All fields are required"
    });
 }
 // check if user already exists
 const userExists=await User.findOne({email});
 if(userExists){
    return res.status(400).json({
        message:"User already exists"
    });
 }
 const hashedPassword=await bcrypt.hash(password,10);
 const newUser=new User({username,email,password:hashedPassword,address});
 await newUser.save();
 res.status(201).json({
    message:"User registered successfully",
    data:{name:newUser.username,email:newUser.email,address:newUser.address,role:newUser.role}
 });
}
catch(err){
    res.status(500).json({
        message:"Error in user registration",
        error:err.message
    });
}

}

//user login + jwt token generation
export const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
    if(!email || !password){
        return res.status(400).json({
            message:"All fields are required"
        });
    }
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({
            message:"User does not exist"
        });
    }
    const isPasswordCorrect=await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
        return res.status(400).json({
            message:"Invalid credentials"
        });
    }
    const token = jwt.sign({id:user._id},"secretkey",{expiresIn:"30h"});
    res.status(200).json({
        message:"User logged in successfully",
        data:{name:user.username,email:user.email,address:user.address,role:user.role},
        token:token
    });
}
catch(err){
    res.status(500).json({
        message:"Error in user login",
        error:err.message
    });
}
}