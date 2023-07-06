import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ appState, setAppState }) {
  console.log(appState);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("lifetracker_token");
    setAppState((s) => ({
      ...s,
      isAuthenticated: false,
    }));
    navigate("/login");
  };

  return (
    <nav className="Navbar">
      <div className="logo">
        <Link to="/">
          {/* <img src={bottle_logo} alt="logo" /> */}
          <h2>LifeTracker Application</h2>
        </Link>
      </div>
      <div className="main-nav-items">
        <button className="activity">Activity</button>
        <button className="exercise">Exercise</button>
        <button className="nutrition">Nutrition</button>
        <button className="sleep">Sleep</button>
      </div>
      {appState.user !== null ? (
        <div className="logout">
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="login-register">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      )}
    </nav>
  );
}
