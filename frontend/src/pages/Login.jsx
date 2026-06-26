import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/Login.css";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../firebase";


export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigate = useNavigate();


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://jewellkash.onrender.com/login",
        {
          email,
          password
        }
      );

      console.log(res.data);

      // // SAVE TOKEN
      // localStorage.setItem(
      //   "token",
      //   res.data.token
      // );

      // // SAVE USER
      // localStorage.setItem(
      //   "user",
      //   JSON.stringify(res.data.user)
      // );

      // navigate("/user-dashboard");

      // SAVE TOKEN
localStorage.setItem(
  "token",
  res.data.token
);

// SAVE USER
localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

if (res.data.user.role === "admin") {
  navigate("/admin-dashboard");
} else {
  navigate("/user-dashboard");
}

    } catch (error) {

      console.log(error);

      alert("Invalid Credentials");

    }

  };



// const handleGoogle = async () => {
//   try {

//     const provider =
//       new GoogleAuthProvider();

//     const result =
//       await signInWithPopup(
//         auth,
//         provider
//       );


const handleGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const googleUser = result.user;

    const response = await axios.post(
      "https://jewellkash.onrender.com/google-login",
      {
        name: googleUser.displayName,
        email: googleUser.email,
      }
    );
    console.log("Google login response:", response.data);

    localStorage.setItem("token", response.data.token);           // ✅ save token
    localStorage.setItem("user", JSON.stringify(response.data.user)); // ✅ save user only

    navigate("/user-dashboard");

  } catch (error) {
    console.log(error);
  }
};

//     const googleUser =
//       result.user;

//     const response =
//       await axios.post(
//         "https://jewellkash.onrender.com/google-login",
//         {
//           name:
//             googleUser.displayName,
//           email:
//             googleUser.email,
//         }
//       );

//     localStorage.setItem(
//       "user",
//       JSON.stringify(
//         response.data
//       )
//     );

//     navigate("/user-dashboard");

//   } catch (error) {

//     console.log(error);

//   }
// };



  return (
    <>
      <Navbar />

      <div className="lp-wrap">

        <div className="lp-card">

          <div className="lp-logo">
            JewellKash
          </div>

          <div className="lp-sub">
            Welcome back
          </div>

          <div className="lp-divider">
            <div className="lp-gem" />
          </div>

          <button
            className="lp-google-btn"
            onClick={handleGoogle}
            type="button"
          >
            Continue with Google
          </button>

          <div className="lp-or">or</div>



          <form onSubmit={handleSubmit}>

            <div className="lp-field">

              <label className="lp-label">
                Email address
              </label>

              <input
                className="lp-input"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>



            <div className="lp-field">

              <label className="lp-label">
                Password
              </label>

              <input
                className="lp-input"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>



            <div className="lp-forgot">
              <a href="/forgot-password">
                Forgot password?
              </a>
            </div>



            <button
              className="lp-submit"
              type="submit"
            >
              Sign in
            </button>

          </form>



          <div className="lp-footer">
            Don't have an account?
            <a href="/register"> Create one</a>
          </div>

        </div>

      </div>
    </>
  );
}