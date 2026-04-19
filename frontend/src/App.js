import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Donor from "./pages/Donor";
import Organ from "./pages/Organ";
import Match from "./pages/Match";
import Transplant from "./pages/Transplant";
import Recipient from "./pages/Recipient";
import Request from "./pages/Request";
import Register from "./pages/Register";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        <Route path="/donor" element={
          <ProtectedRoute><Donor /></ProtectedRoute>
        } />

        <Route path="/organ" element={
          <ProtectedRoute><Organ /></ProtectedRoute>
        } />

        <Route path="/match" element={
          <ProtectedRoute><Match /></ProtectedRoute>
        } />

        <Route path="/transplant" element={
          <ProtectedRoute><Transplant /></ProtectedRoute>
        } />

        <Route path="/recipient" element={
          <ProtectedRoute><Recipient /></ProtectedRoute>
        } />

        <Route path="/request" element={
          <ProtectedRoute><Request /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;