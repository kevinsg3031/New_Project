import { useState } from "react";
import API from "../api/api";

export default function Transplant() {
  const [form, setForm] = useState({
    surgery_date: "",
    matching_id: "",
    surgeon_id: "",
    hospital_id: 1,
  });

  const handleSubmit = async () => {
    await API.post("/transplant", form);
    alert("Transplant recorded");
  };

  return (
    <div>
      <h2>Transplant</h2>
      <input placeholder="Matching ID" onChange={(e)=>setForm({...form, matching_id:e.target.value})}/>
      <input placeholder="Surgeon ID" onChange={(e)=>setForm({...form, surgeon_id:e.target.value})}/>
      <input placeholder="Date" onChange={(e)=>setForm({...form, surgery_date:e.target.value})}/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}