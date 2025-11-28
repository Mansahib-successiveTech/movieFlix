"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UpdateUser } from "@/components/UpdateUser";

export default function HomePage() {
  const { loggedIn } = useAuth();
  const router = useRouter();

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

  return (
    <div className="bg-zinc-900 h-screen text-white">
      <UpdateUser />
    </div>
  );
}
