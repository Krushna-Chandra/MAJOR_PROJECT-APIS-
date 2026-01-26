import React, { useEffect, useRef, useState, useCallback } from "react";

const QUESTIONS = [
  "Tell me about yourself.",
  "What are your strengths?",
  "Explain a challenging project you worked on."
];

function Interview() {
  const videoRef = useRef(null);
  const cameraStreamRef = useRef(null);
  const screenStreamRef = useRef(null);
  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState("Initializing interview...");
  const [started, setStarted] = useState(false);
  const [error, setError] = useState("");

  /* ------------------ TEXT TO SPEECH ------------------ */
  const speak = (text) =>
    new Promise((resolve) => {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.onend = resolve;
      window.speechSynthesis.speak(utterance);
    });

  /* ------------------ CAMERA + MIC ------------------ */
  const startCameraAndMic = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    cameraStreamRef.current = stream;
    videoRef.current.srcObject = stream;
    videoRef.current.muted = true;
    videoRef.current.playsInline = true;
    await videoRef.current.play();
  };

  /* ------------------ SCREEN SHARE ------------------ */
  const requestScreenShare = async () => {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true
    });

    // Stop immediately (permission only)
    screenStream.getTracks().forEach((t) => t.stop());
    screenStreamRef.current = screenStream;
  };

  /* ------------------ STOP & NEXT ------------------ */
  const stopListening = useCallback(async () => {
    recognitionRef.current?.stop();
    clearTimeout(silenceTimerRef.current);

    setStatus("Processing answer...");
    await speak("Thank you.");

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setStatus("Interview completed.");
      await speak("Your interview is completed. Thank you.");
    }
  }, [currentIndex]);

  /* ------------------ SPEECH RECOGNITION ------------------ */
  const startListening = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech Recognition not supported. Use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognitionRef.current = recognition;
    setStatus("Listening...");

    recognition.onresult = () => {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = setTimeout(stopListening, 2000);
    };

    recognition.onerror = stopListening;
    recognition.start();
  }, [stopListening]);

  /* ------------------ MAIN FLOW ------------------ */
  useEffect(() => {
    if (!started) return;

    const run = async () => {
      setStatus("Asking question...");
      await speak(QUESTIONS[currentIndex]);
      startListening();
    };

    run();
  }, [started, currentIndex, startListening]);

  /* ------------------ START INTERVIEW ------------------ */
  const beginInterview = async () => {
    try {
      await startCameraAndMic();
      await requestScreenShare();
      setStarted(true);
    } catch (err) {
      setError("Permissions denied or unavailable.");
      console.error(err);
    }
  };

  /* ------------------ CLEANUP ------------------ */
  useEffect(() => {
    return () => {
      cameraStreamRef.current?.getTracks().forEach((t) => t.stop());
      recognitionRef.current?.stop();
      clearTimeout(silenceTimerRef.current);
    };
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>AI Interview</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!started && <button onClick={beginInterview}>Start Interview</button>}

      {started && (
        <>
          {/* Question box */}
          <div
            style={{
              border: "2px solid #333",
              padding: "15px",
              marginBottom: "20px",
              background: "#f5f5f5",
              borderRadius: "8px"
            }}
          >
            <strong>Question:</strong>
            <p>{QUESTIONS[currentIndex]}</p>
          </div>

          {/* Camera preview */}
          <video
            ref={videoRef}
            width="320"
            height="240"
            autoPlay
            playsInline
            style={{
              border: "2px solid black",
              borderRadius: "8px",
              backgroundColor: "black"
            }}
          />

          <p style={{ marginTop: "10px" }}>
            <strong>Status:</strong> {status}
          </p>
        </>
      )}
    </div>
  );
}

export default Interview;
