import React from "react";
import "./Home.css";
import logo from "../../assets/logo.png";

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-container">
        <div className="header-container">
          <h1>Welcome Back!</h1>
        </div>
        <span>
          <img src={logo} alt="Logo" />
        </span>
      </div>
      <div className="description">
        <p>Take back your life. Quantify and view your activity.</p>
      </div>
    </div>
  );
};

export default Home;
