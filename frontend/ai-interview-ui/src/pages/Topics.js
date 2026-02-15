import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../App.css";

function Topics() {
  const { category } = useParams();
  const navigate = useNavigate();

  const topicsMap = {
    hr: [
      "Self Introduction",
      "Strengths & Weaknesses",
      "Career Goals",
      "Why Should We Hire You?"
    ],
    technical: [
      "Python Basics",
      "Data Structures",
      "Database & SQL",
      "OOPS Concepts"
    ],
    behavioral: [
      "Teamwork",
      "Leadership",
      "Handling Pressure",
      "Conflict Resolution"
    ]
  };

  const titleMap = {
    hr: "HR Interview Topics",
    technical: "Technical Interview Topics",
    behavioral: "Behavioral Interview Topics"
  };

  const descriptionMap = {
    hr: "Build confidence with communication and personality-based questions",
    technical: "Master coding, algorithms, and system design fundamentals",
    behavioral: "Practice STAR-based situational and leadership questions"
  };

  const colorMap = {
    hr: "violet-hero",
    technical: "tech-hero",
    behavioral: "beh-hero"
  };

  const topics = topicsMap[category] || [];
  const title = titleMap[category] || "Interview Topics";
  const description = descriptionMap[category] || "";
  const heroClass = colorMap[category] || "violet-hero";

  return (
    <div className="mock-page">
      {/* MIN NAVBAR */}
      <div className="category-topnav">
        <h3>APIS</h3>
        <div>
          <Link to="/">Dashboard</Link>
          <Link to="/hr-interview">HR</Link>
          <Link to="/technical-interview">Technical</Link>
          <Link to="/behavioral-interview">Behavioral</Link>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className={`mock-hero ${heroClass}`}>
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
          <button className="mock-btn" onClick={() => navigate("/instructions")}>
            Start Your First Interview →
          </button>
        </div>
      </div>

      {/* TOPICS GRID */}
      <div className="mock-section">
        <div className="section-title">Available Topics</div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {topics.map((topic, index) => (
            <div key={index} className="mock-card pro-card">
              <div className="card-top">
                <div>
                  <h4>{topic}</h4>
                  <p style={{ marginTop: 6 }}>Practice with curated questions on this topic</p>
                </div>
                <div className="icon-circle">📝</div>
              </div>

              <button
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "12px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#5b21b6",
                  color: "white",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
                onClick={() => navigate("/instructions")}
              >
                Practice Topic →
              </button>

              <div className="card-footer">AI Feedback Enabled</div>
            </div>
          ))}
        </div>
      </div>

      {/* BACK BUTTON */}
      <div style={{ textAlign: "center", marginTop: "40px", paddingBottom: "40px" }}>
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            background: "#e5e7eb",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600"
          }}
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* FOOTER */}
      <div className="bottom-footer">
        Selected {topics.length} topics for your interview preparation
      </div>
    </div>
  );
}

export default Topics;
