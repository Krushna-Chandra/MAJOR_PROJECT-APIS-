import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

import techImg from "../assets/tech.png";
import mistakeImg from "../assets/mistake.png";

function TechnicalInterview() {
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
      <div className="mock-hero tech-hero">
        <div>
          <h1>Technical Interview</h1>
          <p>
            Prepare for coding rounds, algorithms, system design, and core CS
            concepts with AI guidance.
          </p>

          <button
            className="mock-btn"
            onClick={() => navigate("/topics/technical")}
          >
            Start Technical Mock Interview →
          </button>
        </div>

        <img
          src={techImg}
          alt="Technical Interview"
          className="mock-hero-img"
        />
      </div>

      {/* ✅ INTERVIEW MODES SECTION */}
      <div className="mock-section">
        {/* ✅ Header Row Like HR */}
        <div className="section-header-row">
          <h2 className="section-title">Interview Modes</h2>

          <button
            className="small-start-btn"
            onClick={() => navigate("/topics/technical")}
          >
            Start Technical Mock Interview →
          </button>
        </div>

        {/* ✅ MODE CARDS */}
        <div className="mock-grid">

          {/* Card 1 */}
          <div className="mock-card pro-card">
            <div className="card-top">
              <div className="icon-circle">💻</div>

              <div className="chip-row">
                <span className="chip pink">Concepts</span>
                <span className="chip soft">Easy</span>
              </div>
            </div>

            <h3>Concept Questions</h3>
            <p>DBMS, OS, Networks, OOPS fundamentals.</p>

            <div className="card-footer">
              Strong Foundations • Beginner Friendly
            </div>
          </div>

          {/* Card 2 */}
          <div className="mock-card pro-card">
            <div className="card-top">
              <div className="icon-circle">⚡</div>

              <div className="chip-row">
                <span className="chip yellow">Coding</span>
                <span className="chip violet">Intermediate</span>
              </div>
            </div>

            <h3>Coding Round</h3>
            <p>Practice DSA + algorithm-based problems.</p>

            <div className="card-footer">
              Live Problem Solving • AI Evaluation
            </div>
          </div>

          {/* Card 3 */}
          <div className="mock-card pro-card">
            <div className="card-top">
              <div className="icon-circle">⚙️</div>

              <div className="chip-row">
                <span className="chip green">System Design</span>
                <span className="chip pink">Advanced</span>
              </div>
            </div>

            <h3>System Design Round</h3>
            <p>Architecture + scalability interview preparation.</p>

            <div className="card-footer">
              Company Level Patterns • Premium Mode
            </div>
          </div>
        </div>
      </div>

      {/* ✅ COMMON MISTAKES BOX */}
      <div className="mistake-box">
        <div>
          <h2>⚠ Common Mistakes</h2>
          <ul>
            <li>Jumping into coding without understanding the problem</li>
            <li>Ignoring edge cases and constraints</li>
            <li>Not explaining your approach clearly</li>
          </ul>
        </div>

        <img
          src={mistakeImg}
          alt="Technical Mistakes Illustration"
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

export default TechnicalInterview;
