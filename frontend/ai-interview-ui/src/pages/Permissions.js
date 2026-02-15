import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Permissions() {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({
    camera: false,
    microphone: false,
    screen: false
  });
  const [requesting, setRequesting] = useState(false);

  const requestPermissions = async () => {
    setRequesting(true);
    try {
      // Request camera and microphone
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      setPermissions({
        camera: true,
        microphone: true,
        screen: false
      });

      // Stop the stream immediately (we just needed permission)
      stream.getTracks().forEach(track => track.stop());

      // Request screen share
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true
        });
        screenStream.getTracks().forEach(track => track.stop());
        setPermissions(prev => ({ ...prev, screen: true }));
      } catch (err) {
        // Screen share is optional
        console.log("Screen share permission denied (optional)");
      }
    } catch (err) {
      alert("Please allow camera and microphone permissions to continue.");
      console.error(err);
    }
    setRequesting(false);
  };

  const allPermissionsGranted = permissions.camera && permissions.microphone;

  return (
    <div className="mock-page">
      {/* HERO */}
      <div className="mock-hero violet-hero">
        <div style={{ maxWidth: 720 }}>
          <h1>Grant Permissions</h1>
          <p>
            To conduct a proper interview, we need access to your camera and
            microphone. These permissions are essential for your interview session.
          </p>
        </div>
      </div>

      {/* PERMISSIONS SECTION */}
      <div className="mock-section">
        <div className="section-title">Required Permissions</div>

        <div className="mock-grid" style={{ maxWidth: 800, gridTemplateColumns: "1fr" }}>
          {/* Camera Permission */}
          <div className="mock-card" style={{ border: permissions.camera ? "2px solid #10b981" : "2px solid #e5e7eb" }}>
            <div className="card-top" style={{ alignItems: "flex-start" }}>
              <div>
                <h4>🎥 Camera Access</h4>
                <p style={{ marginTop: 6, fontSize: 14 }}>
                  Captures your video and facial expressions during the interview.
                </p>
              </div>
              <div style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: permissions.camera ? "#10b981" : "#e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold"
              }}>
                {permissions.camera ? "✓" : "○"}
              </div>
            </div>
          </div>

          {/* Microphone Permission */}
          <div className="mock-card" style={{ border: permissions.microphone ? "2px solid #10b981" : "2px solid #e5e7eb" }}>
            <div className="card-top" style={{ alignItems: "flex-start" }}>
              <div>
                <h4>🎤 Microphone Access</h4>
                <p style={{ marginTop: 6, fontSize: 14 }}>
                  Captures your audio responses for evaluation and analysis.
                </p>
              </div>
              <div style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: permissions.microphone ? "#10b981" : "#e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold"
              }}>
                {permissions.microphone ? "✓" : "○"}
              </div>
            </div>
          </div>

          {/* Screen Share (Optional) */}
          <div className="mock-card" style={{ opacity: 0.7, border: "2px solid #9ca3af" }}>
            <div className="card-top" style={{ alignItems: "flex-start" }}>
              <div>
                <h4>🖥️ Screen Share (Optional)</h4>
                <p style={{ marginTop: 6, fontSize: 14 }}>
                  Helps monitor for tab switching or suspicious activity during the test.
                </p>
              </div>
              <div style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: permissions.screen ? "#10b981" : "#d1d5db",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: 12
              }}>
                {permissions.screen ? "✓" : "○"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div style={{ textAlign: "center", padding: "40px", gap: 12, display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        <button
          className="mock-btn"
          style={{ background: "#5b21b6" }}
          onClick={requestPermissions}
          disabled={requesting || allPermissionsGranted}
        >
          {requesting ? "⏳ Requesting..." : allPermissionsGranted ? "✓ Permissions Granted" : "🔓 Grant Permissions"}
        </button>

        {allPermissionsGranted && (
          <button
            className="mock-btn"
            style={{ background: "#059669" }}
            onClick={() => navigate("/interview")}
          >
            Start Interview →
          </button>
        )}

        <button
          className="mock-btn"
          style={{ background: "rgba(255,255,255,0.15)", color: "#1e1e2f" }}
          onClick={() => navigate(-1)}
        >
          ← Go Back
        </button>
      </div>

      {/* INFO BOX */}
      <div style={{ maxWidth: 1150, margin: "20px auto", padding: "0 30px" }}>
        <div className="mistake-box" style={{ gap: 18, background: "linear-gradient(135deg, #dbeafe, #f0f9ff)" }}>
          <div>
            <h3 style={{ margin: 0, color: "#1e40af" }}>ℹ️ Privacy Note</h3>
            <p style={{ marginTop: 8, color: "#1e40af", fontSize: 14 }}>
              Your camera and microphone data is only used during this interview session and is 
              never stored or shared. We respect your privacy completely.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bottom-footer">
        Permissions are required for a fair and secure interview experience
      </div>
    </div>
  );
}

export default Permissions;
