import React, { useEffect, useState } from "react";
import { JobService } from "../../services/job.service";
import { useNavigate, useParams } from "react-router-dom";

const jobService = new JobService();

export default function JobEdit() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      jobService.getJobById(Number(id)).then((job) => {
        setName(job.name);
        setDescription(job.description || "");
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await jobService.updateJob(Number(id), { name, description });
      setMessage("המשרה עודכנה בהצלחה!");
      setTimeout(() => navigate("/jobs"), 1000);
    } catch {
      setMessage("שגיאה בעדכון משרה");
    }
  };

  return (
    <div>
      <h2>עריכת משרה</h2>
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
        <button type="submit">עדכן</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}