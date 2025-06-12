import React, { useState, useEffect } from "react";

type Job = {
  id: string;
  title: string;
  description: string;
  requirements?: string[];
  skills?: string[];
};

const API_URL = "http://localhost:3001/jobs";

interface JobListProps {
  isManager: boolean;
}

const JobList: React.FC<JobListProps> = ({ isManager }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setJobs);
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("יש למלא שם ותיאור משרה");
      return;
    }
    setError(null);
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        requirements: requirements.split(",").map(s => s.trim()).filter(Boolean),
        skills: skills.split(",").map(s => s.trim()).filter(Boolean),
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setTitle("");
        setDescription("");
        setRequirements("");
        setSkills("");
        setError("המשרה נוספה בהצלחה!");
        setTimeout(() => setError(null), 2000);
        fetch(API_URL)
          .then((res) => res.json())
          .then(setJobs);
      });
  };

  const handleDelete = (id: string) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setJobs(jobs.filter((j) => j.id !== id)));
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;
    if (!title.trim() || !description.trim()) {
      setError("יש למלא שם ותיאור משרה");
      return;
    }
    setError(null);
    fetch(`${API_URL}/${editingJob.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editingJob,
        title,
        description,
        requirements: requirements.split(",").map(s => s.trim()).filter(Boolean),
        skills: skills.split(",").map(s => s.trim()).filter(Boolean),
      }),
    })
      .then((res) => res.json())
      .then((updatedJob) => {
        setJobs(
          jobs.map((j) => (j.id === updatedJob.id ? updatedJob : j))
        );
        setEditingJob(null);
        setTitle("");
        setDescription("");
        setRequirements("");
        setSkills("");
      });
  };

  const startEdit = (job: Job) => {
    setEditingJob(job);
    setTitle(job.title || "");
    setDescription(job.description || "");
    setRequirements(job.requirements ? job.requirements.join(", ") : "");
    setSkills(job.skills ? job.skills.join(", ") : "");
  };

  const cancelEdit = () => {
    setEditingJob(null);
    setTitle("");
    setDescription("");
    setRequirements("");
    setSkills("");
    setError(null);
  };

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#4978c9",
        padding: "0",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "40px auto",
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 8px #0001",
          padding: 24,
        }}
      >
        {isManager && (
          <>
            <h2 style={{ textAlign: "center", color: "#222", fontSize: 32, marginBottom: 24, fontWeight: "bold" }}>
              הוסף משרה
            </h2>
            <form
              onSubmit={editingJob ? handleUpdate : handleAdd}
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 24,
                flexWrap: "wrap",
                background: "#ffd000",
                borderRadius: 8,
                padding: 16,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <input
                placeholder="שם משרה"
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={{
                  flex: 1,
                  padding: "6px 8px",
                  borderRadius: 6,
                  border: "1px solid #bbb",
                  fontSize: 15,
                  minWidth: 120
                }}
              />
              <input
                placeholder="תיאור משרה"
                value={description}
                onChange={e => setDescription(e.target.value)}
                style={{
                  flex: 2,
                  padding: "6px 8px",
                  borderRadius: 6,
                  border: "1px solid #bbb",
                  fontSize: 15,
                  minWidth: 180
                }}
              />
              <input
                placeholder="דרישות (הפרד בפסיקים)"
                value={requirements}
                onChange={e => setRequirements(e.target.value)}
                style={{
                  flex: 2,
                  padding: "6px 8px",
                  borderRadius: 6,
                  border: "1px solid #bbb",
                  fontSize: 15,
                  minWidth: 180
                }}
              />
              <input
                placeholder="כישורים (הפרד בפסיקים)"
                value={skills}
                onChange={e => setSkills(e.target.value)}
                style={{
                  flex: 2,
                  padding: "6px 8px",
                  borderRadius: 6,
                  border: "1px solid #bbb",
                  fontSize: 15,
                  minWidth: 180
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#1976d2",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "6px 16px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: 15,
                  minWidth: 80
                }}
              >
                {editingJob ? "עדכן" : "הוסף"}
              </button>
              {editingJob && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  style={{
                    background: "#eee",
                    color: "#333",
                    border: "none",
                    borderRadius: 6,
                    padding: "6px 16px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: 15,
                    minWidth: 80
                  }}
                >
                  ביטול
                </button>
              )}
            </form>
            {error && (
              <div style={{ color: error.includes("הצלחה") ? "green" : "red", marginBottom: 12, textAlign: "right" }}>
                {error}
              </div>
            )}
          </>
        )}

        <h2 style={{ textAlign: "center", color: "#ffd000", margin: "24px 0 16px 0", fontWeight: "bold" }}>
          רשימת משרות
        </h2>
        <ul style={{
          listStyle: "none",
          padding: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          justifyContent: "center"
        }}>
          {jobs.map((job) => (
            <li
              key={job.id}
              style={{
                background: "#ffd000",
                borderRadius: 12,
                marginBottom: 10,
                padding: "18px 20px",
                minWidth: 260,
                maxWidth: 320,
                boxShadow: "0 1px 3px #0002",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                fontSize: 16,
                color: "#222"
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>{job.title}</div>
              <div style={{ marginBottom: 8 }}>{job.description}</div>
              {job.requirements && job.requirements.length > 0 && (
                <div style={{ marginBottom: 6 }}>
                  <span style={{ fontWeight: "bold", color: "#1976d2" }}>דרישות:</span>
                  <ul style={{ margin: "4px 0 0 0", paddingRight: 18 }}>
                    {job.requirements.map((req, idx) => (
                      <li key={idx} style={{ fontSize: 14 }}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
              {job.skills && job.skills.length > 0 && (
                <div style={{ marginBottom: 6 }}>
                  <span style={{ fontWeight: "bold", color: "#388e3c" }}>כישורים:</span>
                  <ul style={{ margin: "4px 0 0 0", paddingRight: 18 }}>
                    {job.skills.map((skill, idx) => (
                      <li key={idx} style={{ fontSize: 14 }}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )}
              {isManager && (
                <div style={{ marginTop: 10 }}>
                  <button
                    onClick={() => startEdit(job)}
                    style={{
                      background: "#ffc107",
                      color: "#333",
                      border: "none",
                      borderRadius: 6,
                      padding: "4px 10px",
                      marginLeft: 6,
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    עדכן
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    style={{
                      background: "#e53935",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "4px 10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    מחק
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobList;