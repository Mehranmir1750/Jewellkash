import { useState } from "react";
import axios from "axios";

import Navbar from "./Navbar";
import "../styles/Register.css";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase"; // adjust path if needed
import { useNavigate } from "react-router-dom";

export default function Register() {

   const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");



  const handleSubmit = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      const res = await axios.post(
        "https://jewellkash.onrender.com/register",
       {
  name: `${firstName} ${lastName}`,
  email,
  phone,
  password
}
      );

      console.log(res.data);

      alert("Account Created Successfully");

    } catch (error) {

      console.log(error);

      alert("Registration Failed");

    }

  };



//   const handleGoogle = async () => {
//   try {
//     const provider =
//       new GoogleAuthProvider();

//     const result =
//       await signInWithPopup(
//         auth,
//         provider
//       );

//     const googleUser = result.user;

//     localStorage.setItem(
//       "user",
//       JSON.stringify({
//         id: googleUser.uid,
//         name: googleUser.displayName,
//         email: googleUser.email,
//       })
//     );

//     navigate("/user-dashboard");

//   } catch (error) {
//     console.log(error);
//   }
// };


const handleGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const googleUser = result.user;

    // ✅ Hit the backend — inserts user if new, returns token + user
    const response = await axios.post(
      "https://jewellkash.onrender.com/google-login",
      {
        name: googleUser.displayName,
        email: googleUser.email,
      }
    );

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    navigate("/user-dashboard");

  } catch (error) {
    console.log(error);
    alert("Google sign-up failed");
  }
};



  return (
    <>
      <Navbar />

      <div className="rp-wrap">

        <div className="rp-card">

          <div className="rp-logo">
            JewellKash
          </div>

          <div className="rp-sub">
            Create your account
          </div>

          <div className="rp-divider">
            <div className="rp-gem" />
          </div>

          <button
            className="rp-google-btn"
            onClick={handleGoogle}
            type="button"
          >
            Continue with Google
          </button>

          <div className="rp-or">or</div>



          <form onSubmit={handleSubmit}>

            <div className="rp-row">

              <div className="rp-field">

                <label className="rp-label">
                  First name
                </label>

                <input
                  className="rp-input"
                  type="text"
                  placeholder="Aadil"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

              </div>



              <div className="rp-field">

                <label className="rp-label">
                  Last name
                </label>

                <input
                  className="rp-input"
                  type="text"
                  placeholder="Mir"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

              </div>

            </div>



            <div className="rp-field">

              <label className="rp-label">
                Email address
              </label>

              <input
                className="rp-input"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>



            <div className="rp-field">

              <label className="rp-label">
                Phone number
              </label>

              <input
                className="rp-input"
                type="tel"
                placeholder="+91 94000 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

            </div>



            <div className="rp-field">

              <label className="rp-label">
                Password
              </label>

              <input
                className="rp-input"
                type="password"
                placeholder="Min. 8 characters"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>



            <div className="rp-field">

              <label className="rp-label">
                Confirm password
              </label>

              <input
                className="rp-input"
                type="password"
                placeholder="Repeat your password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

            </div>



            <button
              className="rp-submit"
              type="submit"
            >
              Create account
            </button>

          </form>



          <p className="rp-terms">
            By registering you agree to our Terms
          </p>



          <div className="rp-footer">
            Already have an account?
            <a href="/login"> Sign in</a>
          </div>

        </div>

      </div>
    </>
  );
}