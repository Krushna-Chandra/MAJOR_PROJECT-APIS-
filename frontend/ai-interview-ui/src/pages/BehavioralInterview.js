import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

import behImg from "../assets/beh.png";
import mistakeImg from "../assets/mistake.png";

function BehavioralInterview() {
  const navigate = useNavigate();

  return (
    <div className="mock-page">
      {/* ✅ MINI NAVBAR */}
      <div className="category-topnav">
        <h3>APIS</h3>

        <div>
          <Link to="/">Dashboard</Link>
          <Link to="/hr-interview">HR</Link>
          <Link to="/technical-interview">Technical</Link>
          <Link to="/behavioral-interview">Behavioral</Link>
        </div>
      </div>

      {/* ✅ HERO */}
      <div className="mock-hero beh-hero">
        <div>
          <h1>Behavioral Interview</h1>
          <p>
            Practice teamwork, leadership, and STAR-based situational questions
            with AI feedback.
          </p>

          <button
            className="mock-btn"
            onClick={() => navigate("/instructions")}
          >
            Start Behavioral Mock Interview →
          </button>
        </div>

        <img
          src={behImg}
          alt="Behavioral Interview"
          className="mock-hero-img"
        />
      </div>

      {/* ✅ PRACTICE MODES HEADER ROW */}
      <div className="mock-section">
        <div className="section-header-row">
          <h2 className="section-title">Practice Modes</h2>

          <button
            className="small-start-btn"
            onClick={() => navigate("/instructions")}
          >
            Start Behavioral Mock →
          </button>
        </div>

        {/* ✅ MODE CARDS */}
        <div className="mock-grid">

          {/* Card 1 */}
          <div className="mock-card pro-card">
            <div className="card-top">
              <div className="icon-circle">🤝</div>

              <div className="chip-row">
                <span className="chip green">Teamwork</span>
                <span className="chip soft">Easy</span>
              </div>
            </div>

            <h3>Team Collaboration</h3>
            <p>Questions focused on teamwork and communication.</p>

            <div className="card-footer">
              Strong Collaboration • AI Feedback
            </div>
          </div>

          {/* Card 2 */}
          <div className="mock-card pro-card">
            <div className="card-top">
              <div className="icon-circle">👑</div>

              <div className="chip-row">
                <span className="chip yellow">Leadership</span>
                <span className="chip green">Intermediate</span>
              </div>
            </div>

            <h3>Leadership Round</h3>
            <p>Situational questions testing decision-making.</p>

            <div className="card-footer">
              STAR Framework • Decision Skills
            </div>
          </div>

          {/* Card 3 */}
          <div className="mock-card pro-card">
            <div className="card-top">
              <div className="icon-circle">📊</div>

              <div className="chip-row">
                <span className="chip blue">Full Session</span>
                <span className="chip green">Premium</span>
              </div>
            </div>

            <h3>Full Behavioral Mock</h3>
            <p>Complete behavioral simulation with AI evaluation.</p>

            <div className="card-footer">
              Confidence Score • Full Report Included
            </div>
          </div>

        </div>
      </div>

      {/* ✅ COMMON MISTAKES BOX */}
      <div className="mistake-box">
        <div>
          <h2>⚠ Common Mistakes</h2>
          <ul>
            <li>Not using the STAR structure properly</li>
            <li>Giving vague examples instead of real situations</li>
            <li>Failing to highlight leadership or teamwork impact</li>
          </ul>
        </div>

        <img
          src={mistakeImg}
          alt="Mistakes Illustration"
          className="mistake-img"
        />
      </div>

      {/* ✅ FOOTER */}
      <div className="bottom-footer">
        Prepared by AI Powered Interview System
      </div>
    </div>
  );
}

export default BehavioralInterview;
