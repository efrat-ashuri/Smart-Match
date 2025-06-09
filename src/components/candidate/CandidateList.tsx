import React, { useState, useEffect } from "react";

type Candidate = {
  id: number;
  name: string;
  email: string;
};

const API_URL = "http://localhost:3001/candidates";

const CandidateList: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setCandidates);
  }, []);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("יש להזין שם");
      return;
    }
    if (!email.trim()) {
      setError("יש להזין אימייל");
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
      body: JSON.stringify({ name, email }),
    })
      .then((res) => res.json())
      .then((newCandidate) => {
        setCandidates([...candidates, newCandidate]);
        setName("");
        setEmail("");
      });
  };

  const handleDelete = (id: number) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setCandidates(candidates.filter((c) => c.id !== id)));
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCandidate) return;
    if (!name.trim()) {
      setError("יש להזין שם");
      return;
    }
    if (!email.trim()) {
      setError("יש להזין אימייל");
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
      body: JSON.stringify({ ...editingCandidate, name, email }),
    })
      .then((res) => res.json())
      .then((updatedCandidate) => {
        setCandidates(candidates.map((c) => (c.id === updatedCandidate.id ? updatedCandidate : c)));
        setEditingCandidate(null);
        setName("");
        setEmail("");
      });
  };

  const startEdit = (candidate: Candidate) => {
    setEditingCandidate(candidate);
    setName(candidate.name);
    setEmail(candidate.email);
  };

  const cancelEdit = () => {
    setEditingCandidate(null);
    setName("");
    setEmail("");
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
      <h2 style={{ textAlign: "center", color: "#333" }}>רשימת מועמדים</h2>
      <form
        onSubmit={editingCandidate ? handleUpdate : handleAdd}
        style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}
      >
        <input
          placeholder="שם"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            flex: 1,
            padding: "6px 8px",
            borderRadius: 6,
            border: "1px solid #bbb",
            fontSize: 15,
          }}
        />
        <input
          placeholder="אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        {candidates.map((candidate) => (
          <li
            key={candidate.id}
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
              <b>{candidate.name}</b> <span style={{ color: "#888" }}>({candidate.email})</span>
            </span>
            <span>
              <button
                onClick={() => startEdit(candidate)}
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
                onClick={() => handleDelete(candidate.id)}
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

export default CandidateList;