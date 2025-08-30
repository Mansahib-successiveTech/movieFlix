import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    address: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    //  Favorites: list of movies
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movies",
      },
    ],

    //  Cart: movies before checkout
    cart: [
      {
        movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movies" },
        quantity: { type: Number, default: 1 },
      },
    ],

    //  Orders history
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
      // reviews written by user
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
