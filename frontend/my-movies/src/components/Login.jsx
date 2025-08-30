"use client";

import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const {token,login}=useAuth();  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    // TODO: Connect to backend API
    try {
      const result = await axios.post("http://localhost:8080/user/login", { email, password });
      console.log(result.data.message);
      console.log(result);
      if (result.data.message === "" || result.status === 200) {
        toast.success("Login successful");
      //  localStorage.setItem("token", `Bearer ${result.data.token}`);
        login(result.data.token)
        //redirect to home page
        router.push("/home");
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className=" p-8 rounded-lg shadow-md w-full max-w-md bg-zinc-800 text-white">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">Login</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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

          <button
            type="submit"
            className="px-4 py-2 bg-yellow-200 text-black rounded hover:bg-yellow-300 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
