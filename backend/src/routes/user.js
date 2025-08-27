import express from 'express';
import { login, register } from '../controllers/auth.js';
import { adminMiddleware, authMiddleware } from '../middlewares/authMiddleware.js';
import { getUserInfo, updateUserInfo } from '../controllers/userController.js';

const userRouter=express.Router();
// define user routes here
userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.get("/test",authMiddleware,adminMiddleware,(req,res)=>{
    res.status(200).json({
        message:"admin route working fine"
    });
});

userRouter.get("/userInfo",authMiddleware,getUserInfo);
userRouter.put("/updateUser",authMiddleware,updateUserInfo); // update email
export {userRouter};