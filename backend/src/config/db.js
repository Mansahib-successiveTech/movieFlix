import mongoose from "mongoose";

export const connectionDb=async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/movies");
        console.log("Db connected successfully");

    }catch(err){
        console.log(
            "Error while connecting to the database",err
        );
    }
}