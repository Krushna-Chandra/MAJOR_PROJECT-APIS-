import React from "react";
import { useNavigate } from "react-router-dom";

function Permissions() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px" }}>
      <h2>Permissions</h2>

      <p>
        Camera, microphone, and screen permissions will be requested
        on the next page.
      </p>

      <button onClick={() => navigate("/interview")}>
        Start Interview
      </button>
    </div>
  );
}

export default Permissions;
