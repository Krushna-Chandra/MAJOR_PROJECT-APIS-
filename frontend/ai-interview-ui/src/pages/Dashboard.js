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
    localStorage.clear();
    setUser(null);
    navigate("/auth");
  };

  const userInitial = user?.email ? user.email[0].toUpperCase() : "U";
  const userDisplayName = user?.email
    ? user.email.split("@")[0]
    : "User";

  return (
    <>
      {/* NAVBAR */}
      <div className="navbar">
        <h2>APIS - AI Powered Interview System</h2>

        <div className="nav-right">
          <div className="profile-area" ref={popupRef}>
            <div
              className="profile-icon"
              onClick={() => setShowProfile(!showProfile)}
            >
              {profileImage ? (
                <img src={profileImage} alt="profile" />
              ) : (
                userInitial
              )}
            </div>

            <span className="username">{userDisplayName}</span>

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

                <button className="edit-profile-btn">
                  Edit Profile
                </button>

                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* HERO */}
      <div className="hero">
        <h1>Welcome to APIS</h1>
        <p>AI Powered Interview Practice Platform</p>
      </div>

      {/* CATEGORIES */}
      <div className="container">
        <h2 style={{ textAlign: "center" }}>Interview Categories</h2>

        <div className="category-grid">
          <div
            className="category-card"
            onClick={() => navigate("/topics/hr")}
          >
            <h3>HR Interview</h3>
            <p>Communication & personality questions</p>
          </div>

          <div
            className="category-card"
            onClick={() => navigate("/topics/technical")}
          >
            <h3>Technical Interview</h3>
            <p>Programming & technical concepts</p>
          </div>

          <div
            className="category-card"
            onClick={() => navigate("/topics/behavioral")}
          >
            <h3>Behavioral Interview</h3>
            <p>Situational & leadership questions</p>
          </div>

          <div
            className="category-card"
            onClick={() => navigate("/register-face")}
          >
            <h3>Register Face</h3>
            <p>Link your face to your account</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="footer">
        © 2026 APIS - AI Powered Interview System
      </div>
    </>
  );
}

export default Dashboard;
