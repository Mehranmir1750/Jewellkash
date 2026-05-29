import Navbar from "./Navbar";
import "../styles/LoginAdmin.css";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // admin login logic here

    navigate("/admin-dashboard");
  };

  return (
    <>
      <Navbar />

      <div className="adminLogin_la-wrap">

        <div className="adminLogin_la-card">

          <div className="adminLogin_la-badge">
            Admin Access
          </div>

          <div className="adminLogin_la-logo">
            JewellKash
          </div>

          <div className="adminLogin_la-sub">
            Sign in to your admin panel
          </div>

          <div className="adminLogin_la-divider">
            <div className="adminLogin_la-gem" />
          </div>

          <form onSubmit={handleSubmit}>

            <div className="adminLogin_la-field">

              <label className="adminLogin_la-label">
                Admin ID / Email
              </label>

              <input
                className="adminLogin_la-input"
                type="text"
                placeholder="admin@jewellkash.com"
                required
              />

            </div>

            <div className="adminLogin_la-field">

              <label className="adminLogin_la-label">
                Password
              </label>

              <input
                className="adminLogin_la-input"
                type="password"
                placeholder="Enter your password"
                required
              />

            </div>

            <div className="adminLogin_la-forgot">
              <a href="/forgot-password">
                Forgot password?
              </a>
            </div>

            <button className="adminLogin_la-submit" type="submit">
              Access Admin Panel
            </button>

          </form>

          <div className="adminLogin_la-footer">
            Not an admin?{" "}
            <a href="/login/user">
              Login as User
            </a>
          </div>

        </div>

      </div>
    </>
  );
}