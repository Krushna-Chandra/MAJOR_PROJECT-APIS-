import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Instructions() {
  const navigate = useNavigate();

  const instructions = [
    { icon: "🤫", title: "Quiet Environment", desc: "Ensure you're in a quiet place with minimal background noise." },
    { icon: "📹", title: "Face the Camera", desc: "Position your device so your face is clearly visible in the frame." },
    { icon: "🚫", title: "Don't Switch Tabs", desc: "Keep the interview window active. Tab-switching will be detected." },
    { icon: "🎤", title: "Check Microphone", desc: "Test your microphone before starting. Audio quality matters." },
    { icon: "⏱️", title: "Time Your Answers", desc: "You'll have a set time for each question. Don't rush or overthink." },
    { icon: "💡", title: "Think Before Speaking", desc: "Take 5-10 seconds to organize your thoughts before answering." }
  ];

  return (
    <div className="mock-page">
      {/* HERO */}
      <div className="mock-hero violet-hero">
        <div style={{ maxWidth: 720 }}>
          <h1>Interview Instructions</h1>
          <p>
            Follow these guidelines to ensure a smooth interview experience.
            Proper setup and focus will help you perform your best.
          </p>
        </div>
      </div>

      {/* INSTRUCTIONS SECTION */}
      <div className="mock-section">
        <div className="section-title">Before You Start</div>

        <div className="mock-grid">
          {instructions.map((item, index) => (
            <div key={index} className="mock-card">
              <div className="card-top">
                <div>
                  <h4>{item.title}</h4>
                  <p style={{ marginTop: 6, fontSize: 14 }}>{item.desc}</p>
                </div>
                <div className="icon-circle">{item.icon}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHECKLIST SECTION */}
      <div style={{ maxWidth: 1150, margin: "40px auto", padding: "0 30px" }}>
        <div className="mistake-box" style={{ gap: 18 }}>
          <div>
            <h3 style={{ margin: 0 }}>✅ Pre-Interview Checklist</h3>
            <ul style={{ marginTop: 12, paddingLeft: 20 }}>
              <li>Camera and microphone are connected and working</li>
              <li>Background is clean and professional</li>
              <li>You have good lighting on your face</li>
              <li>Phone is on silent or away from desk</li>
              <li>All other applications are closed</li>
              <li>You have water nearby (optional but helpful)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div style={{ textAlign: "center", padding: "40px", gap: 12, display: "flex", justifyContent: "center" }}>
        <button
          className="mock-btn"
          style={{ background: "#5b21b6" }}
          onClick={() => navigate("/permissions")}
        >
          Continue to Next Step →
        </button>
        <button
          className="mock-btn"
          style={{ background: "rgba(255,255,255,0.15)", color: "#1e1e2f" }}
          onClick={() => navigate(-1)}
        >
          ← Go Back
        </button>
      </div>

      {/* FOOTER */}
      <div className="bottom-footer">
        Questions? Review our FAQs or contact support
      </div>
    </div>
  );
}

export default Instructions;
