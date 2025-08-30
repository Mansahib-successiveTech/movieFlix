import { User } from "../model/user.js";
import { Order } from "../model/order.js";
import { Movies } from "../model/movies.js";

// Place an order (user)
export const placeOrder = async (req, res, next) => {
  try {
    const userId = req.id; // from auth middleware
    const { movies } = req.body; 
    // movies = [{ movie: movieId, quantity: 1 }, ...]

    if (!Array.isArray(movies) || movies.length === 0)
      throw new Error("Movies array is required");

   
    // validate all movies exist
    for (const item of movies) {
      if (!item.movie) throw new Error("Movie ID is required in each item");
      if (!item.quantity || item.quantity <= 0) item.quantity = 1; // default quantity
      const movieExists = await Movies.findById(item.movie);
      if (!movieExists) throw new Error(`Movie with id ${item.movie} not found`);
    }

    // create new order
    const newOrder = new Order({ 
      user: userId, 
      movies, 
      paymentMethod : "UPI", //default payment 
    });

    const savedOrder = await newOrder.save();

    // push order to user and remove movies from cart
    await User.findByIdAndUpdate(userId, {
      $push: { orders: savedOrder._id },
      $pull: { cart: { movie: { $in: movies.map(m => m.movie) } } }
    });

    res.status(201).json({
      status: "success",
      message: "Order placed successfully",
      data: savedOrder
    });

  } catch (err) {
    next(err);
  }
};

//  Get user's order history
export const getOrderHistory = async (req, res, next) => {
  try {
    const userId = req.id;

    const userData = await User.findById(userId)
      .populate({
        path: "orders",
        populate: { path: "movies.movie", select: "title price genre" }
      })
      .lean();

    if (!userData) throw new Error("User not found");

    res.status(200).json({
      status: "success",
      message: "Order history retrieved successfully",
      data: userData.orders.reverse()
    });
  } catch (err) {
    next(err);
  }
};

//  Get all orders (admin only)
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "username email")
      .populate("movies.movie", "title price genre")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      status: "success",
      message: "All orders retrieved successfully",
      data: orders
    });
  } catch (err) {
    next(err);
  }
};

//  Update order status (admin only)
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) throw new Error("Order status is required");

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("movies.movie", "title price genre");

    if (!updatedOrder) throw new Error("Order not found");

    res.status(200).json({
      status: "success",
      message: "Order status updated successfully",
      data: updatedOrder
    });
  } catch (err) {
    next(err);
  }
};
