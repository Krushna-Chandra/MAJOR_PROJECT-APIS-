import React from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  const topics = topicsMap[category] || [];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">
        {titleMap[category]}
      </h2>

      <div className="topics-page-grid">
        {topics.map((topic, index) => (
          <button
            key={index}
            className="topic-btn"
            onClick={() => navigate("/instructions")}
          >
            {topic}
          </button>
        ))}
      </div>

      <button
        className="back-btn"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}

export default Topics;
