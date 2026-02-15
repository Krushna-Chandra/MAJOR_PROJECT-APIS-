import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const popupRef = useRef(null);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [showProfile, setShowProfile] = useState(false);

  const [profileImage, setProfileImage] = useState(
    user?.profile_image || null
  );

  /* ---------- CLOSE PROFILE POPUP ON OUTSIDE CLICK ---------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------- IMAGE UPLOAD ---------- */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.put(
          "http://127.0.0.1:8000/profile",
          {
            profile_image: reader.result
          },
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        );

        // update localStorage + state
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        setProfileImage(res.data.user.profile_image);
        setShowProfile(false);
      } catch (err) {
        alert("Failed to update profile image");
      }
    };

    reader.readAsDataURL(file);
  };

  /* ---------- LOGOUT ---------- */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setShowProfile(false);
    navigate("/");
  };

  const userInitial = user?.email
    ? user.email[0].toUpperCase()
    : "U";

  const nameMode = user?.name_update_mode;

  let userDisplayName = "User";

  if (nameMode === "first_only") {
    userDisplayName = user.first_name;
  } else if (nameMode === "full") {
    userDisplayName = `${user.first_name} ${user.last_name}`;
  } else if (user?.first_name && user?.last_name) {
    userDisplayName = `${user.first_name} ${user.last_name}`;
  } else if (user?.first_name) {
    userDisplayName = user.first_name;
  } else if (user?.email) {
    userDisplayName = user.email.split("@")[0];
  }

  return (
    <>
      {/* NAVBAR */}
      <div className="navbar">
        <h2>APIS - AI Powered Interview System</h2>

        <div className="nav-right">
          {!user ? (
            <button onClick={() => navigate("/auth")}>
              Sign In / Sign Up
            </button>
          ) : (
            <div className="profile-area" ref={popupRef}>
              <div
                className="profile-icon"
                onClick={() => setShowProfile((prev) => !prev)}
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

                  <button
                    className="edit-profile-btn"
                    onClick={() => navigate("/profile")}
                  >
                    Edit Profile
                  </button>

                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* HERO - professional two-column layout */}
      <div className="mock-hero violet-hero">
        <div style={{ maxWidth: 720 }}>
          <h1>Practice. Improve. Land the Job.</h1>
          <p>
            APIS helps you prepare for interviews with AI-driven feedback,
            realistic mock interviews and face-based verification — all in one
            polished experience.
          </p>

          <div style={{ marginTop: 22 }}>
            <button className="mock-btn" onClick={() => navigate('/hr-interview')}>
              Browse Categories
            </button>
            <button
              className="mock-btn"
              style={{ marginLeft: 12, background: 'rgba(255,255,255,0.18)', color: '#fff' }}
              onClick={() => navigate('/topics/hr')}
            >
              Quick Interview
            </button>
          </div>
        </div>

        <div>
          {/* simple illustrative SVG */}
          <svg className="mock-hero-img" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
                <stop offset="1" stopColor="#fff" stopOpacity="0.06" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="600" height="400" rx="24" fill="url(#g1)" />
            <g transform="translate(40,24)">
              <rect x="0" y="0" width="260" height="160" rx="14" fill="#fff" opacity="0.12" />
              <rect x="300" y="40" width="220" height="120" rx="14" fill="#fff" opacity="0.08" />
              <circle cx="190" cy="220" r="70" fill="#fff" opacity="0.06" />
              <g transform="translate(40,16)" fill="#fff" opacity="0.95">
                <rect x="8" y="8" width="44" height="8" rx="4" />
                <rect x="8" y="26" width="110" height="8" rx="4" />
                <rect x="8" y="44" width="80" height="8" rx="4" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* STATS / HIGHLIGHTS */}
      <div style={{ maxWidth: 1100, margin: '30px auto 0', padding: '0 40px' }}>
        <div className="mistake-box" style={{ gap: 18 }}>
          <div>
            <h3 style={{ margin: 0 }}>Trusted by learners worldwide</h3>
            <p style={{ marginTop: 8, color: '#444' }}>Thousands of mock interviews, real feedback and measurable growth.</p>
          </div>

          <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800 }}>4.8</div>
              <div style={{ fontSize: 12, color: '#555' }}>Average Rating</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800 }}>120k+</div>
              <div style={{ fontSize: 12, color: '#555' }}>Practice Sessions</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800 }}>95%</div>
              <div style={{ fontSize: 12, color: '#555' }}>Improved Confidence</div>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="container">
        <h2 style={{ textAlign: 'center' }}>Interview Categories</h2>

        <div className="category-grid">
          {/* ✅ UPDATED NAVIGATION */}
          <div
            className="category-card"
            onClick={() => navigate("/hr-interview")}
          >
            <h3>HR Interview</h3>
            <p>Communication & personality questions</p>
          </div>

          <div
            className="category-card"
            onClick={() => navigate("/technical-interview")}
          >
            <h3>Technical Interview</h3>
            <p>Programming & technical concepts</p>
          </div>

          <div
            className="category-card"
            onClick={() => navigate("/behavioral-interview")}
          >
            <h3>Behavioral Interview</h3>
            <p>Situational & leadership questions</p>
          </div>

          {user && (
            <div
              className="category-card"
              onClick={() => navigate("/register-face")}
            >
              <h3>Register Face</h3>
              <p>Link your face to your account</p>
            </div>
          )}
        </div>
      </div>
      
      {/* FEATURES */}
      <div className="mock-section">
        <div className="section-title">Why APIS</div>

        <div className="mock-grid">
          <div className="mock-card">
            <div className="card-top">
              <div>
                <h4>AI Feedback</h4>
                <p style={{ marginTop: 6 }}>Receive automated feedback on clarity, pace and content.</p>
              </div>
              <div className="icon-circle">🤖</div>
            </div>
            <div className="card-footer">Actionable suggestions after every mock session.</div>
          </div>

          <div className="mock-card">
            <div className="card-top">
              <div>
                <h4>Realistic Mock Interviews</h4>
                <p style={{ marginTop: 6 }}>Simulate HR, technical and behavioral rounds with scoring.</p>
              </div>
              <div className="icon-circle">🎯</div>
            </div>
            <div className="card-footer">Structured prompts and timeboxed answers.</div>
          </div>

          <div className="mock-card">
            <div className="card-top">
              <div>
                <h4>Face Verification</h4>
                <p style={{ marginTop: 6 }}>Securely link your identity for proctored sessions.</p>
              </div>
              <div className="icon-circle">🛡️</div>
            </div>
            <div className="card-footer">Simple registration, privacy-first design.</div>
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
