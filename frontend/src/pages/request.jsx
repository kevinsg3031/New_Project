import { useState } from "react";
import API from "../api/api";

export default function Request() {
  const [form, setForm] = useState({
    organ_needed: "",
    urgency_level: "",
    recipient_id: "",
  });

  const handleSubmit = async () => {
    try {
      await API.post("/requests", form);
      alert("Request created");
    } catch (err) {
      console.error(err);
      alert("Error creating request");
    }
  };

  return (
    <div>
      <h2>Create Transplant Request</h2>

      <input placeholder="Organ Needed"
        onChange={(e)=>setForm({...form, organ_needed:e.target.value})} />

      <input placeholder="Urgency"
        onChange={(e)=>setForm({...form, urgency_level:e.target.value})} />

      <input placeholder="Recipient ID"
        onChange={(e)=>setForm({...form, recipient_id:e.target.value})} />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}   