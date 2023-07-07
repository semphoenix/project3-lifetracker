import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import apiClient from "../../services/apiClient";
import "./NutritionPageForm.css";

const NutritionPageForm = ({ appState }) => {
  const navigate = useNavigate();

  // Setting up states
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    userId: appState.user?.userId,
    name: "",
    category: "snack",
    quantity: 1,
    calories: 0,
    image_url: "",
  });

  // Setting up handlers
  // Handles form input change -- Saves form input into form state & checks for out of bounds number input
  const handleOnInputChange = (event) => {
    if (event.target.name === "quantity" && event.target.value > 100) {
      setForm((f) => ({ ...f, [event.target.name]: 100 }));
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
      const { data, error, message } = await apiClient.createNutrition(form);
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
    navigate("/nutrition");
  };

  return (
    <div className="nutrition-page">
      {appState.isAuthenticated ? (
        <div className="nutrition-form-page">
          {isLoading && <Loading />}
          {!isLoading && (
            <div className="nutrition-form-container">
              <h2>Add Nutrition Form</h2>
              <p className="error">
                {errors.form && errors.email === null ? errors.form : ""}
              </p>
              <form className="nutrition-form" onSubmit={handleOnSubmit}>
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
                  <option value="snack">Snack</option>
                  <option value="beverage">Beverage</option>
                  <option value="food">Food</option>
                </select>

                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  placeholder=""
                  value={form.quantity}
                  onChange={handleOnInputChange}
                  min="1"
                  max="100"
                  required
                />

                <label htmlFor="calories">Calories:</label>
                <input
                  type="number"
                  id="calories"
                  name="calories"
                  placeholder=""
                  value={form.calories}
                  onChange={handleOnInputChange}
                  required
                />

                <label htmlFor="image_url">Image Url:</label>
                <input
                  type="text"
                  id="image_url"
                  name="image_url"
                  placeholder="Image Url"
                  value={form.image_url}
                  onChange={handleOnInputChange}
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

export default NutritionPageForm;
