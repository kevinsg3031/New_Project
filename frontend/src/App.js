import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Donor from "./pages/donor";
import Organ from "./pages/organ";
import Match from "./pages/match";
import Transplant from "./pages/transplant";
import Recipient from "./pages/recipient";
import Request from "./pages/request";
import Register from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donor" element={<Donor />} />
        <Route path="/organ" element={<Organ />} />
        <Route path="/match" element={<Match />} />
        <Route path="/transplant" element={<Transplant />} />
        <Route path="/recipient" element={<Recipient />} />
        <Route path="/request" element={<Request />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;