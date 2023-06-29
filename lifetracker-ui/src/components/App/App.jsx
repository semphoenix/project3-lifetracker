import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import apiClient from "../../services/apiClient";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import NotFound from "../NotFound/NotFound";
import Landing from "..Landing/Landing";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import ActivityPage from "../ActivityPage/ActivityPage";
import NutritionPage from "../NutritionPage/NutritionPage";

function App() {
  const [appState, setAppState] = useState({
    user: null,
    isAuthenticated: null,
    token: null,
    nutrition: null,
    sleep: null,
    exercise: null,
  });

  useEffect(async () => {
    const data = await fetchUser();
    if (data !== null && typeof data !== "undefined")
      setAppState({
        ...appState,
        user: data.user,
        token: data.token,
        isAuthenticated: true,
      });
  }, []);

  const fetchUser = async () => {
    const token = localStorage.getItem("lifetracker_token");
    apiClient.setToken(token);
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar user={appState.user} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/register"
            element={<RegistrationPage setAppState={setAppState} />}
          />
          <Route
            path="/login"
            element={<LoginPage setAppState={setAppState} />}
          />
          {/* <Route
            path="/portal"
            element={
              <Portal
                setAppState={setAppState}
                appState={appState}
                user={appState?.user}
              />
            }
          /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
