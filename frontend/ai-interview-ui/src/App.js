import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* MAIN PAGES */
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Instructions from "./pages/Instructions";
import Permissions from "./pages/Permissions";
import Interview from "./pages/Interview";
import EditProfile from "./pages/EditProfile";

/* FACE AUTH PAGES */
import Register from "./pages/Register";
import Login from "./pages/Login";

/* NEW CATEGORY PAGES */
import HRInterview from "./pages/HRInterview";
import TechnicalInterview from "./pages/TechnicalInterview";
import BehavioralInterview from "./pages/BehavioralInterview";

/* PROTECTED ROUTE */
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ---------------- PUBLIC ROUTES ---------------- */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />

        {/* ---------------- INTERVIEW CATEGORY ROUTES ---------------- */}
        <Route
          path="/hr-interview"
          element={
            <ProtectedRoute>
              <HRInterview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/technical-interview"
          element={
            <ProtectedRoute>
              <TechnicalInterview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/behavioral-interview"
          element={
            <ProtectedRoute>
              <BehavioralInterview />
            </ProtectedRoute>
          }
        />

        {/* ---------------- FACE REGISTER ROUTE ---------------- */}
        <Route
          path="/register-face"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />

        {/* ---------------- INTERVIEW FLOW ROUTES ---------------- */}
        <Route
          path="/instructions"
          element={
            <ProtectedRoute>
              <Instructions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/permissions"
          element={
            <ProtectedRoute>
              <Permissions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <Interview />
            </ProtectedRoute>
          }
        />

        {/* ---------------- PROFILE ROUTE ---------------- */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
