"use client";

import React from "react";
import Link from "next/link";

const Sidebar = ( ) => {
  const role=localStorage.getItem("role");
  const adminLinks = [
    { title: "Add Book", link: "/admin/add-book" },
    { title: "View All Orders", link: "/admin/orders" },
  ];

  const userLinks = [
    { title: "Edit Personal Info", link: "/profile/update" },
    { title: "My Orders", link: "/profile" },
  ];

  const linksToShow = role === "admin" ? adminLinks : role === "user" ? userLinks : [];

  return (
    <div className="bg-zinc-800 text-yellow-200 w-48 p-4 h-screen">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul className="flex flex-col gap-2 text-white">
        {linksToShow.map((item) => (
          <li key={item.link}>
            <Link
              href={item.link}
              className="block px-3 py-2 rounded hover:bg-yellow-400 hover:text-black transition"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      
    </div>
    
  );
};

export default Sidebar;
