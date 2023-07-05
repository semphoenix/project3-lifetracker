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
      <ul className="logo">
        <li>
          <Link to="/">
            {/* <img src={bottle_logo} alt="logo" /> */}
            <h2>VACCINE HUB</h2>
          </Link>
        </li>
      </ul>
      {appState.user !== null ? (
        <ul>
          <li>
            <button className="btn ghost" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/login">
              <button className="btn ghost">Login</button>
            </Link>
          </li>
          <li>
            <Link to="/register">
              <button className="btn primary">Register</button>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
