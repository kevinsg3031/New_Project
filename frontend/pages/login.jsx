import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", form);

      const user = res.data.user;

      // 🔥 store user
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login success");

      // 🔥 redirect based on role
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

      <input
        placeholder="Username"
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}