import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

type Candidate = {
  name: string;
  email: string;
  phone: string;
  area: string;
  role: string;
  experienceYears: number;
  englishLevel: string;
  listRequirement: { description: string; advantageOrMust: string }[];
  listSkills: { name: string; mark: number }[];
};

const CandidateDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5297/api/Candidate/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCandidate(res.data);
      } catch (err) {
        console.error("שגיאה בטעינת פרטי מועמד", err);
      }
    };
    fetchCandidate();
  }, [id]);

  if (!candidate) return <div>טוען...</div>;

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "20px" }}>קורות חיים של {candidate.name}</h2>

      <div style={{ marginBottom: "25px", lineHeight: "1.6" }}>
        <p><strong>📧 אימייל:</strong> {candidate.email}</p>
        <p><strong>📞 טלפון:</strong> {candidate.phone}</p>
        <p><strong>📍 אזור:</strong> {candidate.area}</p>
        <p><strong>🧑‍💻 תפקיד:</strong> {candidate.role}</p>
        <p><strong>📆 שנות ניסיון:</strong> {candidate.experienceYears}</p>
        <p><strong>🌐 רמת אנגלית:</strong> {candidate.englishLevel}</p>
      </div>

      <div style={{ marginBottom: "25px" }}>
        <h3>📋 דרישות:</h3>
        <ul>
          {candidate.listRequirement.map((r, index) => (
            <li key={index}>
              {r.description} <span style={{ color: "#777" }}>({r.advantageOrMust})</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: "25px" }}>
        <h3>🛠️ כישורים:</h3>
        <ul>
          {candidate.listSkills.map((s, index) => (
            <li key={index}>
              {s.name} <span style={{ color: "#777" }}>(ציון: {s.mark})</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => navigate("/candidates")}
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        ⬅ חזרה לרשימת המועמדים
      </button>
    </div>
  );
};

export default CandidateDetailsPage;
