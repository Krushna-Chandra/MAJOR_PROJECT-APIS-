import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (!email || !password || (!isLogin && !confirmPassword)) {
      alert("Please fill all fields");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Mock authentication (frontend only for now)
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: email.split("@")[0],
        email
      })
    );

    navigate("/");
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

        {/* CONFIRM PASSWORD ONLY FOR REGISTER */}
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
          {isLogin
            ? "New user? Register"
            : "Already registered? Sign In"}
        </p>
      </div>
    </div>
  );
}

export default Auth;
