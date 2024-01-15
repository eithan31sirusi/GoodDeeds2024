import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = (token) => {
    axios
      .get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
        setIsLoggedIn(false);
      });
  };

  const login = async (credentials) => {
    try {
      let token, user;
      if (credentials.token && credentials.user) {
        // Credentials already contain token and user (from register)
        ({ token, user } = credentials);
      } else {
        // Perform login request
        const response = await axios.post(
          "http://localhost:5000/api/users/login",
          credentials
        );
        token = response.data.token;
        user = response.data.user;
      }

      localStorage.setItem("token", token);
      setUser(user);
      setIsLoggedIn(true);
      fetchUserProfile(token);
    } catch (error) {
      console.error("Login error:", error);
      // Handle login
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
