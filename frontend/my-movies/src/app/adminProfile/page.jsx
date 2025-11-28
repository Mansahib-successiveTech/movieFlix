"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AllOrders } from "@/components/AllOrders";

export default function Admin() {
  const { loggedIn, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not logged in or not admin
    if (loggedIn === false || role !== "admin") {
      router.push("/login"); 
    }
  }, [loggedIn, role, router]);

  // check status
  if (loggedIn === null || role === null) {
    return <p>Loading...</p>;
  }

  //redirect
  if (!loggedIn || role !== "admin") {
    return null;
  }

  return (
    <div>
      <AllOrders />
    </div>
  );
}
