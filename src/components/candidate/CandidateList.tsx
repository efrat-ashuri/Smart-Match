import React, { useState, useEffect } from "react";

type Candidate = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  experienceYears?: number;
  role?: string;
  area?: string;
  englishLevel?: string;
  requirements?: string[];
  skills?: string[];
};

const API_URL = "http://localhost:3001/candidates";

const REQUIREMENTS_OPTIONS = [
  "תואר ראשון",
  "תואר שני",
  "תעודת הנדסאי",
  "תעודה מקצועית לא ממוסד",
  "לימדה עצמית",
  "עברית",
  "אנגלית רמה גבוהה",
  "עבודה בצוות",
  "עבודה בזמן",
];

const SKILLS_OPTIONS = [
  "C",
  "C#",
  "C++",
  "Java",
  "Python",
  "Linux",
  "Windows",
  "Mac",
  "Full Stack",
  "Backend",
  "Frontend",
];

const CandidateList: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experienceYears, setExperienceYears] = useState<number>(0);
  const [role, setRole] = useState("");
  const [area, setArea] = useState("");
  const [englishLevel, setEnglishLevel] = useState("Basic");
  const [requirements, setRequirements] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [managerEmail, setManagerEmail] = useState("");
  const [managerPassword, setManagerPassword] = useState("");
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    if (isManager) {
      fetch(API_URL)
        .then((res) => res.json())
        .then(setCandidates);
    }
  }, [isManager]);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("יש למלא שם ואימייל");
      return;
    }
    if (!isValidEmail(email)) {
      setError("אימייל לא תקין");
      return;
    }
    setError(null);
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        experienceYears,
        role,
        area,
        englishLevel,
        requirements,
        skills,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setName("");
        setEmail("");
        setPhone("");
        setExperienceYears(0);
        setRole("");
        setArea("");
        setEnglishLevel("Basic");
        setRequirements([]);
        setSkills([]);
        setError("המועמד נוסף בהצלחה!");
        setTimeout(() => setError(null), 2000);
        if (isManager) {
          fetch(API_URL)
            .then((res) => res.json())
            .then(setCandidates);
        }
      });
  };

  const handleDelete = (id: string) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setCandidates(candidates.filter((c) => c.id !== id)));
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCandidate) return;
    if (!name.trim() || !email.trim()) {
      setError("יש למלא שם ואימייל");
      return;
    }
    if (!isValidEmail(email)) {
      setError("אימייל לא תקין");
      return;
    }
    setError(null);
    fetch(`${API_URL}/${editingCandidate.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editingCandidate,
        name,
        email,
        phone,
        experienceYears,
        role,
        area,
        englishLevel,
        requirements,
        skills,
      }),
    })
      .then((res) => res.json())
      .then((updatedCandidate) => {
        setCandidates(
          candidates.map((c) => (c.id === updatedCandidate.id ? updatedCandidate : c))
        );
        setEditingCandidate(null);
        setName("");
        setEmail("");
        setPhone("");
        setExperienceYears(0);
        setRole("");
        setArea("");
        setEnglishLevel("Basic");
        setRequirements([]);
        setSkills([]);
      });
  };

  const startEdit = (candidate: Candidate) => {
    setEditingCandidate(candidate);
    setName(candidate.name || "");
    setEmail(candidate.email || "");
    setPhone(candidate.phone || "");
    setExperienceYears(candidate.experienceYears || 0);
    setRole(candidate.role || "");
    setArea(candidate.area || "");
    setEnglishLevel(candidate.englishLevel || "Basic");
    setRequirements(candidate.requirements || []);
    setSkills(candidate.skills || []);
  };

  const cancelEdit = () => {
    setEditingCandidate(null);
    setName("");
    setEmail("");
    setPhone("");
    setExperienceYears(0);
    setRole("");
    setArea("");
    setEnglishLevel("Basic");
    setRequirements([]);
    setSkills([]);
    setError(null);
  };

  const handleManagerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/managers");
      const managers = await res.json();
      const found = managers.find(
        (m: any) => m.email === managerEmail && m.password === managerPassword
      );
      if (found) {
        setError(null);
        setIsManager(true);
      } else {
        setError("אימייל או סיסמה שגויים");
        setIsManager(false);
        setCandidates([]);
      }
    } catch {
      setError("שגיאה בשרת");
      setIsManager(false);
      setCandidates([]);
    }
  };

  // צ'קבוקס לדרישות/כישורים
  const handleCheckboxChange = (
    value: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (list.includes(value)) {
      setter(list.filter((v) => v !== value));
    } else {
      setter([...list, value]);
    }
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
        <h2 style={{ textAlign: "center", color: "#222", fontSize: 32, marginBottom: 24, fontWeight: "bold" }}>
          הוסף מועמד
        </h2>
        <form
          onSubmit={editingCandidate ? handleUpdate : handleAdd}
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
            placeholder="שם"
            value={name}
            onChange={e => setName(e.target.value)}
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
            placeholder="אימייל"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
            placeholder="טלפון"
            value={phone}
            onChange={e => setPhone(e.target.value)}
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
            placeholder="שנות ניסיון"
            type="number"
            value={experienceYears}
            onChange={e => setExperienceYears(Number(e.target.value))}
            style={{
              flex: 1,
              padding: "6px 8px",
              borderRadius: 6,
              border: "1px solid #bbb",
              fontSize: 15,
              minWidth: 100
            }}
          />
          <input
            placeholder="תפקיד"
            value={role}
            onChange={e => setRole(e.target.value)}
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
            placeholder="אזור"
            value={area}
            onChange={e => setArea(e.target.value)}
            style={{
              flex: 1,
              padding: "6px 8px",
              borderRadius: 6,
              border: "1px solid #bbb",
              fontSize: 15,
              minWidth: 120
            }}
          />

          <div style={{ width: "100%", textAlign: "right", margin: "8px 0 0 0", fontWeight: "bold", color: "#1976d2" }}>
            בחר אילו דרישות יש לך:
          </div>
          <div style={{ flex: 2, minWidth: 180, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {REQUIREMENTS_OPTIONS.map(opt => (
              <label key={opt} style={{ display: "flex", alignItems: "center", minWidth: 120 }}>
                <input
                  type="checkbox"
                  checked={requirements.includes(opt)}
                  onChange={() => handleCheckboxChange(opt, requirements, setRequirements)}
                  style={{ marginLeft: 6 }}
                />
                {opt}
              </label>
            ))}
          </div>

          <div style={{ width: "100%", textAlign: "right", margin: "8px 0 0 0", fontWeight: "bold", color: "#388e3c" }}>
            בחר אילו כישורים יש לך:
          </div>
          <div style={{ flex: 2, minWidth: 180, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {SKILLS_OPTIONS.map(opt => (
              <label key={opt} style={{ display: "flex", alignItems: "center", minWidth: 120 }}>
                <input
                  type="checkbox"
                  checked={skills.includes(opt)}
                  onChange={() => handleCheckboxChange(opt, skills, setSkills)}
                  style={{ marginLeft: 6 }}
                />
                {opt}
              </label>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 100 }}>
            <select
              value={englishLevel}
              onChange={e => setEnglishLevel(e.target.value)}
              style={{
                padding: "6px 8px",
                borderRadius: 6,
                border: "1px solid #bbb",
                fontSize: 15,
                background: "#fff",
                marginBottom: 2
              }}
            >
              <option value="Basic">רמת אנגלית: בסיסית</option>
              <option value="Intermediate">רמת אנגלית: בינונית</option>
              <option value="Fluent">רמת אנגלית: שוטפת</option>
              <option value="Native">רמת אנגלית: שפת אם</option>
            </select>
          </div>
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
            {editingCandidate ? "עדכן" : "הוסף"}
          </button>
          {editingCandidate && (
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

        {!isManager && (
          <form
            onSubmit={handleManagerLogin}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              marginBottom: 24,
              background: "#fff",
              borderRadius: 8,
              padding: 16,
              boxShadow: "0 1px 3px #0001",
              maxWidth: 350,
              margin: "0 auto"
            }}
          >
            <h3 style={{ margin: 0, color: "#1976d2", textAlign: "center" }}>התחברות מנהל</h3>
            <input
              placeholder="אימייל"
              value={managerEmail}
              onChange={e => setManagerEmail(e.target.value)}
              style={{
                padding: "6px 8px",
                borderRadius: 6,
                border: "1px solid #bbb",
                fontSize: 15,
              }}
            />
            <input
              placeholder="סיסמה"
              type="password"
              value={managerPassword}
              onChange={e => setManagerPassword(e.target.value)}
              style={{
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
              התחבר כמנהל
            </button>
          </form>
        )}

        {isManager && (
          <>
            <h2 style={{ textAlign: "center", color: "#ffd000", margin: "24px 0 16px 0", fontWeight: "bold" }}>
              רשימת מועמדים
            </h2>
            <ul style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              justifyContent: "center"
            }}>
              {candidates.map((c) => (
                <li
                  key={c.id}
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    marginBottom: 10,
                    padding: "18px 20px",
                    minWidth: 260,
                    maxWidth: 340,
                    boxShadow: "0 1px 3px #0002",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    fontSize: 16,
                    color: "#222"
                  }}
                >
                  <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>
                    {c.name}
                  </div>
                  <div style={{ marginBottom: 4 }}>
                    <span style={{ fontWeight: "bold" }}>אימייל:</span> {c.email}
                  </div>
                  {c.phone && (
                    <div style={{ marginBottom: 4 }}>
                      <span style={{ fontWeight: "bold" }}>טלפון:</span> {c.phone}
                    </div>
                  )}
                  <div style={{ marginBottom: 4 }}>
                    <span style={{ fontWeight: "bold" }}>שנות ניסיון:</span> {typeof c.experienceYears === "number" ? c.experienceYears : 0}
                  </div>
                  <div style={{ marginBottom: 4 }}>
                    <span style={{ fontWeight: "bold" }}>רמת אנגלית:</span> {c.englishLevel || "Basic"}
                  </div>
                  {c.role && (
                    <div style={{ marginBottom: 4 }}>
                      <span style={{ fontWeight: "bold" }}>תפקיד:</span> {c.role}
                    </div>
                  )}
                  {c.area && (
                    <div style={{ marginBottom: 4 }}>
                      <span style={{ fontWeight: "bold" }}>אזור:</span> {c.area}
                    </div>
                  )}
                  {c.requirements && c.requirements.length > 0 && (
                    <div style={{ marginBottom: 6 }}>
                      <span style={{ fontWeight: "bold", color: "#1976d2" }}>דרישות:</span>
                      <ul style={{ margin: "4px 0 0 0", paddingRight: 18 }}>
                        {c.requirements.map((req, idx) => (
                          <li key={idx} style={{ fontSize: 14 }}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {c.skills && c.skills.length > 0 && (
                    <div style={{ marginBottom: 6 }}>
                      <span style={{ fontWeight: "bold", color: "#388e3c" }}>כישורים:</span>
                      <ul style={{ margin: "4px 0 0 0", paddingRight: 18 }}>
                        {c.skills.map((skill, idx) => (
                          <li key={idx} style={{ fontSize: 14 }}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div style={{ marginTop: 10 }}>
                    <button
                      onClick={() => startEdit(c)}
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
                      onClick={() => handleDelete(c.id)}
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
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default CandidateList;