"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function MovieDetails() {
  const { id } = useParams(); // dynamic id from URL
  const movieId = id;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); //was not working if taking from local storage
  const [isLoggedIn, setIsLoggedIn] = useState(false); //for conditional rendering
  const router = useRouter();
  const headers = {
    authorization: localStorage.getItem("token"),
  };
  //deleting movie button function
  const deleteMovie = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/movies/deletemovie/${movieId}`,
        { headers }
      );
      alert("movie deleted");
      router.push("/movies");
    } catch (err) {
      console.log("error adding to cart", err.message);
      alert(err.response?.data?.message || "Error adding to cart");
    }
  };
  //add or update review
  const addreview = async (e) => {
    e.preventDefault();
    const rating = e.target.rating.value;
    const comment = e.target.comment.value;

    try {
      await axios.post(
        `http://localhost:8080/reviews/addReview/${movieId}`,
        { rating: Number(rating), comment },
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      );
      alert("Review submitted successfully");
      await fetchData(); // reload page to fetch updated reviews
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error submitting review");
    }
  };

  //add to cart button function
  const addToCart = async () => {
    try {
      await axios.post(
        "http://localhost:8080/cart/addtocart",
        { movieId },
        { headers }
      );
      alert("Added to cart");
    } catch (err) {
      console.log("error adding to cart", err.message);
      alert(err.response?.data?.message || "Error adding to cart");
    }
  };
  //add to fav button function
  const addToFavorites = async () => {
    try {
      await axios.post(
        "http://localhost:8080/fav/addtofav",
        { movieId },
        { headers }
      );
      alert("Added to favorites");
    } catch (err) {
      console.log("error adding to favorites", err.message);
      alert(err.response?.data?.message || "Error adding to favorites");
    }
  };
  //fetch data that i used to render movie information based on id
  const fetchData = async () => {
    try {
      // console.log("Movie ID:", id);
      const res = await axios.get(
        `http://localhost:8080/movies/moviebyid/${id}`
      );
      setData(res.data.movie);

      // Check login token in localStorage
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);

        // Check if user is admin
        const role = localStorage.getItem("role");
        if (role === "admin") setIsAdmin(true);
      }
    } catch (err) {
      console.log("Error fetching movie:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!id) return; // no book found just return
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-900">
        <p className="text-white">Loading...</p> // add mui loader
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-900">
        <p className="text-red-500">Movie not found.</p>
      </div>
    );
  }

  return (
    <div className="px-12 py-8 bg-zinc-900 flex lg:flex-row flex-col gap-7 min-h-screen">
      {/* image section */}
      <div className="lg:w-1/2 w-full">
        <div className="bg-zinc-800 p-6 rounded flex justify-center">
          <img
            src={data?.poster || data?.url}
            alt={data?.title}
            className="lg:h-[70vh] h-[50vh] rounded"
          />
        </div>
        {/* add/update review form */}
         {isLoggedIn && (
          <div className="mt-8">
            <h3 className="text-xl text-zinc-300 font-semibold mb-2">
              Add / Update Review
            </h3>
            <form
              onSubmit={addreview}
              className="flex flex-col gap-2"
            >
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                placeholder="Rating (1-5)"
                className="p-2 rounded bg-zinc-700 text-white"
                required
              />
              <textarea
                name="comment"
                placeholder="Write your review..."
                className="p-2 rounded bg-zinc-700 text-white"
                required
              ></textarea>
              <button
                type="submit"
                className="mt-2 px-6 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Details Section  
       simply render the data of movie we get from api*/}
      <div className="lg:w-1/2 w-full p-4">
        <h1 className="text-4xl text-zinc-300 font-semibold">{data?.title}</h1>
        <p className="text-zinc-400 mt-2">by {data?.director}</p>
        <p className="text-zinc-500 mt-4 text-lg">{data?.desc}</p>
        <p className="flex mt-4 items-center text-zinc-400">{data?.language}</p>
        <p className="mt-6 text-zinc-100 text-3xl font-semibold">
          Price: ₹ {data?.price}
        </p>

        {/* Action Buttons only if logged in condtional rendering 
        no button if user not logged in */}
        {isLoggedIn && (
          <div className="mt-8 flex gap-4">
            {/* if admin-modify movie,delete 
            movie if not then means 
            user- add to cart , add to favourite*/}
            {isAdmin ? (
              <>
                <button
                  className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700"
                  onClick={() => router.push(`/modifyMovie/${movieId}`)}
                >
                  Modify
                </button>

                <button
                  className="px-6 py-2 bg-red-600 rounded hover:bg-red-700"
                  onClick={deleteMovie}
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <button
                  className="px-6 py-2 bg-green-400 rounded hover:bg-green-700"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
                <button
                  className="px-6 py-2 bg-yellow-300 rounded hover:bg-yellow-600"
                  onClick={addToFavorites}
                >
                  Add to Favorites
                </button>
              </>
            )}
          </div>
        )}
        {/* add review and rating here  */}
        <div className="mt-12">
          <h2 className="text-2xl text-zinc-300 font-semibold mb-4">Reviews</h2>

          {data.reviews.length === 0 ? (
            <p className="text-zinc-400">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {data.reviews.map((rev) => (
                <li
                  key={rev._id}
                  className="bg-zinc-800 p-4 rounded flex gap-4 items-start"
                >
                  <img
                    src={rev.user.avatar}
                    alt={rev.user.username}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="text-zinc-100 font-semibold">
                      {rev.user.username}
                    </p>
                    <p className="text-yellow-400">Rating: {rev.rating} ⭐</p>
                    <p className="text-zinc-300">{rev.comment}</p>
                    <small className="text-zinc-500">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
