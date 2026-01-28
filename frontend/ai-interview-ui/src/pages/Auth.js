import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Auth() {
  const navigate = useNavigate();

  /* ---------------- AUTH MODE ---------------- */
  const [isLogin, setIsLogin] = useState(true);

  /* ---------------- FORM STATES ---------------- */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /* ---------------- CLEAR ALL INPUTS ---------------- */
  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  /* ---------------- SUBMIT HANDLER ---------------- */
  const handleSubmit = async () => {
    // Basic validation
    if (
      !email ||
      !password ||
      (!isLogin && (!firstName || !lastName || !confirmPassword))
    ) {
      alert("Fill all fields");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      /* ---------------- SIGN IN ---------------- */
      if (isLogin) {
        const res = await axios.post(
          "http://127.0.0.1:8000/login",
          null,
          { params: { email, password } }
        );

        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        clearFields();
        navigate("/");
      }

      /* ---------------- SIGN UP ---------------- */
      else {
        await axios.post(
          "http://127.0.0.1:8000/register",
          null,
          {
            params: {
              first_name: firstName,
              last_name: lastName,
              email,
              password
            }
          }
        );

        alert("Registered successfully. Now login.");

        clearFields();
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.detail || "Authentication failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* TITLE */}
        <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>

        {/* SIGN UP ONLY FIELDS */}
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        {/* COMMON FIELDS */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* CONFIRM PASSWORD (SIGN UP ONLY) */}
        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        {/* SUBMIT BUTTON */}
        <button onClick={handleSubmit}>
          {isLogin ? "Sign In" : "Create Account"}
        </button>

        {/* TOGGLE MODE */}
        <p
          className="link-text"
          onClick={() => {
            clearFields();
            setIsLogin(!isLogin);
          }}
        >
          {isLogin
            ? "New user? Register"
            : "Already registered? Sign In"}
        </p>
      </div>
    </div>
  );
}

export default Auth;