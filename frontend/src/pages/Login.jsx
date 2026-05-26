import Navbar from "./Navbar";
import "../styles/Login.css";

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login
  };

  const handleGoogle = () => {
    // trigger Google OAuth
  };

  return (
    <>
      <Navbar />
      <div className="lp-wrap">
        <div className="lp-card">
          <div className="lp-logo">JewellKash</div>
          <div className="lp-sub">Welcome back</div>

          <div className="lp-divider"><div className="lp-gem" /></div>

          <button className="lp-google-btn" onClick={handleGoogle} type="button">
            <svg className="lp-google-icon" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="lp-or">or</div>

          <form onSubmit={handleSubmit}>
            <div className="lp-field">
              <label className="lp-label">Email address</label>
              <input className="lp-input" type="email" placeholder="you@example.com" required />
            </div>

            <div className="lp-field">
              <label className="lp-label">Password</label>
              <input className="lp-input" type="password" placeholder="Enter your password" required />
            </div>

            <div className="lp-forgot">
              <a href="/forgot-password">Forgot password?</a>
            </div>

            <button className="lp-submit" type="submit">Sign in</button>
          </form>

          <div className="lp-footer">
            Don't have an account? <a href="/register">Create one</a>
          </div>
        </div>
      </div>
    </>
  );
}