import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>

      <Link to="/donor">Donors</Link><br />
      <Link to="/recipient">Recipients</Link><br />
      <Link to="/organ">Organs</Link><br />
      <Link to="/request">Requests</Link><br />
      <Link to="/match">Matching</Link><br />
      <Link to="/transplant">Transplant</Link><br />
    </div>
  );
}