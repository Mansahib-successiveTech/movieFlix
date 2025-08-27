import express from "express";
import { adminMiddleware, authMiddleware } from "../middlewares/authMiddleware.js";
import { getAllOrders, getOrderHistory, placeOrder, updateOrderStatus } from "../controllers/orderController.js";

const orderRouter=express.Router();
orderRouter.post("/placeorder",authMiddleware,placeOrder); //place order
orderRouter.get("/getordersHistory",authMiddleware,getOrderHistory);    // order history for user
orderRouter.get("/getallorders",authMiddleware,adminMiddleware,getAllOrders); // all orders - admin
orderRouter.put("/updateorderstatus/:id",authMiddleware,adminMiddleware,updateOrderStatus); // update order status - admin
export {orderRouter};