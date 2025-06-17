import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();


const UserProvider = ({ children }) => {
  const [userdata, setUserdata] = useState(null);
  const serverUrl = "http://localhost:8000";

  // Fetch current user data and set in context
  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true });
      setUserdata(result.data.user);
    } catch (error) {
      setUserdata(null);
    }
  };


  const getGeminiResponse = async (command) => {
    try {
      const result = await axios.post(`${serverUrl}/api/user/asktoassistant`, { command }, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
    }
  }

  useEffect(() => {
    handleCurrentUser();
  }, []);

  // Sign out and clear all user-related state
  const signOut = async () => {
    try {
      await fetch(`${serverUrl}/api/auth/logout`, { method: 'GET', credentials: 'include' });
    } catch (error) {
      console.error("Error during sign out:", error);
    }
    setUserdata(null);
  };

  const value = {
    serverUrl,
    userdata,
    setUserdata,
    signOut,
    getGeminiResponse,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
