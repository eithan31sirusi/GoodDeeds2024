import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:5000/api/user/login", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          // The token is valid, and the user profile is retrieved
          setUser({ ...response.data, token });
        })
        .catch(() => {
          // The token is invalid or some other error occurred
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, []);
  const login = (userData) => {
    // userData contains the user information and token
    // This function updates the state with the logged-in user's data
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
