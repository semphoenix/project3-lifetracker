import React from "react";
import { Link } from "react-router-dom";
import "./ExercisePage.css";

const ExercisePage = ({ appState }) => {
  const sampleList = [
    { name: "test1", duration: "10", intesity: "9" },
    { name: "test2", duration: "100", intesity: "7" },
  ];
  //   const exerciseList = appState.exercise?.map((element, index) => (
  //     <div className="exercise" key={index}>
  //       <h3>{element.name}</h3>
  //       <p>Duration: {element.duration}</p>
  //       <p>Intensity: {element.intesity}/10</p>
  //     </div>
  const exerciseList = sampleList.map((element, index) => (
    <div className="exercise" key={index}>
      <h3>{element.name}</h3>
      <p>Duration: {element.duration}</p>
      <p>Intensity: {element.intesity}/10</p>
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
