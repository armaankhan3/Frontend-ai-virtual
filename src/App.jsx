import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { UserContext } from "./contaxt/UserContext";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Customize from "./pages/Customize";
import Home from "./pages/Home";
import MainHome from "./pages/MainHome";

const App = () => {
  const { userdata } = useContext(UserContext);

  const isAssistantSetup =
    userdata?.assistantName?.trim() &&
    userdata?.assistantImage?.trim() &&
    userdata?.description?.trim();

  useEffect(() => {
    if (userdata) {
      localStorage.setItem("userdata", JSON.stringify(userdata));
    } else {
      localStorage.removeItem("userdata");
    }
  }, [userdata]);

  return (
    <Routes>
      <Route path="/" element={<MainHome />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/customize" element={<Customize />} />

      <Route
        path="/home"
        element={
          isAssistantSetup ? (
            <Home />
          ) : userdata ? (
            <Navigate to="/customize" replace />
          ) : (
            <Navigate to="/signin" replace />
          )
        }
      />
    </Routes>
  );
};

export default App;
