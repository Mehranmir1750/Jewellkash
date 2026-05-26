import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="nav">
      <div className="nav-logo">JewellKash</div>

      <ul className="nav-links">
        {[
          { to: "/", label: "Home" },
          { to: "/products", label: "Products" },
          { to: "/login", label: "Login" },
          { to: "/register", label: "Register" },
        ].map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className={location.pathname === to ? "active" : ""}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}