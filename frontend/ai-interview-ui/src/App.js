import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Topics from "./pages/Topics";
import Instructions from "./pages/Instructions";
import Interview from "./pages/Interview";
import Permissions from "./pages/Permissions";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EditProfile from "./pages/EditProfile";


import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/register-face"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />

        <Route
          path="/topics/:category"
          element={
            <ProtectedRoute>
              <Topics />
            </ProtectedRoute>
          }
        />

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
