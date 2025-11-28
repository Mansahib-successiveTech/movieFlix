import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addOrUpdateReview } from "../controllers/reviewsController.js";

const reviewsRouter=express.Router();

reviewsRouter.post("/addReview/:movieId",authMiddleware,addOrUpdateReview);


export {reviewsRouter}