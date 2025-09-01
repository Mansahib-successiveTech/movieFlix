"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const ModifyMovie = () => {
  const { movieId } = useParams(); // Get movieId from URL
  const router = useRouter();

  const headers = {
    authorization: localStorage.getItem("token"),
  };

  const [data, setData] = useState({
    poster: "",
    title: "",
    director: "",
    genre: "",
    year: "",
    price: 0,
    desc: "",
    language: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch existing movie data
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/movies/moviebyid/${movieId}`,
          { headers }
        );
        setData(res.data.movie);
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };

    if (movieId) fetchMovie();
  }, [movieId]);

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async () => {
    try {
      //  validation
      if (
        !data.poster ||
        !data.title ||
        !data.director ||
        !data.genre ||
        !data.year ||
        !data.price ||
        !data.desc ||
        !data.language
      ) {
        toast.warning("Please fill all the fields");
        return;
      }

      const res = await axios.put(
        `http://localhost:8080/movies/updatemovie/${movieId}`,
        data,
        { headers }
      );

      if (res.status === 200) {
        toast.success("Movie updated successfully");
        router.push("/movies");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to update movie");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-900">
        <p className="text-white">Loading movie details...</p>
      </div>
    );
  }

  return (
    <div className="h-[100%] p-0 md:p-4 bg-zinc-900 min-h-screen">
      <h1 className="text-3xl md:text-5xl font-semibold text-yellow-200">
        Modify Movie
      </h1>

      <div className="p-4 bg-zinc-800 rounded mt-8">
        <div className="mt-1">
          <label className="text-zinc-400">Poster URL</label>
          <input
            type="text"
            name="poster"
            value={data.poster}
            onChange={change}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
          />
        </div>

        <div className="mt-1">
          <label className="text-zinc-400">Title</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={change}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
          />
        </div>

        <div className="mt-1">
          <label className="text-zinc-400">Director</label>
          <input
            type="text"
            name="director"
            value={data.director}
            onChange={change}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
          />
        </div>

        <div className="mt-1">
          <label className="text-zinc-400">Genre</label>
          <input
            type="text"
            name="genre"
            value={data.genre}
            onChange={change}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
          />
        </div>

        <div className="mt-1 md:flex items-center gap-2">
          <label className="text-zinc-400">Year</label>
          <input
            type="number"
            name="year"
            value={data.year}
            onChange={change}
            className="w-full lg:w-3/6 mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
          />

          <label className="text-zinc-400">Price</label>
          <input
            type="number"
            name="price"
            value={data.price}
            onChange={change}
            className="w-full lg:w-1/2 mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
          />
        </div>

        <div className="mt-1">
          <label className="text-zinc-400">Description</label>
          <textarea
            name="desc"
            value={data.desc}
            onChange={change}
            rows={6}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
          />
        </div>

        <div className="mt-1">
          <label className="text-zinc-400">Language</label>
          <input
            type="text"
            name="language"
            value={data.language}
            onChange={change}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
          />
        </div>

        <button
          onClick={submit}
          className="mt-12 bg-yellow-200 text-zinc-950 p-2 rounded hover:bg-yellow-500"
        >
          Update Movie
        </button>
      </div>
      
    </div>
  );
};

export default ModifyMovie;
