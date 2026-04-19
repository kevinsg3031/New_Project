import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Register() {
  const [form, setForm] = useState({ username:"", password:"", role:"staff" });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/register", form);
      alert("Registered");
      navigate("/login");
    } catch {
      alert("Error");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <input placeholder="Username" onChange={(e)=>setForm({...form, username:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={(e)=>setForm({...form, password:e.target.value})}/>
      <select onChange={(e)=>setForm({...form, role:e.target.value})}>
        <option value="staff">Staff</option>
        <option value="donor">Donor</option>
        <option value="recipient">Recipient</option>
      </select>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}