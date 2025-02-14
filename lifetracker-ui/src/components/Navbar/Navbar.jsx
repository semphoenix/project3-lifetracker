import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";

export default function Navbar({ appState, setAppState }) {
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
      <span>
        <Link to="/">
          <img src={logo} alt="logo" className="logo-image" />
        </Link>
      </span>
      <div className="logo">
        {/* Instead, you could capitalize the first letter of every first and lastname in the database */}
        {appState.user ? (
          <span>LifeTracker For: {appState.user.firstName.toUpperCase()}</span>
        ) : (
          <span>LifeTracker Application</span>
        )}
      </div>
      <div className="main-nav-items">
        <Link to="/activity">
          <button className="activity">Activity</button>
        </Link>
        <Link to="/exercise">
          <button className="exercise">Exercise</button>
        </Link>
        <Link to="/nutrition">
          <button className="nutrition">Nutrition</button>
        </Link>
        <Link to="/sleep">
          <button className="sleep">Sleep</button>
        </Link>
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
