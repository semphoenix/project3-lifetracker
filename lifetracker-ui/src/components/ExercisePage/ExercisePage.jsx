import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../services/apiClient";
import "./ExercisePage.css";

const ExercisePage = ({ appState, setAppState }) => {
  useEffect(() => {
    const fetchUserData = async () => {
      if (appState.user?.userId !== null) {
        const userData = await apiClient.fetchExerciseFromUserId(
          appState.user.userId
        );
        console.log(userData.data[0].intensity);
        setAppState((s) => ({ ...s, exercise: userData.data }));
      }
    };
    fetchUserData();
  }, [appState.user]);

  const exerciseList = appState.exercise?.map((element, index) => (
    <div className="exercise" key={index}>
      <h3>{element.name}</h3>
      <p>Duration: {element.duration}</p>
      <p>Intensity: {element.intensity}/10</p>
    </div>
  ));
  return (
    <div className="exercise-page">
      {appState.isAuthenticated ? (
        <div className="exercise-container">
          <h2 className="exercise-heading">Exercise</h2>
          <Link to="/exercise/create">
            <button>Add Exercise</button>
          </Link>
          <div className="exercise-grid">{exerciseList}</div>
        </div>
      ) : (
        <div className="not-logged-in">You must log in to see user data.</div>
      )}
    </div>
  );
};

export default ExercisePage;
