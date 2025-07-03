import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Paths } from "../routes/paths";

type Candidate = {
  id: number;
  name: string;
  email: string;
  experienceYears: number;
  area?: string;
  englishLevel?: string;
};

type Job = {
  jobId: number;
  title: string;
  description: string;
};

const CandidateMatchPage: React.FC = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

useEffect(() => {
  const fetchData = async () => {
    try {
      console.log("התחלנו טעינה");

      const jobRes = await fetch(`http://localhost:5297/api/job/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("jobRes.status =", jobRes.status);

      if (!jobRes.ok) throw new Error("שגיאה בטעינת פרטי המשרה");

      const jobData = await jobRes.json();
      console.log("jobData =", jobData);
      setJob(jobData);

      const matchRes = await fetch("http://localhost:5297/api/CandidateMatchTest/run", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("matchRes.status =", matchRes.status);

      if (!matchRes.ok) throw new Error("שגיאה בטעינת התאמות");

      const allMatches = await matchRes.json();
      console.log("allMatches =", allMatches);

      const match = allMatches.find((m: any) => m.job.jobId === Number(jobId)); // ← שימי לב כאן
      console.log("match =", match);

      setCandidates(match?.matchedCandidates || []);
    } catch (err: any) {
      console.error("שגיאה:", err);
      setError("אירעה שגיאה בטעינת הנתונים");
    } finally {
      setLoading(false);
    }
  };

  if (jobId) {
    fetchData();
  }
}, [jobId, token]);

  return (
    <div style={{ padding: "30px", direction: "rtl", maxWidth: 800, margin: "0 auto" }}>
      <h2 style={{ fontSize: 28, color: "#1976d2", marginBottom: 10 }}>
        מועמדים מתאימים למשרה: {job?.title}
      </h2>
      <p style={{ marginBottom: 30 }}>{job?.description}</p>

      {loading ? (
        <div style={{ textAlign: "center", padding: 50 }}>
          <div
            style={{
              border: "6px solid #f3f3f3",
              borderTop: "6px solid #1976d2",
              borderRadius: "50%",
              width: 40,
              height: 40,
              animation: "spin 1s linear infinite",
              margin: "0 auto",
            }}
          />
          <p style={{ marginTop: 20 }}>טוען נתונים...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : error ? (
        <h3 style={{ color: "red", textAlign: "center" }}>{error}</h3>
      ) : candidates.length === 0 ? (
        <p>לא נמצאו מועמדים מתאימים למשרה זו.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {candidates.map((c) => (
            <li
              key={c.id}
              style={{
                background: "#f4f4f4",
                marginBottom: 12,
                padding: 16,
                borderRadius: 8,
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              }}
            >
              <strong>{c.name}</strong> — {c.email} <br />
              <small>
                ניסיון: {c.experienceYears} שנים | אזור: {c.area ?? "לא צוין"} | אנגלית: {c.englishLevel ?? "לא צוין"}
              </small>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: 40, textAlign: "center" }}>
        <Link
          to={`/${Paths.home}`}
          style={{
            background: "#1976d2",
            color: "#fff",
            padding: "10px 20px",
            textDecoration: "none",
            borderRadius: 8,
            fontWeight: "bold",
            fontSize: "1.1em",
          }}
        >
          🔙 חזרה לתפריט מנהל
        </Link>
      </div>
    </div>
  );
};

export default CandidateMatchPage;
