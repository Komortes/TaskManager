import React, { useState } from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Tags from "./pages/Tags.js";
import Categories from "./pages/Categories.js";
import CalendarPage from "./pages/CalendarPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes() {
  const location = useLocation();
  const [auth, setAuth] = useState(!!localStorage.getItem('accessToken'));

  return (
    <Routes location={location} key={location.pathname}>
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
      <Route path="/tags" element={
        <ProtectedRoute auth={auth}>
          <Tags setAuth={setAuth} />
        </ProtectedRoute>
      } />
      <Route path="/categories" element={
        <ProtectedRoute auth={auth}>
          <Categories setAuth={setAuth} />
        </ProtectedRoute>
      } />
      <Route path="/calendar/:calendarId" element={
        <ProtectedRoute auth={auth}>
          <CalendarPage setAuth={setAuth} />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AnimatePresence>
        <AnimatedRoutes />
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
