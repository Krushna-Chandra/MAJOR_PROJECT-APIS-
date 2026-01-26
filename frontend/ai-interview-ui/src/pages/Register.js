import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const [cameraOn, setCameraOn] = useState(false);
  const [loading, setLoading] = useState(false);

  const registerFace = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      alert("Camera not ready");
      return;
    }

    setLoading(true);
    try {
      const blob = await fetch(imageSrc).then(res => res.blob());
      const formData = new FormData();
      formData.append("file", blob, "register.jpg");

      const res = await axios.post(
        "http://127.0.0.1:8000/register-face",
        formData
      );

      alert(res.data.status || "Face Registered");
      navigate("/login");

    } catch (err) {
      alert("Registration failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Register (Face Recognition)</h2>

      {!cameraOn && (
        <button onClick={() => setCameraOn(true)}>
          Start Camera
        </button>
      )}

      {cameraOn && (
        <>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={300}
          />

          <br /><br />

          <button
            onClick={registerFace}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register Face"}
          </button>
        </>
      )}

      <br /><br />

      <button onClick={() => navigate("/login")}>
        Go to Login
      </button>
    </div>
  );
}

export default Register;
