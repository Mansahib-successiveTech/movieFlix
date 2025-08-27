"use client";
import MovieCard from "@/components/MovieCard";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

export default function MoviePage() {
  const [data, setData] = useState([]);   // store movies directly, not wrapped
  const [value, setValue] = useState("");

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/movies/allmovies");
      
      setData(res.data.movie );  
    } catch (err) {
      console.log("Error fetching movies:", err);
    }
  };

  // filter movies
  const searchMovies =useMemo( () => {
    if (!value) return data;
    return data.filter((movie) =>
      movie.title.toLowerCase().includes(value.toLowerCase())
    );
  },[value,data]);

  useEffect(() => {
    getData();
  }, []); 

  return (
    <div className="bg-zinc-900 min-h-screen text-white">
      <h1 className="text-yellow-200 pt-10 text-2xl font-semibold">All movies</h1>

      {/* Search Bar */}
      <div className="flex justify-center w-full mt-6">
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full max-w-md px-4 py-2 rounded bg-zinc-700 text-white 
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      {/* Movies Grid */}
      <div className="pt-12 pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {searchMovies.length > 0 ? (
          searchMovies.map((movie) => (
            <MovieCard key={movie._id} data={movie} />
          ))
        ) : (
          <p className="text-center text-zinc-400 col-span-full">
            {data.length > 0 ? "No movies found." : "Loading movies..."}
          </p>
        )}
      </div>
    </div>
  );
}
