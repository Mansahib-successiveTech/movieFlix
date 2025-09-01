"use client";

import AddMovie from "@/components/AddMovies";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AddNewMovies() {
  const { loggedIn,role } = useAuth(); //check user loggedin or not
  const router = useRouter();

  useEffect(() => {
    if (!loggedIn ||  role!=="admin") {
      router.push("/login"); // if not loggedIn and tries to access url redirect to login
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
