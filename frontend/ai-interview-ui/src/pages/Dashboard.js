import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Dashboard() {
  const navigate = useNavigate();
  const popupRef = useRef(null);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [showProfile, setShowProfile] = useState(false);
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage")
  );

  /* ---------- CLOSE POPUP ON OUTSIDE CLICK ---------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------- IMAGE UPLOAD ---------- */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      localStorage.setItem("profileImage", reader.result);
    };
    reader.readAsDataURL(file);
  };

  /* ---------- LOGOUT ---------- */
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("profileImage");
    setUser(null);
    setProfileImage(null);
    setShowProfile(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <div className="navbar">
        <h2>AI Interview System</h2>

        <div className="nav-right">
          {!user && (
            <button onClick={() => navigate("/auth")}>Sign In</button>
          )}

          {/* PROFILE */}
          <div className="profile-area" ref={popupRef}>
            <div
              className="profile-icon"
              onClick={() => setShowProfile(!showProfile)}
            >
              {profileImage ? (
                <img src={profileImage} alt="profile" />
              ) : user ? (
                user.name[0].toUpperCase()
              ) : (
                "👤"
              )}
            </div>

            {user && <span className="username">{user.name}</span>}

            {showProfile && (
              <div className="profile-popup">
                <label className="profile-image-placeholder">
                  {profileImage ? (
                    <img src={profileImage} alt="preview" />
                  ) : (
                    "+"
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageUpload}
                  />
                </label>

                <button
                  className="edit-profile-btn"
                  onClick={() => alert("Edit profile clicked")}
                >
                  Edit Profile
                </button>

                <button
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* HERO */}
      <div className="hero">
        <h1>Welcome to AI Interview Platform</h1>
        <p>
          Practice interviews with AI-powered voice, facial, and performance
          analysis.
        </p>
      </div>

      {/* CATEGORIES */}
      <div className="container">
        <h2 style={{ textAlign: "center" }}>Interview Categories</h2>

        <div className="category-grid">
          <div className="category-card" onClick={() => navigate("/auth")}>
            <h3>HR Interview</h3>
            <p>Communication & personality questions</p>
          </div>

          <div className="category-card" onClick={() => navigate("/auth")}>
            <h3>Technical Interview</h3>
            <p>Programming & technical concepts</p>
          </div>

          <div className="category-card" onClick={() => navigate("/auth")}>
            <h3>Behavioral Interview</h3>
            <p>Situational & leadership questions</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="footer">© 2026 AI Interview System</div>
    </>
  );
}

export default Dashboard;
