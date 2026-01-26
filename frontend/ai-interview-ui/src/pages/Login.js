import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const [cameraOn, setCameraOn] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginFace = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      alert("Camera not ready");
      return;
    }

    setLoading(true);
    try {
      const blob = await fetch(imageSrc).then(res => res.blob());
      const formData = new FormData();
      formData.append("file", blob, "login.jpg");

      const res = await axios.post(
        "http://127.0.0.1:8000/login-face",
        formData
      );

      if (res.data.status === "LOGIN SUCCESS") {
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Face Login successful");
        navigate("/");
      } else {
        alert("Login failed: Face not matched");
      }

    } catch (err) {
      alert("Login error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Login with Face</h2>

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
            onClick={loginFace}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Login with Face"}
          </button>
        </>
      )}
    </div>
  );
}

export default Login;
