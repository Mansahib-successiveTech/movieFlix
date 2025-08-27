import { User } from "../model/user.js";

//add to fav
export const addtoFav=async(req,res)=>{
    const {movieId}=req.body;
    const userId=req.id; //from auth middleware
    try{
    if(!movieId){
        return res.status(400).json({
            message:"Movie ID is required"
        });
    }
    const user=await User.findById(userId);
    if(!user){
        return res.status(404).json({
            message:"User not found"
        });
    }
    if(user.favourites.includes(movieId)){
        return res.status(400).json({
            message:"Movie already in favorites"
        });
    }
    user.favourites.push(movieId);
    await user.save();
    return res.status(200).json({
        message:"Movie added to favorites",
        favourites:user.favourites
    });
}
catch(err){
    res.status(500).json({
        message:"Error in adding to favorites",
        error:err.message
    });
}
}
//remove from fav
export const removeFromFav=async(req,res)=>{
    const {movieId}=req.body;
    const userId=req.id; //from auth middleware
    try{
    if(!movieId){
        return res.status(400).json({
            message:"Movie ID is required"
        });
    }
    const user=await User.findById(userId);
    if(!user){
        return res.status(404).json({
            message:"User not found"
        });
    }
    if(!user.favourites.includes(movieId)){
        return res.status(400).json({
            message:"Movie not in favorites"
        });
    }
    user.favourites=user.favourites.filter(id=>id.toString()!==movieId);
    await user.save();
    return res.status(200).json({
        message:"Movie removed from favorites",
        favourites:user.favourites
    });
}catch(err){
    res.status(500).json({
        message:"Error in removing from favorites",
        error:err.message
    });
}
}
//get fav movies
export const getFavMovies=async(req,res)=>{
    const userId=req.id; //from auth middleware
    try{
    const user=await User.findById(userId).populate("favourites");
    if(!user){
        return res.status(404).json({
            message:"User not found"
        });
    }
    //console.log(user);
    return res.status(200).json({
        favourites:user.favourites
    });
}
catch(err){
    res.status(500).json({
        message:"Error in fetching favorite movies",
        error:err.message
    });
}
}