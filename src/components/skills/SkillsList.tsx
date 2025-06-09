import React, { useState, useEffect } from "react";

type Skill = {
  id: number;
  name: string;
  level: string;
};

const API_URL = "http://localhost:3001/skills";

const SkillsList: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setSkills);
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("יש להזין שם כישור");
      return;
    }
    if (!level.trim()) {
      setError("יש להזין רמה");
      return;
    }
    setError(null);
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, level }),
    })
      .then((res) => res.json())
      .then((newSkill) => {
        setSkills([...skills, newSkill]);
        setName("");
        setLevel("");
      });
  };

  const handleDelete = (id: number) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setSkills(skills.filter((s) => s.id !== id)));
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;
    if (!name.trim()) {
      setError("יש להזין שם כישור");
      return;
    }
    if (!level.trim()) {
      setError("יש להזין רמה");
      return;
    }
    setError(null);
    fetch(`${API_URL}/${editingSkill.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editingSkill, name, level }),
    })
      .then((res) => res.json())
      .then((updatedSkill) => {
        setSkills(skills.map((s) => (s.id === updatedSkill.id ? updatedSkill : s)));
        setEditingSkill(null);
        setName("");
        setLevel("");
      });
  };

  const startEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setName(skill.name);
    setLevel(skill.level);
  };

  const cancelEdit = () => {
    setEditingSkill(null);
    setName("");
    setLevel("");
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
      <h2 style={{ textAlign: "center", color: "#333" }}>רשימת כישורים</h2>
      <form
        onSubmit={editingSkill ? handleUpdate : handleAdd}
        style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}
      >
        <input
          placeholder="שם כישור"
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
          placeholder="רמה"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
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
          {editingSkill ? "עדכן" : "הוסף"}
        </button>
        {editingSkill && (
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
        {skills.map((skill) => (
          <li
            key={skill.id}
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
              <b>{skill.name}</b> <span style={{ color: "#888" }}>({skill.level})</span>
            </span>
            <span>
              <button
                onClick={() => startEdit(skill)}
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
                onClick={() => handleDelete(skill.id)}
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

export default SkillsList;