import React, { useState } from "react";
import { JobService } from "../../services/job.service";
import { useNavigate } from "react-router-dom";

const jobService = new JobService();

export default function JobAdd() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await jobService.addJob({ name, description });
      setMessage("המשרה נוספה בהצלחה!");
      setName("");
      setDescription("");
      setTimeout(() => navigate("/jobs"), 1000);
    } catch {
      setMessage("שגיאה בהוספת משרה");
    }
  };

  return (
    <div>
      <h2>הוספת משרה</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>שם משרה:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>תיאור:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">הוסף</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}