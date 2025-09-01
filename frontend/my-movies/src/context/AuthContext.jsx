"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const MyAuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);
  const [role, setRole] = useState(null);

  const login = async (newToken) => {
    localStorage.setItem("token", `Bearer ${newToken}`);
    setToken(newToken);
    setLoggedIn(true);
    await fetchRole(); // fetch role after login
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setLoggedIn(false);
    setRole(null);
    toast.success("User logged out");
  };

  const fetchRole = async () => {
    try {
      const res = await axios.get("http://localhost:8080/user/userInfo", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setRole(res.data.user.role);
      localStorage.setItem("role", res.data.user.role);
    } catch (err) {
      console.log("Error fetching role:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedRole = localStorage.getItem("role");

      if (storedToken) {
        setToken(storedToken);
        setLoggedIn(true);
        if (storedRole) setRole(storedRole);
        else await fetchRole();
      } else {
        setLoggedIn(false);
      }
    };

    initAuth();
  }, []);

  return (
    <MyAuthContext.Provider value={{ login, logout, token, loggedIn, role }}>
      {children}
    </MyAuthContext.Provider>
  );
};

export const useAuth = () => useContext(MyAuthContext);
