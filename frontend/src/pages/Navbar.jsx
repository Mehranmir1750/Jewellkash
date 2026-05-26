import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="nav">
      <div className="nav-logo">JewellKash</div>

      <ul className="nav-links">
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>

        {/* Login with dropdown */}
        <li className="nav-dropdown-wrap">
          <span className={`nav-dropdown-trigger ${location.pathname.startsWith("/login") ? "active" : ""}`}>
            Login
            <svg className="nav-chevron" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <ul className="nav-dropdown">
            <li>
              <Link to="/login" className="nav-dropdown-item">
                <span className="nav-dropdown-icon">◈</span>
                <span>
                  <span className="nav-dropdown-label">Login as User</span>
                  
                </span>
              </Link>
            </li>
            <li className="nav-dropdown-sep" />
            <li>
              <Link to="/loginAdmin" className="nav-dropdown-item">
                <span className="nav-dropdown-icon">◇</span>
                <span>
                  <span className="nav-dropdown-label">Login as Admin</span>
                </span>
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <Link to="/register" className={`nav-register-link ${location.pathname === "/register" ? "active" : ""}`}>
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}