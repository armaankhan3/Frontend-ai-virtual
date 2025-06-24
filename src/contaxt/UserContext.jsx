import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const serverUrl = import.meta.env.PROD
  ? "https://ai-assistant-backend-d5ss.onrender.com"
  : "http://localhost:8000";

// Ensure axios sends cookies with every request
axios.defaults.withCredentials = true;

const UserProvider = ({ children }) => {
  const [userdata, setUserdata] = useState(null);

  // Fetch current user data and set in context
  const handleCurrentUser = async () => {
    try {
      // Always send credentials for cross-origin authentication
      const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true });
      setUserdata(result.data.user);
    } catch (error) {
      setUserdata(null);
      // Optionally handle 401 errors globally
      if (error.response && error.response.status === 401) {
        console.warn("Unauthorized: Please log in.");
      }
    }
  };

  const getGeminiResponse = async (command) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/user/asktoassistant`,
        { command },
        { withCredentials: true }
      );
      return result.data;
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        if (error.response.status === 401) {
          console.warn("Unauthorized: Please log in.");
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  }

  // Helper for authenticated POST requests
  const authPost = async (url, data) => {
    try {
      const result = await axios.post(
        `${serverUrl}${url}`,
        data,
        { withCredentials: true }
      );
      return result.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.warn("Unauthorized: Please log in.");
      }
      throw error;
    }
  };

  // Example usage for update user
  const updateUser = async (updateData) => {
    return await authPost('/api/user/update', updateData);
  };

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
    updateUser, // add this to context
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export { serverUrl };
