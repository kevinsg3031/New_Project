import { useState } from "react";
import API from "../src/api/api";

export default function Match() {
  const [requestId, setRequestId] = useState("");

  const findMatch = async () => {
    const res = await API.get(`/match/${requestId}`);
    console.log(res.data);
  };

  return (
    <div>
      <h2>Find Match</h2>
      <input placeholder="Request ID" onChange={(e)=>setRequestId(e.target.value)} />
      <button onClick={findMatch}>Find</button>
    </div>
  );
}