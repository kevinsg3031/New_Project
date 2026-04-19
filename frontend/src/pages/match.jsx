import { useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

export default function Match() {
  const [id, setId] = useState("");

  const findMatch = async () => {
    try {
      const res = await API.get(`/match/${id}`);
      alert(JSON.stringify(res.data));
    } catch {
      alert("Error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Match</h2>
        <input placeholder="Request ID" onChange={(e)=>setId(e.target.value)}/>
        <button onClick={findMatch}>Find</button>
      </div>
    </>
  );
}