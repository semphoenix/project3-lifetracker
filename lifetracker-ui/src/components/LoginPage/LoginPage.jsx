import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import Loading from "../Loading/Loading";
import apiClient from "../../services/apiClient";

const LoginPage = ({ appState, setAppState }) => {
  const navigate = useNavigate();

  // Setting up states
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Middleware using front end -- Does not allow user to go to login page if already logged in
  useEffect(() => {
    if (appState.isAuthenticated) navigate("/");
  }, [appState.isAuthenticated]);

  // Handles form input change -- Saves form input into form state & checks for errors
  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      // Reset form errors -- Used to conditionally render email errors
      setErrors((e) => ({ ...e, form: null }));
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }
    // Set the form parameter to input -- Uses spreader to keep previous values
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  // Handles form submit
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // Use loading component
    setIsLoading(true);
    // Set form errors
    setErrors((e) => ({ ...e, form: null }));

    // Try catch block for database call -- Login
    try {
      // Make login post request from the front end to the back end
      const { data, error, message } = await apiClient.login(form);
      // Error handling with backend & frontend connection
      if (error) {
        setErrors((e) => ({
          ...e,
          form: String(message),
        }));
        setIsLoading(false);
        return;
      }
      // If a user is returned, user exists -- save token in localStorage, otherwise user does not exist
      if (data) {
        setAppState((s) => ({
          ...s,
          isAuthenticated: true,
        }));
        localStorage.setItem("lifetracker_token", data.token);
        navigate("/");
      } else {
        setErrors((e) => ({
          ...e,
          form: "Invalid username/password combination",
        }));
        setIsLoading(false);
      }
    } catch (err) {
      // Error handling back-end side
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        form: message ? String(message) : String(err),
      }));
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="login-container">
          <h2>Login</h2>
          <p className="error">
            {errors.form && errors.email === null ? errors.form : ""}
          </p>
          <form className="login-form" onSubmit={handleOnSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              className={errors.form && errors.email !== null ? "error" : ""}
              type="text"
              id="email"
              name="email"
              placeholder={
                errors.form && errors.email !== null
                  ? errors.email
                  : "abc@abc.org"
              }
              onChange={handleOnInputChange}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleOnInputChange}
              required
            />

            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
