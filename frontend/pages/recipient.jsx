import { useState } from "react";
import API from "../src/api/api";

export default function Recipient() {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    blood_group: "",
    urgency_level: "",
    hospital_id: 1,
  });

  const handleSubmit = async () => {
    try {
      await API.post("/recipients", form);
      alert("Recipient added");
    } catch (err) {
      console.error(err);
      alert("Error adding recipient");
    }
  };

  return (
    <div>
      <h2>Add Recipient</h2>

      <input placeholder="Name"
        onChange={(e)=>setForm({...form, name:e.target.value})} />

      <input placeholder="DOB"
        onChange={(e)=>setForm({...form, dob:e.target.value})} />

      <input placeholder="Blood Group"
        onChange={(e)=>setForm({...form, blood_group:e.target.value})} />

      <input placeholder="Urgency (Low/Medium/High)"
        onChange={(e)=>setForm({...form, urgency_level:e.target.value})} />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}