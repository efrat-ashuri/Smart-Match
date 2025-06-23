import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Candidate = {
  candidateId: number;
  name: string;
};

const AllCandidatesPage = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const navigate = useNavigate();

  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5297/api/Candidate", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCandidates(res.data);
    } catch (err) {
      console.error("שגיאה בטעינת מועמדים", err);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const deleteCandidate = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5297/api/Candidate/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCandidates((prev) => prev.filter((c) => c.candidateId !== id));
    } catch (err) {
      console.error("שגיאה במחיקת מועמד", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>רשימת מועמדים</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {candidates.map((c) => (
          <li key={c.candidateId} style={{ marginBottom: 12 }}>
            <span style={{ marginInlineEnd: 10 }}>{c.name}</span>
            <button onClick={() => navigate(`/manager/candidate/${c.candidateId}`)}>
              קורות חיים
            </button>
            <button
              onClick={() => deleteCandidate(c.candidateId)}
              style={{
                marginInlineStart: 10,
                backgroundColor: "#e53935",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              🗑 מחיקה
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllCandidatesPage;
