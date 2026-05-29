import { Link, useLocation } from "react-router-dom";

/* ── Inject styles once ── */
const injectNavStyles = () => {
  if (document.getElementById("jk-navbar-styles")) return;
  const style = document.createElement("style");
  style.id = "jk-navbar-styles";
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Jost:wght@300;400;500&display=swap');

    /* =========================
       NAVBAR
    ========================= */

    .Navbar_homenav {
      position: sticky;
      top: 0;
      z-index: 1000;

      width: 100%;
      height: 72px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 0 4rem;

      background: #fff7f8;

      border-bottom: 1px solid #f3dede;

      backdrop-filter: blur(10px);

      font-family: 'Jost', sans-serif;
    }

    /* =========================
       LOGO
    ========================= */

    .Navbar_homenav-logo {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #2D1A1E;
      cursor: pointer;
      transition: 0.3s ease;
    }

    .Navbar_homenav-logo:hover {
      color: #C4687A;
    }

    /* =========================
       NAV LINKS
    ========================= */

    .Navbar_homenav-links {
      display: flex;
      align-items: center;
      gap: 2.2rem;
      list-style: none;
    }

    .Navbar_homenav-links a,
    .nav-dropdown-trigger {
      position: relative;
      text-decoration: none;
      color: #2D1A1E;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      transition: 0.3s ease;
      cursor: pointer;
    }

    /* Underline Animation */

    .Navbar_homenav-links a::after,
    .nav-dropdown-trigger::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -6px;
      width: 0%;
      height: 1.5px;
      background: #C4687A;
      transition: 0.3s ease;
    }

    .Navbar_homenav-links a:hover::after,
    .nav-dropdown-trigger:hover::after,
    .Navbar_homenav-links .active::after {
      width: 100%;
    }

    .Navbar_homenav-links a:hover,
    .nav-dropdown-trigger:hover,
    .Navbar_homenav-links .active {
      color: #C4687A;
    }

    /* =========================
       REGISTER BUTTON
    ========================= */

    .nav-register-link {
      padding: 11px 22px;
      border: 1px solid #C4687A;
      border-radius: 999px;
      color: #C4687A !important;
      transition: 0.3s ease;
    }

    .nav-register-link::after {
      display: none;
    }

    .nav-register-link:hover,
    .nav-register-link.active {
      background: #C4687A;
      color: white !important;
      box-shadow: 0 10px 25px rgba(196, 104, 122, 0.25);
    }

    /* =========================
       DROPDOWN
    ========================= */

    .Navbar_homenav-dropdown-wrap {
      position: relative;
    }

    .nav-dropdown-trigger {
      display: flex;
      align-items: center;
      gap: 7px;
    }

    /* Chevron */

    .Navbar_homenav-chevron {
      width: 11px;
      height: 11px;
      transition: 0.3s ease;
    }

    .Navbar_homenav-dropdown-wrap:hover .Navbar_homenav-chevron {
      transform: rotate(180deg);
    }

    /* Dropdown Box */

    .Navbar_homenav-dropdown {
      position: absolute;
      top: 145%;
      right: 0;
      width: 230px;
      background: white;
      border: 1px solid #f3dede;
      border-radius: 18px;
      padding: 10px 0;
      list-style: none;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-12px);
      transition: 0.28s ease;
    }

    .Navbar_homenav-dropdown-wrap:hover .Navbar_homenav-dropdown {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    /* =========================
       DROPDOWN ITEMS
    ========================= */

    .Navbar_homenav-dropdown-item {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 18px;
      transition: 0.22s ease;
      text-decoration: none;
    }

    .Navbar_homenav-dropdown-item::after {
      display: none;
    }

    .Navbar_homenav-dropdown-item:hover {
      background: #fff1f3;
    }

    /* Icon */

    .Navbar_homenav-dropdown-icon {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: #fff0f3;
      color: #C4687A;
      font-size: 13px;
      flex-shrink: 0;
    }

    /* Label */

    .Navbar_homenav-dropdown-label {
      color: #2D1A1E;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.04em;
    }

    /* Divider */

    .Navbar_homenav-dropdown-sep {
      height: 1px;
      background: #f3dede;
      margin: 6px 0;
    }

    /* =========================
       RESPONSIVE
    ========================= */

    @media (max-width: 768px) {
      .Navbar_homenav {
        padding: 0 1.5rem;
      }

      .Navbar_homenav-links {
        gap: 1.2rem;
      }

      .Navbar_homenav-logo {
        font-size: 1.5rem;
      }

      .Navbar_homenav-links a,
      .nav-dropdown-trigger {
        font-size: 10px;
      }

      .nav-register-link {
        padding: 8px 14px;
      }

      .Navbar_homenav-dropdown {
        width: 200px;
      }
    }
  `;
  document.head.appendChild(style);
};

export default function Navbar() {
  injectNavStyles();

  const location = useLocation();

  return (
    <nav className="Navbar_homenav">

      {/* Logo */}
      <div className="Navbar_homenav-logo">JewellKash</div>

      <ul className="Navbar_homenav-links">

        {/* Home */}
        <li>
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
          >
            Home
          </Link>
        </li>

        {/* Login dropdown */}
        <li className="Navbar_homenav-dropdown-wrap">
          <span
            className={`nav-dropdown-trigger ${
              location.pathname.startsWith("/login") ? "active" : ""
            }`}
          >
            Login
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

            {/* User Login */}
            <li>
              <Link to="/login" className="Navbar_homenav-dropdown-item">
                <span className="Navbar_homenav-dropdown-icon">◈</span>
                <span className="Navbar_homenav-dropdown-label">
                  Login as User
                </span>
              </Link>
            </li>

            <li className="Navbar_homenav-dropdown-sep" />

            {/* Admin Login */}
            <li>
              <Link to="/loginAdmin" className="Navbar_homenav-dropdown-item">
                <span className="Navbar_homenav-dropdown-icon">◇</span>
                <span className="Navbar_homenav-dropdown-label">
                  Login as Admin
                </span>
              </Link>
            </li>

          </ul>
        </li>

        {/* Register */}
        <li>
          <Link
            to="/register"
            className={`nav-register-link ${
              location.pathname === "/register" ? "active" : ""
            }`}
          >
            Register
          </Link>
        </li>

      </ul>
    </nav>
  );
}