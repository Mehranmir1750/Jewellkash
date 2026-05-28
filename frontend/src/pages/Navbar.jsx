import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="homenav">
      <div className="homenav-logo">JewellKash</div>

      <ul className="homenav-links">
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>

        {/* Login with dropdown */}
        <li className="homenav-dropdown-wrap">
          <span className={`nav-dropdown-trigger ${location.pathname.startsWith("/login") ? "active" : ""}`}>
            Login
            <svg className="homenav-chevron" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <ul className="homenav-dropdown">
            <li>
              <Link to="/login" className="homenav-dropdown-item">
                <span className="homenav-dropdown-icon">◈</span>
                <span>
                  <span className="homenav-dropdown-label">Login as User</span>
                  
                </span>
              </Link>
            </li>
            <li className="homenav-dropdown-sep" />
            <li>
              <Link to="/loginAdmin" className="homenav-dropdown-item">
                <span className="homenav-dropdown-icon">◇</span>
                <span>
                  <span className="homenav-dropdown-label">Login as Admin</span>
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