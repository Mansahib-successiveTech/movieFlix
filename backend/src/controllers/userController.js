import { User } from "../model/user.js";
// get user info
export const getUserInfo =async (req, res) => {
    const userid=req.id;
 //   console.log(userid);
 try{
    const exist=await User.findById(userid);
    if(!exist){
        return res.status(404).json({
            message:"User not found"
        });
    }
    return res.status(200).json({
        user:exist
    }); 
}
catch(err){
    res.status(500).json({
        message:"Error in fetching user info",
        error:err.message
    });
  }
}

// update email info
export const updateUserInfo=async(req,res)=>{
    const userid=req.id; //from jwt token verify
    const {email}=req.body
    if(!email){
        return res.status(400).json({
            message:"email is required"
        });
    }
try{
    const exist=await User.findById(userid);
    if(!exist){
        return res.status(404).json({
            message:"User not found"
        });
    }
    exist.email=email || exist.email; // if email is not provided, keep existing
    await exist.save();
    return res.status(200).json({
        message:"User info updated successfully",
        user:exist
    });
}catch(err){
    res.status(500).json({
        message:"Error in updating user info",
        error:err.message
    });
  }
}