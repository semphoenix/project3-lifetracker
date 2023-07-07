import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import apiClient from "../../services/apiClient";
import "./ExercisePageForm.css";

const ExercisePageForm = ({ appState }) => {
  const navigate = useNavigate();

  // Setting up states
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    userId: appState.user?.userId,
    name: "",
    category: "run",
    duration: 0,
    intensity: 0,
  });

  // Setting up handlers
  // Handles form input change -- Saves form input into form state & checks for out of bounds number input
  const handleOnInputChange = (event) => {
    if (event.target.name === "duration" && event.target.value > 100) {
      setForm((f) => ({ ...f, [event.target.name]: 100 }));
      return;
    }
    if (event.target.name === "intensity" && event.target.value > 10) {
      setForm((f) => ({ ...f, [event.target.name]: 10 }));
      return;
    }
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
    console.log(form);
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Make login post request from the front end to the back end
      const { data, error, message } = await apiClient.createExercise(form);
      // Error handling with backend & frontend connection
      if (error) {
        setErrors((e) => ({
          ...e,
          form: String(message),
        }));
        return;
      }
      setIsLoading(false);
    } catch (err) {
      // Error handling back-end side
      console.log(err);
      setErrors((e) => ({
        ...e,
        form: message ? String(message) : String(err),
      }));
      setIsLoading(false);
    }
    navigate("/exercise");
  };

  return (
    <div className="exercise-page">
      {appState.isAuthenticated ? (
        <div className="exercise-form-page">
          {isLoading && <Loading />}
          {!isLoading && (
            <div className="exercise-form-container">
              <h2>Add Exercise Form</h2>
              <p className="error">
                {errors.form && errors.email === null ? errors.form : ""}
              </p>
              <form className="exercise-form" onSubmit={handleOnSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleOnInputChange}
                  required
                />

                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleOnInputChange}
                >
                  <option value="run">Run</option>
                  <option value="bike">Bike</option>
                  <option value="lift">Lift</option>
                  <option value="swim">Swim</option>
                  <option value="sports">Sports</option>
                </select>

                <label htmlFor="duration">Duration (min):</label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  placeholder=""
                  value={form.duration}
                  onChange={handleOnInputChange}
                  min="1"
                  max="100"
                  required
                />

                <label htmlFor="intensity">Intensity:</label>
                <input
                  type="number"
                  id="intensity"
                  name="intensity"
                  placeholder=""
                  value={form.intensity}
                  onChange={handleOnInputChange}
                  min="1"
                  max="10"
                  required
                />

                <button type="submit">Submit</button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <div className="not-logged-in">You must log in to see user data.</div>
      )}
    </div>
  );
};

export default ExercisePageForm;
