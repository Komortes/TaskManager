import { useState } from "react";
import { CssBaseline } from "@mui/material";
import { Route, Routes, BrowserRouter,Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute"; 


function App() {
  const [auth, setAuth] = useState(false);

  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/signup" element={<Signup setAuth={setAuth} />} />
        <Route
          path="/main"
          element={
            <ProtectedRoute auth={auth}>
              <Home setAuth={setAuth} />
            </ProtectedRoute>
          }
        />
                <Route
                  path="/"
                  element={
                    auth ? (
                      <Home setAuth={setAuth} />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
