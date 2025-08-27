import mongoose from "mongoose";


const movieSchema = new mongoose.Schema(
  {
    poster: {
      type: String,
      required: true, // movie poster URL
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    director: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true, // full price not rental price
    },
    desc: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Movies = mongoose.model("Movies", movieSchema);
