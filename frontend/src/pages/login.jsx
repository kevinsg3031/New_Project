import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", form);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input placeholder="Username" onChange={(e)=>setForm({...form, username:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={(e)=>setForm({...form, password:e.target.value})}/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}