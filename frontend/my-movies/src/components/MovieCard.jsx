"use client";

import Link from "next/link";

const MovieCard = ({ data }) => {
  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col transition hover:scale-105">
      <Link href={`/movies/${data._id}`}>
        <div className="h-[70vh]">
          <div className="bg-zinc-900 rounded flex items-center justify-center">
            <img
              src={data.poster}
              alt={data.title}
              className="h-[50vh] w-full object-cover rounded"
            />
          </div>
          <h2 className="mt-4 text-xl text-yellow-100 font-semibold">{data.title}</h2>
          <p className="mt-2 text-zinc-400 font-semibold">Directed by {data.director}</p>
          <p className="mt-2 text-zinc-400 font-semibold">Genre: {data.genre}</p>
          <p className="mt-2 text-zinc-400 font-semibold">₹ {data.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
