import Navbar from "./Navbar";
import "../styles/LoginAdmin.css";

export default function LoginAdmin() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle admin login
  };

  return (
    <>
      <Navbar />
      <div className="la-wrap">
        <div className="la-card">

          <div className="la-badge">Admin Access</div>
          <div className="la-logo">JewellKash</div>
          <div className="la-sub">Sign in to your admin panel</div>

          <div className="la-divider"><div className="la-gem" /></div>

          <form onSubmit={handleSubmit}>
            <div className="la-field">
              <label className="la-label">Admin ID / Email</label>
              <input className="la-input" type="text" placeholder="admin@jewellkash.com" required />
            </div>

            <div className="la-field">
              <label className="la-label">Password</label>
              <input className="la-input" type="password" placeholder="Enter your password" required />
            </div>

            <div className="la-forgot">
              <a href="/forgot-password">Forgot password?</a>
            </div>

            <button className="la-submit" type="submit">Access Admin Panel</button>
          </form>

          <div className="la-footer">
            Not an admin? <a href="/login/user">Login as User</a>
          </div>

        </div>
      </div>
    </>
  );
}