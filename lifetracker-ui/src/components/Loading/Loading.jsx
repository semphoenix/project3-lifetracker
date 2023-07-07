import React from "react";
import load from "../../assets/load.png";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading">
      {/* GET A GIF */}
      <img src={load} alt="loading icon" className="loading" />
    </div>
  );
};

export default Loading;
