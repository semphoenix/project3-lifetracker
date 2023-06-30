import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import Loading from "../Loading/Loading";
import apiClient from "../../services/apiClient";

const LoginPage = ({ setAppState }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Handles form input change -- Saves form input into form state & checks for errors
  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      // Error Handling for email input -- HAVE YET TO USE THIS (maybe get rid of databaseErrors and map over errors)
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

    // This is commented out because I was trying to make this component less expensive -- theres no need to make
    // database calls if the form is invalid
    //  if (errors.email !== null) {
    //    setErrors((e) => ({ ...e, form: "Invalid email" }));
    //    console.log("Stop early");
    //    setIsLoading(false);
    //    return;
    //  } else {
    //    setErrors((e) => ({ ...e, form: null }));
    //  }

    try {
      const { data, error, message } = await apiClient.login(form);
      if (error) {
        setErrors((e) => ({
          ...e,
          form: String(message),
          databaseError: true,
        }));
        setIsLoading(false);
        return;
      }

      if (data) {
        // setAppState(data)
        setAppState((s) => ({ ...s, user: data.user, isAuthenticated: true }));
        localStorage.setItem("vaccine_hub_token", data.token);
        navigate("/activity");
      } else {
        setErrors((e) => ({
          ...e,
          form: "Invalid username/password combination",
        }));
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        form: message ? String(message) : String(err),
        databaseError: true,
      }));
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="login-container">
          <h2>Login</h2>
          <p className="error">{errors.databaseError ? errors.form : ""}</p>
          <form className="login-form" onSubmit={handleOnSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              //   className={errors.form ? "error" : ""} -- For error handling
              type="text"
              id="email"
              name="email"
              placeholder="abc@abc.org"
              onChange={handleOnInputChange}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleOnInputChange}
              required
            />

            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </>
  );
};

export default LoginPage;
