"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const MyAuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router=useRouter();
  const [token, setToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null); // added role state

  const login = (newToken) => {
    localStorage.setItem("token", `Bearer ${newToken}`);
    setToken(newToken);
    setLoggedIn(true);
    fetchRole(); // fetch role after login
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setLoggedIn(false);
    setRole(null); // clear role
    alert("user logged out");
    router.push("/");
  };

  const fetchRole = async () => {
    try {
      const res = await axios.get("http://localhost:8080/user/userInfo", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setRole(res.data.user.role); // set role in state
      localStorage.setItem("role", res.data.user.role); // optional: store in localStorage
    } catch (err) {
      console.log("Error fetching role:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    if (data) {
      setLoggedIn(true);
      if (savedRole) setRole(savedRole); // restore role from localStorage
      else fetchRole(); // fetch role if not in localStorage
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <MyAuthContext.Provider value={{ login, logout, token, loggedIn, role }}>
      {children}
    </MyAuthContext.Provider>
  );
};

export const useAuth = () => useContext(MyAuthContext);
