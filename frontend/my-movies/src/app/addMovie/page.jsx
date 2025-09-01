"use client";

import AddMovie from "@/components/AddMovies";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AddNewMovies() {
  const { loggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loggedIn) {
      router.push("/login");
    }
  }, [loggedIn, router]);

  if (!loggedIn) {
    return null; // or a loader 
  }

  return (
    <div>
      <AddMovie />
    </div>
  );
}
