import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      <button onClick={() => navigate("/donor")}>Donor</button>
      <button onClick={() => navigate("/recipient")}>Recipient</button>
      <button onClick={() => navigate("/organ")}>Organ</button>
      <button onClick={() => navigate("/request")}>Request</button>
      <button onClick={() => navigate("/match")}>Match</button>
      <button onClick={() => navigate("/transplant")}>Transplant</button>
      <button
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}