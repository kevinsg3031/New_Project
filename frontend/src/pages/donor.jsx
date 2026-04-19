import { useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

export default function Donor() {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    blood_group: "",
    hospital_id: 1,
    status: "Active",
  });

  const handleSubmit = async () => {
    try {
      await API.post("/donors", form);
      alert("Donor added");
    } catch {
      alert("Error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Add Donor</h2>
        <input placeholder="Name" onChange={(e)=>setForm({...form, name:e.target.value})}/>
        <input placeholder="DOB" onChange={(e)=>setForm({...form, dob:e.target.value})}/>
        <input placeholder="Blood Group" onChange={(e)=>setForm({...form, blood_group:e.target.value})}/>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
}