import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

import hrImg from "../assets/hr.png";
import mistakeImg from "../assets/mistake.png";

function HRInterview() {
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
      <div className="mock-hero violet-hero">
        <div>
          <h1>HR Interview</h1>
          <p>
            Practice communication, confidence, and personality-based HR
            questions with AI feedback.
          </p>

          <button
            className="mock-btn"
            onClick={() => navigate("/topics/hr")}
          >
            Start HR Mock Interview →
          </button>
        </div>

        <img src={hrImg} alt="HR Interview" className="mock-hero-img" />
      </div>

      {/* ✅ PRACTICE MODES HEADER ROW */}
      <div className="mock-section">
        <div className="section-header-row">
          <h2 className="section-title">Practice Modes</h2>

          <button
            className="small-start-btn"
            onClick={() => navigate("/topics/hr")}
          >
            Start HR Mock Interview →
          </button>
        </div>

        {/* ✅ MODE CARDS */}
        <div className="mock-grid">

          {/* Card 1 */}
          <div className="mock-card pro-card">
            <div className="card-top">
              <div className="icon-circle">💡</div>

              <div className="chip-row">
                <span className="chip violet">Start</span>
                <span className="chip soft">Easy</span>
              </div>
            </div>

            <h3>Beginner HR Round</h3>
            <p>Simple intro questions to build confidence.</p>

            <div className="card-footer">
              AI Feedback Preview • Strong
            </div>
          </div>

          {/* Card 2 */}
          <div className="mock-card pro-card">
            <div className="card-top">
              <div className="icon-circle">🐍</div>

              <div className="chip-row">
                <span className="chip green">Ready</span>
                <span className="chip yellow">Intermediate</span>
              </div>
            </div>

            <h3>Intermediate HR Questions</h3>
            <p>Boost structured answers for interviews.</p>

            <div className="card-footer">
              Accuracy • Details • Strong
            </div>
          </div>

          {/* Card 3 */}
          <div className="mock-card pro-card">
            <div className="card-top">
              <div className="icon-circle">👔</div>

              <div className="chip-row">
                <span className="chip blue">Pro</span>
                <span className="chip pink">Advanced</span>
              </div>
            </div>

            <h3>Advanced HR Scenario</h3>
            <p>Master tricky HR questions like salary discussions.</p>

            <div className="card-footer">
              Premium Interview Prep • Proactive Tips
            </div>
          </div>
        </div>
      </div>

      {/* ✅ COMMON MISTAKES BOX */}
      <div className="mistake-box">
        <div>
          <h2>⚠ Common Mistakes</h2>
          <ul>
            <li>Speaking too fast or with unclear pronunciation</li>
            <li>Not preparing specific examples beforehand</li>
            <li>Failing to research the company and role</li>
          </ul>
        </div>

        <img
          src={mistakeImg}
          alt="HR Mistakes Illustration"
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

export default HRInterview;
