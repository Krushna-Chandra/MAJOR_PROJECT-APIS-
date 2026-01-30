import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async () => {
    // -------- BASIC VALIDATION --------
    if (
      !email ||
      !password ||
      (!isLogin && (!firstName || !lastName || !confirmPassword))
    ) {
      alert("Please fill all fields");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // -------- LOGIN --------
      if (isLogin) {
        const res = await axios.post(
          "http://127.0.0.1:8000/login",
          {
            email,
            password
          }
        );

        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        clearFields();
        navigate("/");
      }
      // -------- REGISTER --------
      else {
        await axios.post(
          "http://127.0.0.1:8000/register",
          {
            first_name: firstName,
            last_name: lastName,
            email,
            password
          }
        );

        alert("Registered successfully. Please sign in.");
        clearFields();
        setIsLogin(true);
      }
    } catch (err) {
      const msg =
        typeof err.response?.data?.detail === "string"
          ? err.response.data.detail
          : err.response?.data?.detail?.[0]?.msg ||
            "Authentication failed";

      alert(msg);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>

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

        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        <button onClick={handleSubmit}>
          {isLogin ? "Sign In" : "Create Account"}
        </button>

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
