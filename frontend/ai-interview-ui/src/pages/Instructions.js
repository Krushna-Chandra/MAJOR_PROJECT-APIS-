import React from "react";
import { useNavigate } from "react-router-dom";

function Instructions() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px" }}>
      <h2>Interview Instructions</h2>

      <ul>
        <li>Be in a quiet place</li>
        <li>Face the camera</li>
        <li>Do not switch tabs</li>
      </ul>

      <button onClick={() => navigate("/permissions")}>
        Continue
      </button>
    </div>
  );
}

export default Instructions;
