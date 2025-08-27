"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export const UpdateUser = () => {
  const [data, setData] = useState();
  const [email, setEmail] = useState("");
  const headers = {
    authorization: localStorage.getItem("token"),
  };
  const userData = async () => {
    const res = await axios.get("http://localhost:8080/user/userInfo", {
      headers,
    });
    setData(res.data.user);
    setEmail(res.data.user.email);
  };
  useEffect(() => {
    userData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:8080/user/updateUser",
        { email },
        { headers }
      );
      alert(res.data.message || "Email updated successfully");
      setData((prev) => ({ ...prev, email }));
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-md w-full max-w-md text-white">
        <h1 className="text-2xl font-bold mb-6 text-white">Update User</h1>
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <label htmlFor="user-id" className="text-sm font-semibold">
            ID
          </label>
          <input
            id="user-id"
            type="text"
            value={data._id}
            readOnly
            className="px-4 py-2 border rounded bg-gray-200 text-black"
            placeholder="ID"
          />
          <label htmlFor="user-username" className="text-sm font-semibold">
            Username
          </label>
          <input
            id="user-username"
            type="text"
            value={data.username}
            readOnly
            className="px-4 py-2 border rounded bg-gray-200 text-black"
            placeholder="Username"
          />
          <label htmlFor="user-address" className="text-sm font-semibold">
            Address
          </label>
          <input
            id="user-address"
            type="text"
            value={data.address}
            readOnly
            className="px-4 py-2 border rounded bg-gray-200 text-black"
            placeholder="Address"
          />
          <label htmlFor="user-email" className="text-sm font-semibold">
            Email
          </label>
          <input
            id="user-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 bg-gray-200 focus:ring-yellow-500 text-black"
            placeholder="Email"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-200 text-black rounded hover:bg-yellow-300 transition"
          >
            Update Email
          </button>
        </form>
      </div>
    </div>
  );
};
