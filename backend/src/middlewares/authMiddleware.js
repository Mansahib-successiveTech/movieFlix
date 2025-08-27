import jwt from "jsonwebtoken"
import { User } from "../model/user.js";
export const authMiddleware=(req,res,next)=>{
    try{
        

     const header=req.headers.authorization;
     //console.log(header);
     if(!header || !header.startsWith("Bearer")){
        return res.status(401).json({
            message:"Authorization token missing"
        });
     }
     const token=header.split(" ")[1];
     if(!token){
        return res.status(401).json({
            message:"Authorization token missing"
        });
     }
     const decoded=jwt.verify(token,"secretkey");
   //  console.log(decoded);
     req.id=decoded.id;
     next();
    }
    catch(err){
        res.status(401).json({
            message:"error in auth middleware",
            error:err.message
        }    
        );
    }
}

// Role-based middleware
export const adminMiddleware = async(req, res, next) => {
const existingUser=await User.findById(req.id);
//console.log(existingUser);
if(existingUser.role !== 'admin'){
    return res.status(403).json({
        message: "Access forbidden: Admins only"
    });
}
  next();
};