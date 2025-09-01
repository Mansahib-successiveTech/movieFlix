"use client";
import MovieCard from "@/components/MovieCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function MovieFavPage() {
  const { loggedIn } = useAuth();
  const router = useRouter();
  const [data, setData] = useState([]);

  // Redirect if not logged in
  useEffect(() => {
    if (loggedIn === false) {
      router.push("/login");
    }
  }, [loggedIn, router]);

  if (loggedIn === null) {
    return <p>Loading...</p>; // waiting for auth status
  }

  if (!loggedIn) return null; // redirecting

  const headers = {
    authorization: localStorage.getItem("token"),
  };

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/fav/getfav", {
        headers,
      });
      setData(res.data);
    } catch (err) {
      console.log("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []); //empty dependency array to avoid multiple calls

  return (
    <div className="bg-zinc-900 h-full text-white">
      <h1 className="text-yellow-200 pt-10 text-2xl font-semibold">
        Your Favorite Movies
      </h1>

      {/* Movies Grid */}
      <div className="pt-12 pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.favourites?.length > 0 ? (
          data.favourites.map((movie) => <MovieCard key={movie._id} data={movie} />)
        ) : (
          <p className="h-screen text-center text-zinc-400 mt-40 text-xl col-span-full">
            No favorite movies
          </p>
        )}
      </div>
    </div>
  );
}
