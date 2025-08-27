"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function MovieDetails() {
  const { id } = useParams(); // dynamic id from URL
  const movieId = id;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const headers = {
    authorization: localStorage.getItem("token"),
  };
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
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        console.log("Movie ID:", id);

        const res = await axios.get(
          `http://localhost:8080/movies/moviebyid/${id}`
        );
        setData(res.data.movie);

        // Check login (token in localStorage)
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

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-900">
        <p className="text-white">Loading...</p>
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
      {/* Image Section */}
      <div className="lg:w-1/2 w-full">
        <div className="bg-zinc-800 p-6 rounded flex justify-center">
          <img
            src={data?.poster || data?.url}
            alt={data?.title}
            className="lg:h-[70vh] h-[50vh] rounded"
          />
        </div>
      </div>

      {/* Details Section */}
      <div className="lg:w-1/2 w-full p-4">
        <h1 className="text-4xl text-zinc-300 font-semibold">{data?.title}</h1>
        <p className="text-zinc-400 mt-2">
          by {data?.director || data?.author}
        </p>
        <p className="text-zinc-500 mt-4 text-lg">{data?.desc}</p>
        <p className="flex mt-4 items-center text-zinc-400">{data?.language}</p>
        <p className="mt-6 text-zinc-100 text-3xl font-semibold">
          Price: ₹ {data?.price}
        </p>

        {/* Action Buttons (only if logged in) */}
        {isLoggedIn && (
          <div className="mt-8 flex gap-4">
            {isAdmin ? (
              <>
                <button className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700">
                  Modify
                </button>
                <button className="px-6 py-2 bg-red-600 rounded hover:bg-red-700">
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
      </div>
    </div>
  );
}
