import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import apiClient from "../../services/apiClient";
import "./App.css";
//import Navbar from "../Navbar/Navbar";
//import NotFound from "../NotFound/NotFound";
//import Landing from "..Landing/Landing";
import LoginPage from "../LoginPage/LoginPage";
import ActivityPage from "../ActivityPage/ActivityPage";
import RegisterPage from "../RegisterPage/RegisterPage";
//import NutritionPage from "../NutritionPage/NutritionPage";

function App() {
  const [appState, setAppState] = useState({
    user: null,
    isAuthenticated: null,
    token: null,
    nutrition: null,
    sleep: null,
    exercise: null,
  });

  useEffect(() => {
    async function fetchData() {
      const data = await fetchUser();
      if (data !== null && typeof data !== "undefined")
        setAppState({
          ...appState,
          user: data.user,
          token: data.token,
        });
    }
    fetchData();
  }, [appState.isAuthenticated]);

  const fetchUser = async () => {
    const token = localStorage.getItem("lifetracker_token");
    apiClient.setToken(token);
  };

  return (
    <div className="app">
      <BrowserRouter>
        {/* <Navbar user={appState.user} /> */}
        <Routes>
          {/* <Route path="/" element={<Landing />} /> */}
          <Route
            path="/register"
            element={<RegisterPage setAppState={setAppState} />}
          />
          <Route
            path="/login"
            element={<LoginPage setAppState={setAppState} />}
          />
          <Route
            path="/activity"
            element={
              <ActivityPage
                setAppState={setAppState}
                appState={appState}
                user={appState?.user}
              />
            }
          />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
