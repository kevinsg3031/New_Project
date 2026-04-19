import { useState } from "react";
import API from "../src/api/api";

export default function Organ() {
  const [form, setForm] = useState({
    organ_type: "",
    blood_group: "",
    donor_id: "",
    hospital_id: 1,
  });

  const handleSubmit = async () => {
    await API.post("/organs", form);
    alert("Organ added");
  };

  return (
    <div>
      <h2>Add Organ</h2>
      <input placeholder="Organ Type" onChange={(e)=>setForm({...form, organ_type:e.target.value})}/>
      <input placeholder="Blood Group" onChange={(e)=>setForm({...form, blood_group:e.target.value})}/>
      <input placeholder="Donor ID" onChange={(e)=>setForm({...form, donor_id:e.target.value})}/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}