"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddMovie = () => {
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

  const router = useRouter();


const headers = {
    authorization: localStorage.getItem("token"),
  };
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async () => {
    try {
      
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
        alert("Please fill all the fields");
        return;
      }

      const res = await axios.post(
        "http://localhost:8080/movies/addmovie",
        data,
        { headers }
      );
console.log(res);
      if (res.status === 201) {
        alert("Movie Added Successfully");
        setData({
          poster: "",
          title: "",
          director: "",
          genre: "",
          year: "",
          price: 0,
          desc: "",
          language: "",
        });
        router.push("/movies");
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to add movie");
    }
  };

  return (
    <div className="h-[100%] p-0 md:p-4 bg-zinc-900 min-h-screen">
      <h1 className="text-3xl md:text-5xl font-semibold text-yellow-200">
        Add Movie:
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
          Save
        </button>
      </div>
    </div>
  );
};

export default AddMovie;
