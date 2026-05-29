
import { Link, useLocation } from "react-router-dom";
import "../styles/AdminNavbar.css";

export default function AdminNavbar() {
  const location = useLocation();

  return (
    <nav className="Navbar_homenav">

      {/* Logo */}
      <div className="Navbar_homenav-logo">
        JewellKash Admin
      </div>

      <ul className="Navbar_homenav-links">

        {/* Dashboard */}
        <li>
          <Link
            to="/admin-dashboard"
            className={
              location.pathname === "/admin-dashboard"
                ? "active"
                : ""
            }
          >
            Dashboard
          </Link>
        </li>

        {/* Management Dropdown */}
        <li className="Navbar_homenav-dropdown-wrap">

          <span
            className={`nav-dropdown-trigger ${
              location.pathname.startsWith("/admin")
                ? "active"
                : ""
            }`}
          >
            Management

            <svg
              className="Navbar_homenav-chevron"
              viewBox="0 0 10 6"
              fill="none"
            >
              <path
                d="M1 1l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

          </span>

          <ul className="Navbar_homenav-dropdown">

            <li>
              <Link
                to="/admin-products"
                className="Navbar_homenav-dropdown-item"
              >
                <span className="Navbar_homenav-dropdown-icon">
                  ◈
                </span>

                <span className="Navbar_homenav-dropdown-label">
                  Products
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin-orders"
                className="Navbar_homenav-dropdown-item"
              >
                <span className="Navbar_homenav-dropdown-icon">
                  ◇
                </span>

                <span className="Navbar_homenav-dropdown-label">
                  Orders
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin-users"
                className="Navbar_homenav-dropdown-item"
              >
                <span className="Navbar_homenav-dropdown-icon">
                  ◆
                </span>

                <span className="Navbar_homenav-dropdown-label">
                  Users
                </span>
              </Link>
            </li>

          </ul>

        </li>

        {/* Analytics */}
        <li>
          <Link
            to="/admin-analytics"
            className={
              location.pathname === "/admin-analytics"
                ? "active"
                : ""
            }
          >
            Analytics
          </Link>
        </li>

        {/* Logout */}
        <li>
          <Link
            to="/"
            className="nav-register-link"
          >
            Logout
          </Link>
        </li>

      </ul>

    </nav>
  );
}