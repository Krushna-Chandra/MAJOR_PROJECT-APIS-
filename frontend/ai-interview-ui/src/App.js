import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Topics from "./pages/Topics";
import Instructions from "./pages/Instructions";
import Interview from "./pages/Interview";
import Permissions from "./pages/Permissions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ MAIN PAGE */}
        <Route path="/" element={<Dashboard />} />

        {/* Auth only when user clicks */}
        <Route path="/auth" element={<Auth />} />

        <Route path="/topics/:category" element={<Topics />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/permissions" element={<Permissions />} />
        <Route path="/interview" element={<Interview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
