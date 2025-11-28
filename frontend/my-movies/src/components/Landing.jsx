"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard.jsx";

import { gql, useSubscription } from "@apollo/client";
import { toast } from "react-toastify";

export const LandingTop = () => {
  const [data, setData] = useState([]);

  // GraphQL subscription for movieAdded
  const MOVIE_ADDED_SUBSCRIPTION = gql`
    subscription MovieAdded {
      movieAdded {
        id
        title
        director
        genre
        price
      }
    }
  `;

  useSubscription(MOVIE_ADDED_SUBSCRIPTION, {
    onData: ({ data }) => {
      if (data?.data?.movieAdded) {
        toast.info(`New movie added: ${data.data.movieAdded.title}`);
        getData(); // Refresh movie list
      }
    },
  });

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/movies/recentmovies");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []); //   empty dependency array to avoid multiple calls

  return (
    <div className="bg-zinc-900 min-h-screen px-4 md:px-16">
      {/* Hero Section */}
      <div className="flex p-2  flex-col md:flex-row items-center justify-center pt-12 md:pt-16">
        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center mb-12 md:mb-0 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-yellow-100 leading-tight">
            Discover your next adventure
          </h1>
          <p className="mt-4 text-lg md:text-xl text-zinc-300">
            Uncover exciting stories, enriching knowledge, and inspiring experiences in our
            vast collection of movies.
          </p>
          <div className="mt-8">
            <Link
              href="/movies"
              className="inline-block text-yellow-100 font-semibold text-lg md:text-2xl border border-yellow-100 px-8 md:px-10 py-3 rounded-full hover:bg-zinc-800 transition"
            >
              Discover movies
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-3/4 sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 " >
            <Image
              src="/cover.png"
              alt="Hero Image"
              width={400}
              height={400}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
      <div className="mt-10 mb-2">
        <hr />
      </div>
      <div className="bg-zinc-900 p-2">
     {/* Movies Grid */}
      {console.log(data.movie)}
      <div className="pt-12 pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {data.movie?.length > 0 ? (
          data.movie?.map((movies) => <MovieCard key={movies._id} data={movies} />)
        ) : (
          <p className="text-center text-zinc-400 col-span-full">Loading movies...</p>
        )}
      </div>
      </div>
    </div>
  );
};