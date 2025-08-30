"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
export default function Register() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setaddress] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Local validation
    if (!username || !email || !password || !address) {
      toast.warning("All fields are required");
      return;
    }

    try {
      const result = await axios.post(
        "http://localhost:8080/user/register",
        { username, email, password, address }
      );

      if (result.data.message === "User registered successfully" || result.status === 201) {
        toast.success("Registration successful! Please login.");
        router.push("/login");
      }
    } catch (err) {
      // Catch 400 or other errors
      console.log(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className=" p-8 rounded-lg shadow-md w-full max-w-md bg-zinc-800 text-white">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">Register</h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="user Name"
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 " 
            value={username}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="address"
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            required
          />

          <button
            type="submit"
            className="px-4 py-2 bg-yellow-200 text-black rounded hover:bg-yellow-300 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
