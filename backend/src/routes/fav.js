import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addtoFav, getFavMovies, removeFromFav } from "../controllers/favController.js";

const favRouter=express.Router();
//for a particular user 
favRouter.post("/addtofav",authMiddleware,addtoFav) //add to fav
favRouter.delete("/deletefav",authMiddleware,removeFromFav) //remove from fav
favRouter.get("/getfav",authMiddleware,getFavMovies) //get fav movies
export {favRouter};