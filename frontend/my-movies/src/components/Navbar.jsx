"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaGripLines } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { loggedIn,logout,role } = useAuth();
 
  const links = [
    { title: "Home", link: "/home" },
    { title: "All movies", link: "/movies" },
    { title: "favorites", link: "/fav" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
    { title: "Admin profile", link: "/" },
  ];
  let newlinks=[];
  if(!loggedIn){
    newlinks=links.splice(0,2);
  }
  else if(role==="user")
   {
    newlinks=links.splice(0,5);
   }
else if(role==="admin"){
  newlinks=links.splice(0,2).concat(links.splice(-1));
}
  const [MobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      <nav className="  bg-zinc-800 text-white px-8 py-4 w-screen z-40 relative flex items-center justify-between">
        <Link href="/home">
          <div className="flex items-center cursor-pointer">
            {/* <Image
              src="/movie.jpg"
              alt="Logo"
              width={40}
              height={40}
              className="me-4"
            /> */}
            <h1 className="text-2xl font-semibold">MovieFlix</h1>
          </div>
        </Link>
        
        <div className="nav-links pt-1 block md:flex items-center gap-4">
          {/* Desktop Links */}
          <div className="hidden md:flex gap-4 text-yellow-100 font-semibold">
            {newlinks.map((item, i) => (
              <Link
                href={item.link}
                className="hover:text-blue-500 transition-all duration-300"
                key={i}
              >
                {item.title}
              </Link>
            ))}
           
            <div className="nav-links block md:flex items-center gap-4">
              {!loggedIn?<> <Link
                href="/login"
                className="text-center text-black w-40 h-7 bg-yellow-400 rounded hover:bg-yellow-300 "
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-center text-black w-40 h-7 bg-green-300 rounded hover:bg-green-400 "
              >
                Signup
              </Link></>:<>  <div
              
              className="text-center text-black w-40 h-7 bg-red-200 rounded hover:bg-red-300 " onClick={logout}
            >
              Logout
            </div> </>}
             
            </div>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="text-white text-xl hover:text-zinc-400 md:hidden block"
            onClick={() =>
              setMobileNav(MobileNav === "hidden" ? "block" : "hidden")
            }
          >
            <FaGripLines />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {newlinks.map((item, i) => (
          <Link
            href={item.link}
            className="hover:text-blue-500 text-yellow-100 text-4xl font-semibold transition-all duration-300 mb-5"
            key={i}
            onClick={() =>
              setMobileNav(MobileNav === "hidden" ? "block" : "hidden")
            }
          >
            {item.title}
          </Link>
        ))}
        {!loggedIn ? (
          <>
            {" "}
            <Link
              href="/"
              className="text-center w-50 px-4 py-2 bg-yellow-400 rounded hover:bg-blue-300 transition"
            >
              Login
            </Link>
            <Link
              href="/login"
              className="text-center w-50 mt-2 mb-2 px-4 py-2 bg-green-300 rounded hover:bg-green-300 transition"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            {" "}
            <Link
              href="/register"
              className="text-center w-50 px-4 py-2 bg-red-200 rounded hover:bg-red-300 transition"
            >
              Logout
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
