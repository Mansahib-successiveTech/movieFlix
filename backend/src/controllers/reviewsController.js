import { Review } from "../model/reviews.js";
import { Movies } from "../model/movies.js";
import { User } from "../model/user.js";

// POST /reviews/addReview/:movieId
export const addOrUpdateReview = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.id; //  from auth middleware

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Check if review exists already (user can't review same movie twice)
    let review = await Review.findOne({ user: userId, movie: movieId });

    if (review) {
      // Update existing review
      review.rating = rating;
      review.comment = comment;
      await review.save();
    } else {
      // Create new review
      review = await Review.create({
        user: userId,
        movie: movieId, //make sure movieId is passed here
        rating,
        comment,
      });

      // push review ref into movie & user
      await Movies.findByIdAndUpdate(movieId, { $push: { reviews: review._id } });
      await User.findByIdAndUpdate(userId, { $push: { reviews: review._id } });
    }

    // recalculate eviews for the movie
    const stats = await Review.aggregate([
      { $match: { movie: review.movie } },
      {
        $group: {
          _id: "$movie",
          avgRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
    ]);

    if (stats.length > 0) {
      await Movies.findByIdAndUpdate(review.movie, {
        averageRating: stats[0].avgRating,
        numReviews: stats[0].count,
      });
    }

    res.status(201).json({ message: "Review saved successfully", review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
