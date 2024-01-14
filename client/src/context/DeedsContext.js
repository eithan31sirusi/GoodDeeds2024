import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const DeedsContext = createContext();

export const DeedsProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [globalDeeds, setGlobalDeeds] = useState([]);
  const [personalDeeds, setPersonalDeeds] = useState([]);

  useEffect(() => {
    //if (user) {}
    // Fetch global deeds
    axios
      .get("http://localhost:5000/api/deeds")
      .then((res) => setGlobalDeeds(res.data))
      .catch((error) => console.error("Error fetching global deeds:", error));

    // Fetch personal deeds if user is defined
    if (user && user._id) {
      axios
        .get(`http://localhost:5000/api/user/${user._id}/personal-list`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => setPersonalDeeds(res.data))
        .catch((error) =>
          console.error("Error fetching personal deeds:", error)
        );
    }
  }, [user]);

  // Function to add a personal deed
  const addPersonalDeed = async (deedData) => {
    if (user && user._id) {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/user/${user._id}/add-deed`,
          deedData,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setPersonalDeeds([...personalDeeds, response.data]);
      } catch (error) {
        console.error("Error creating personal deed:", error);
        // Handle the error appropriately in your UI
      }
    } else {
      console.log("User not logged in or user ID not available");
      // Handle this case in your UI, maybe prompt for login
    }
  };

  return (
    <DeedsContext.Provider
      value={{
        globalDeeds,
        personalDeeds,
        addPersonalDeed,
      }}
    >
      {children}
    </DeedsContext.Provider>
  );
};
