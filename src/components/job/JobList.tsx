import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Paths } from "../../routes/paths";

type Requirement = {
  description: string;
  advantageOrMust: string;
};

type Skill = {
  name: string;
  mark: number;
};

type Job = {
  jobId: number;
  title: string;
  description: string;
  area: string;
  englishLevel: string;
  passingScore: number;
  numCandidate: number;
  experienceYears: number;
  listRequirement: Requirement[];
  listSkills: Skill[];
};

const API_URL = "http://localhost:5297/api/Job";

interface JobListProps {
  isManager: boolean;
}

const JobList: React.FC<JobListProps> = ({ isManager }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [englishLevel, setEnglishLevel] = useState("Basic");
  const [passingScore, setPassingScore] = useState(80);
  const [numCandidate, setNumCandidate] = useState(1);
  const [experienceYears, setExperienceYears] = useState(0);
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("שגיאה בשליפת משרות");
      const data = await res.json();
      setJobs(data);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setArea("");
    setEnglishLevel("Basic");
    setPassingScore(80);
    setNumCandidate(1);
    setExperienceYears(0);
    setRequirements([]);
    setSkills([]);
    setEditingJob(null);
  };

  const handleAddOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const method = editingJob ? "PUT" : "POST";
    const url = editingJob ? `${API_URL}/${editingJob.jobId}` : API_URL;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobId: editingJob ? editingJob.jobId : 0,
          managerId: 1,
          title,
          description,
          area,
          englishLevel,
          passingScore,
          numCandidate,
          experienceYears,
          listRequirement: requirements,
          listSkills: skills,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`שגיאת שרת: ${res.status} - ${text}`);
      }

      resetForm();
      setError("✅ " + (editingJob ? "המשרה עודכנה" : "המשרה נוספה בהצלחה"));
      fetchJobs();
    } catch (e: any) {
      setError(e.message);
    }
  };

  const addRequirement = () => {
    setRequirements([...requirements, { description: "", advantageOrMust: "Must" }]);
  };

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const updateRequirement = (index: number, field: keyof Requirement, value: string) => {
    const newReqs = [...requirements];
    newReqs[index][field] = value;
    setRequirements(newReqs);
  };

  const addSkill = () => {
    setSkills([...skills, { name: "", mark: 0 }]);
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, field: "name" | "mark", value: string) => {
    const updated = [...skills];
    if (field === "mark") {
      updated[index][field] = +value;
    } else {
      updated[index][field] = value;
    }
    setSkills(updated);
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setTitle(job.title);
    setDescription(job.description);
    setArea(job.area);
    setEnglishLevel(job.englishLevel);
    setPassingScore(job.passingScore);
    setNumCandidate(job.numCandidate);
    setExperienceYears(job.experienceYears);
    setRequirements(job.listRequirement || []);
    setSkills(job.listSkills || []);
  };

  const handleDelete = async (jobId: number) => {
    if (!window.confirm("האם אתה בטוח שברצונך למחוק את המשרה?")) return;
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/${jobId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("מחיקה נכשלה");
      fetchJobs();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div dir="rtl" style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>רשימת משרות</h2>
      {error && <div style={{ color: error.includes("✅") ? "green" : "red" }}>{error}</div>}

      {isManager && (
        <form onSubmit={handleAddOrUpdate} style={{ marginBottom: 30 }}>
          <input placeholder="שם משרה" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input placeholder="תיאור" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input placeholder="אזור" value={area} onChange={(e) => setArea(e.target.value)} />
          <select value={englishLevel} onChange={(e) => setEnglishLevel(e.target.value)}>
            <option value="Basic">Basic</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Fluent">Fluent</option>
            <option value="Native">Native</option>
          </select>
          <div>
            <label>ציון עובר:</label>
            <input type="number" min={0} max={100} value={passingScore} onChange={(e) => setPassingScore(+e.target.value)} />
          </div>
          <div>
            <label>מספר מועמדים:</label>
            <input type="number" min={1} max={10} value={numCandidate} onChange={(e) => setNumCandidate(+e.target.value)} />
          </div>
          <div>
            <label>שנות ניסיון נדרשות:</label>
            <input type="number" min={0} max={100} value={experienceYears} onChange={(e) => setExperienceYears(+e.target.value)} />
          </div>

          <h4>דרישות:</h4>
          {requirements.map((req, index) => (
            <div key={index}>
              <input placeholder="תיאור דרישה" value={req.description} onChange={(e) => updateRequirement(index, "description", e.target.value)} />
              <select value={req.advantageOrMust} onChange={(e) => updateRequirement(index, "advantageOrMust", e.target.value)}>
                <option value="Must">חובה</option>
                <option value="Advantage">יתרון</option>
              </select>
              <button type="button" onClick={() => removeRequirement(index)}>מחק</button>
            </div>
          ))}
          <button type="button" onClick={addRequirement}>+ הוסף דרישה</button>

          <h4>כישורים:</h4>
          {skills.map((skill, index) => (
            <div key={index}>
              <input placeholder="שם כישור" value={skill.name} onChange={(e) => updateSkill(index, "name", e.target.value)} />
              <input placeholder="ציון" type="number" value={skill.mark} onChange={(e) => updateSkill(index, "mark", e.target.value)} />
              <button type="button" onClick={() => removeSkill(index)}>מחק</button>
            </div>
          ))}
          <button type="button" onClick={addSkill}>+ הוסף כישור</button>
          <br />
          <button type="submit" style={{ marginTop: 10 }}>
            {editingJob ? "✏️ עדכן משרה" : "🚀 הוסף משרה"}
          </button>
        </form>
      )}

      <div>
        {jobs.map((job) => (
          <div key={job.jobId} style={{
            border: "1px solid #ccc", borderRadius: "10px", padding: "15px",
            marginBottom: "15px", backgroundColor: "#f9f9f9", boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ marginBottom: 5 }}>{job.title}</h3>
            <p><strong>תיאור:</strong> {job.description}</p>
            <p><strong>אזור:</strong> {job.area}</p>
            <p><strong>רמת אנגלית:</strong> {job.englishLevel}</p>
            <p><strong>ציון עובר:</strong> {job.passingScore}</p>
            <p><strong>מספר מועמדים:</strong> {job.numCandidate}</p>
            <p><strong>שנות ניסיון נדרשות:</strong> {job.experienceYears}</p>
            <p><strong>דרישות:</strong> {job.listRequirement?.map(r => `${r.description} (${r.advantageOrMust})`).join(", ") || "אין"}</p>
            <p><strong>כישורים:</strong> {job.listSkills?.map(s => `${s.name} (${s.mark})`).join(", ") || "אין"}</p>
            {isManager && (
              <div style={{ marginTop: 10 }}>
                <button onClick={() => handleEdit(job)}>✏️ עדכן</button>
                <button onClick={() => handleDelete(job.jobId)} style={{ marginRight: 10 }}>🗑️ מחק</button>
              </div>
            )}
          </div>
        ))}
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <Link
            to={`/${isManager ? Paths.home : Paths.homeClient}`}
            style={{
              background: "#1976d2",
              color: "#fff",
              padding: "10px 24px",
              textDecoration: "none",
              borderRadius: 8,
              fontWeight: "bold",
              fontSize: "1.1em",
            }}
          >
            ⬅ חזרה לתפריט
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobList;
