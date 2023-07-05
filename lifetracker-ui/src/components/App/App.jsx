import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
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

  // Combine two functions below into one later
  useEffect(() => {
    async function fetchData() {
      const token = await fetchUser();
      const data = jwtDecode(token);
      if (data !== null && typeof data !== "undefined")
        setAppState((s) => ({
          ...s,
          user: {
            userId: data.id,
            userEmail: data.email,
            firstName: data.firstName,
          },
          token: token,
        }));
    }
    fetchData();
  }, [appState.isAuthenticated]);

  const fetchUser = async () => {
    const token = localStorage.getItem("lifetracker_token");
    apiClient.setToken(token);
    return token;
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
            element={
              <LoginPage appState={appState} setAppState={setAppState} />
            }
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
