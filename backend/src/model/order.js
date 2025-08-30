import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    //  Multiple movies in one order
    movies: [
      {
        movie: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Movies",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    //  Order status
   status: {
  type: String,
  enum: ["order placed", "cancelled", "rented", "returned"],
  default: "order placed",
},


    //  Optional: payment info
    paymentMethod: {
      type: String,
      enum: ["CARD", "UPI"],
      default: "UPI",
    },
    
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
