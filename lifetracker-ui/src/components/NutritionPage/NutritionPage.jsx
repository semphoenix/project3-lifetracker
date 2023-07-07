import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../services/apiClient";
import "./NutritionPage.css";

const NutritionPage = ({ appState, setAppState }) => {
  useEffect(() => {
    const fetchUserData = async () => {
      if (appState.user?.userId) {
        const userData = await apiClient.fetchNutritionFromUserId(
          appState.user.userId
        );
        setAppState((s) => ({ ...s, nutrition: userData.data }));
      }
    };
    fetchUserData();
  }, [appState.user]);

  const nutritionList = appState.nutrition?.map((element, index) => (
    <div className="nutrition" key={index}>
      <h3>
        {element.name} <span>{element.category}</span>
      </h3>
      <p>Calories: {element.calories}</p>
      <p>Quantity: {element.quantity}</p>
    </div>
  ));
  return (
    <div className="nutrition-page">
      {appState.isAuthenticated ? (
        <div className="nutrition-container">
          <h2 className="nutrition-heading">Nutrition</h2>
          <Link to="/nutrition/create">
            <button>Add Nutrition</button>
          </Link>
          <div className="nutrition-grid">{nutritionList}</div>
        </div>
      ) : (
        <div className="not-logged-in">You must log in to see user data.</div>
      )}
    </div>
  );
};

export default NutritionPage;
