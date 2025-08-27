
import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addToCart, getCartMovies, removeFromCart } from "../controllers/cartController.js";

const cartRouter=express.Router();
//for a particular user 
cartRouter.post("/addtocart",authMiddleware,addToCart) //add to cart
cartRouter.delete("/deletecart",authMiddleware,removeFromCart) //remove from cart
cartRouter.get("/getcart",authMiddleware,getCartMovies) //get fav cart
export {cartRouter};