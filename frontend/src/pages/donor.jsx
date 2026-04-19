import { useState } from "react";
import API from "../api/api";

export default function Donor() {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    blood_group: "",
    hospital_id: 1,
    status: "Active",
  });

  const handleSubmit = async () => {
    await API.post("/donors", form);
    alert("Donor added");
  };

  return (
    <div>
      <h2>Add Donor</h2>
      <input placeholder="Name" onChange={(e) => setForm({...form, name: e.target.value})}/>
      <input placeholder="DOB" onChange={(e) => setForm({...form, dob: e.target.value})}/>
      <input placeholder="Blood Group" onChange={(e) => setForm({...form, blood_group: e.target.value})}/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}