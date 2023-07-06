import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import apiClient from "../../services/apiClient";
import "./App.css";
import Navbar from "../Navbar/Navbar";
//import NotFound from "../NotFound/NotFound";
//import Landing from "..Landing/Landing";
import LoginPage from "../LoginPage/LoginPage";
import ActivityPage from "../ActivityPage/ActivityPage";
import RegisterPage from "../RegisterPage/RegisterPage";
//import NutritionPage from "../NutritionPage/NutritionPage";
import ExercisePage from "../ExercisePage/ExercisePage";

function App() {
  const [appState, setAppState] = useState({
    user: null,
    isAuthenticated: false,
    token: null,
    nutrition: null,
    sleep: null,
    exercise: null,
  });

  useEffect(() => {
    async function fetchData() {
      await fetchUser();
    }
    fetchData();
  }, [appState.isAuthenticated]);

  const fetchUser = async () => {
    const token = localStorage.getItem("lifetracker_token");
    apiClient.setToken(token);
    if (token !== null && typeof token !== "undefined") {
      const data = jwtDecode(token);
      setAppState((s) => ({
        ...s,
        isAuthenticated: true,
        user: {
          userId: data.id,
          userEmail: data.email,
          firstName: data.firstName,
        },
        token: token,
      }));
    } else {
      setAppState((s) => ({
        ...s,
        user: null,
        token: null,
        nutrition: null,
        sleep: null,
        exercise: null,
      }));
    }
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar appState={appState} setAppState={setAppState} />
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
          <Route
            path="/exercise"
            element={
              <ExercisePage
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
