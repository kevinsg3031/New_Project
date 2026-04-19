import Navbar from "../components/Navbar";

export default function Dashboard() {
  let user = {};

  try {
    user = JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    user = {};
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Dashboard</h2>
        <p>Welcome, {user?.username || "Guest"}</p>
        <p>Role: {user?.role || "N/A"}</p>
      </div>
    </>
  );
}