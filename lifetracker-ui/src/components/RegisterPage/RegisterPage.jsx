import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../../services/apiClient";
import Loading from "../Loading/Loading";
import "./RegisterPage.css";

const RegisterPage = ({ setAppState }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    //  console.log("HERE");
    setErrors((e) => ({ ...e, form: null }));
    console.log(form.passwordConfirm);
    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
      setIsLoading(false);
      return;
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }));
    }

    try {
      const { data, error, message } = await apiClient.register({
        email: form.email,
        username: form.username,
        firstName: form.firstName,
        lastName: form.lastName,
        password: form.password,
      });

      if (data) {
        setIsLoading(false);
        navigate("/login");
      } else {
        setErrors((e) => ({
          ...e,
          form: "Something went wrong with registration",
          databaseError: true,
        }));
        setIsLoading(false);
      }
    } catch (err) {
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
    <div className="register-page">
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="register-container">
          <h2>Register</h2>
          <p className="error">{errors.databaseError ? errors.form : ""}</p>
          <form className="register-form" onSubmit={handleOnSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              //   className={errors.form ? "error" : ""} -- For error handling
              type="text"
              id="email"
              name="email"
              placeholder={errors.form ? errors.email : "abc@abc.org"}
              onChange={handleOnInputChange}
              required
            />

            <label htmlFor="username">Username:</label>
            <input
              //   className={errors.form ? "error" : ""} -- For error handling
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              onChange={handleOnInputChange}
              required
            />

            <label htmlFor="firstName">First Name:</label>
            <input
              //   className={errors.form ? "error" : ""} -- For error handling
              type="text"
              id="firstName"
              name="firstName"
              placeholder="John"
              onChange={handleOnInputChange}
              required
            />

            <label htmlFor="lastName">Last Name:</label>
            <input
              //   className={errors.form ? "error" : ""} -- For error handling
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Doe"
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

            <label htmlFor="passwordConfirm">Confirm Password:</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              onChange={handleOnInputChange}
              required
            />

            <button type="submit">Register</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
