import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <p>Welcome, {user?.username}</p>
      <p>Role: {user?.role}</p>

      <hr />

      <h3>Actions</h3>

      <button onClick={() => navigate("/donor")}>Donors</button>
      <br /><br />

      <button onClick={() => navigate("/recipient")}>Recipients</button>
      <br /><br />

      <button onClick={() => navigate("/organ")}>Organs</button>
      <br /><br />

      <button onClick={() => navigate("/request")}>Requests</button>
      <br /><br />

      <button onClick={() => navigate("/match")}>Match</button>
      <br /><br />

      <button onClick={() => navigate("/transplant")}>Transplant</button>
      <br /><br />

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