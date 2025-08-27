import { User } from "../model/user.js";

//  Add to cart
export const addToCart = async (req, res) => {
  const { movieId } = req.body;
  const userId = req.id; // from auth middleware
try{
  if (!movieId) {
    return res.status(400).json({ message: "Movie ID is required" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // check if movie already in cart
  const existingItem = user.cart.find(
    (item) => item.movie.toString() === movieId
  );

  if (existingItem) {
    existingItem.quantity += 1; // increase quantity instead of duplicate entry
  } else {
    user.cart.push({ movie: movieId, quantity: 1 });
  }

  await user.save();

  return res.status(200).json({
    message: "Movie added to cart",
    cart: user.cart,
  });
}catch(err){
    res.status(500).json({
        message:"Error in adding to cart",
        error:err.message
    });
}
};

// Remove from cart
export const removeFromCart = async (req, res) => {
    try{
  const { movieId } = req.body;
  const userId = req.id; // from auth middleware

  if (!movieId) {
    return res.status(400).json({ message: "Movie ID is required" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const cartItem = user.cart.find(
    (item) => item.movie.toString() === movieId
  );

  if (!cartItem) {
    return res.status(400).json({ message: "Movie not in cart" });
  }

  // if quantity > 1, decrease quantity
  if (cartItem.quantity > 1) {
    cartItem.quantity -= 1;
  } else {
    // else remove item completely
    user.cart = user.cart.filter(
      (item) => item.movie.toString() !== movieId
    );
  }

  await user.save();

  return res.status(200).json({
    message: "Movie removed from cart",
    cart: user.cart,
  });
}catch(err){
    res.status(500).json({
        message:"Error in removing from cart",
        error:err.message
    });
}
};

// Get user cart
export const getCartMovies = async (req, res) => {
  const userId = req.id; // from auth middleware
try{
  const user = await User.findById(userId).populate("cart.movie");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({
    cart: user.cart,
  });
}catch(err){
    res.status(500).json({
        message:"Error in fetching cart movies",
        error:err.message
    });
}
};
