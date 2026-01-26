import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (!email || !password || (!isLogin && !confirmPassword)) {
      alert("Fill all fields");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      if (isLogin) {
        const res = await axios.post("http://127.0.0.1:8000/login", null, {
          params: { email, password }
        });

        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate("/");
      } else {
        await axios.post("http://127.0.0.1:8000/register", null, {
          params: { email, password }
        });

        alert("Registered successfully. Now login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.detail || "Auth failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>

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
            setIsLogin(!isLogin);
            setConfirmPassword("");
          }}
        >
          {isLogin ? "New user? Register" : "Already registered? Sign In"}
        </p>
      </div>
    </div>
  );
}

export default Auth;
