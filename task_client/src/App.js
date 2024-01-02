import React, { useState } from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem('accessToken'));


  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/signup" element={<Signup setAuth={setAuth} />} />
        <Route path="/main" element={
          <ProtectedRoute auth={auth}>
            <Home setAuth={setAuth} />
          </ProtectedRoute>
        } />
        <Route
          path="/"
          element={
            auth ? <Navigate to="/main" replace /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
