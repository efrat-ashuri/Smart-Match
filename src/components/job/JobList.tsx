import React, { useState, useEffect } from "react";

type Job = {
  id: number;
  title: string;
  description: string;
};

const API_URL = "http://localhost:3001/jobs";

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setJobs);
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("יש להזין שם משרה");
      return;
    }
    if (!description.trim()) {
      setError("יש להזין תיאור");
      return;
    }
    setError(null);
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    })
      .then((res) => res.json())
      .then((newJob) => {
        setJobs([...jobs, newJob]);
        setTitle("");
        setDescription("");
      });
  };

  const handleDelete = (id: number) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setJobs(jobs.filter((j) => j.id !== id)));
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;
    if (!title.trim()) {
      setError("יש להזין שם משרה");
      return;
    }
    if (!description.trim()) {
      setError("יש להזין תיאור");
      return;
    }
    setError(null);
    fetch(`${API_URL}/${editingJob.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editingJob, title, description }),
    })
      .then((res) => res.json())
      .then((updatedJob) => {
        setJobs(jobs.map((j) => (j.id === updatedJob.id ? updatedJob : j)));
        setEditingJob(null);
        setTitle("");
        setDescription("");
      });
  };

  const startEdit = (job: Job) => {
    setEditingJob(job);
    setTitle(job.title);
    setDescription(job.description);
  };

  const cancelEdit = () => {
    setEditingJob(null);
    setTitle("");
    setDescription("");
    setError(null);
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        background: "#f8f9fa",
        borderRadius: 12,
        boxShadow: "0 2px 8px #0001",
        padding: 24,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333" }}>רשימת משרות</h2>
      <form
        onSubmit={editingJob ? handleUpdate : handleAdd}
        style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}
      >
        <input
          placeholder="שם משרה"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            flex: 1,
            padding: "6px 8px",
            borderRadius: 6,
            border: "1px solid #bbb",
            fontSize: 15,
          }}
        />
        <input
          placeholder="תיאור"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            flex: 1,
            padding: "6px 8px",
            borderRadius: 6,
            border: "1px solid #bbb",
            fontSize: 15,
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
            }}
          >
            ביטול
          </button>
        )}
      </form>
      {error && (
        <div style={{ color: "red", marginBottom: 12, textAlign: "right" }}>
          {error}
        </div>
      )}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {jobs.map((job) => (
          <li
            key={job.id}
            style={{
              background: "#fff",
              borderRadius: 8,
              marginBottom: 10,
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 1px 3px #0001",
            }}
          >
            <span>
              <b>{job.title}</b> <span style={{ color: "#888" }}>({job.description})</span>
            </span>
            <span>
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
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;