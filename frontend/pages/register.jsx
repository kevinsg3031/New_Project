import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "staff",
  });

  const handleRegister = async () => {
    try {
      await API.post("/register", form);

      alert("Registered successfully!");

      // 🔥 Redirect to login after register
      navigate("/login");

    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.error || "Register failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>

      <input
        placeholder="Username"
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />
      <br /><br />

      <select
        onChange={(e) =>
          setForm({ ...form, role: e.target.value })
        }
      >
        <option value="staff">Staff</option>
        <option value="donor">Donor</option>
        <option value="recipient">Recipient</option>
      </select>
      <br /><br />

      <button onClick={handleRegister}>
        Register
      </button>

      <br /><br />

      <p>
        Already have an account?{" "}
        <button onClick={() => navigate("/login")}>
          Login
        </button>
      </p>
    </div>
  );
}