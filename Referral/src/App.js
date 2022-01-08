import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Component/Pages/Dashoard";
import Register from "./Component/Pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          caseSensitive={false}
          element={<Dashboard />}
        />

        <Route path="/signup" caseSensitive={false} element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
