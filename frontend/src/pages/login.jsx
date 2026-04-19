import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", form);

      const user = res.data.user;

      // 🔥 store user
      localStorage.setItem("user", JSON.stringify(user));

      // 🔥 role-based routing
      if (user.role === "staff") navigate("/dashboard");
      else if (user.role === "donor") navigate("/donor");
      else if (user.role === "recipient") navigate("/recipient");

    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input placeholder="Username"
        onChange={(e)=>setForm({...form, username:e.target.value})} />

      <input type="password" placeholder="Password"
        onChange={(e)=>setForm({...form, password:e.target.value})} />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}