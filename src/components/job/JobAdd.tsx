import React, { useState } from "react";
import { JobService } from "../../services/job.service";
import { useNavigate } from "react-router-dom";

const jobService = new JobService();

export default function JobAdd() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [englishLevel, setEnglishLevel] = useState("");
  const [listSkills, setListSkills] = useState<string>("");
  const [listRequirement, setListRequirement] = useState<string>("");

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const job = {
        managerId: 1, // או מזהה אמיתי בהתאם למערכת שלך
        title,
        description,
        area,
        englishLevel,
        passingScore: 0,
        numCandidate: 0,
        listSkills: listSkills.split(",").map((s) => ({ name: s.trim() })),
        listRequirement: listRequirement.split(",").map((r) => ({ name: r.trim() })),
      };

      await jobService.addJob(job);
      setMessage("המשרה נוספה בהצלחה!");
      setTimeout(() => navigate("/jobs"), 1000);
    } catch (err) {
      console.error(err);
      setMessage("שגיאה בהוספת משרה");
    }
  };

  return (
    <div>
      <h2>הוספת משרה</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>שם משרה:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>תיאור:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>אזור:</label>
          <input type="text" value={area} onChange={(e) => setArea(e.target.value)} required />
        </div>
        <div>
          <label>רמת אנגלית:</label>
          <input type="text" value={englishLevel} onChange={(e) => setEnglishLevel(e.target.value)} required />
        </div>
        <div>
          <label>כישורים (מופרדים בפסיקים):</label>
          <input type="text" value={listSkills} onChange={(e) => setListSkills(e.target.value)} required />
        </div>
        <div>
          <label>דרישות (מופרדות בפסיקים):</label>
          <input type="text" value={listRequirement} onChange={(e) => setListRequirement(e.target.value)} required />
        </div>
        <button type="submit">הוסף</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}
