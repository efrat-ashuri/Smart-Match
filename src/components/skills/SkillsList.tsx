import React, { useState, useEffect } from "react";

type Skill = {
  id: string;
  name: string;
};

const API_URL = "http://localhost:5297/skills";

interface SkillsListProps {
  isManager: boolean;
}

const SkillsList: React.FC<SkillsListProps> = ({ isManager }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [name, setName] = useState("");
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setSkills);
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("יש למלא שם כישור");
      return;
    }
    setError(null);
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then(() => {
        setName("");
        fetch(API_URL)
          .then((res) => res.json())
          .then(setSkills);
      });
  };

  const handleDelete = (id: string) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setSkills(skills.filter((s) => s.id !== id)));
  };

  const startEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setName(skill.name);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;
    if (!name.trim()) {
      setError("יש למלא שם כישור");
      return;
    }
    setError(null);
    fetch(`${API_URL}/${editingSkill.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editingSkill, name }),
    })
      .then((res) => res.json())
      .then((updatedSkill) => {
        setSkills(
          skills.map((s) => (s.id === updatedSkill.id ? updatedSkill : s))
        );
        setEditingSkill(null);
        setName("");
      });
  };

  const cancelEdit = () => {
    setEditingSkill(null);
    setName("");
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
        <h2 style={{ textAlign: "center", color: "#222", fontSize: 32, marginBottom: 24, fontWeight: "bold" }}>
          ניהול כישורים
        </h2>
        {isManager && (
          <form
            onSubmit={editingSkill ? handleUpdate : handleAdd}
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
              placeholder="שם כישור"
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
                  minWidth: 80
                }}
              >
                ביטול
              </button>
            )}
          </form>
        )}
        {error && (
          <div style={{ color: "red", marginBottom: 12, textAlign: "right" }}>
            {error}
          </div>
        )}
        <h2 style={{ textAlign: "center", color: "#ffd000", margin: "24px 0 16px 0", fontWeight: "bold" }}>
          רשימת כישורים
        </h2>
        <ul style={{
          listStyle: "none",
          padding: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          justifyContent: "center"
        }}>
          {skills.map((s) => (
            <li
              key={s.id}
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
                {s.name}
              </div>
              {isManager && (
                <div style={{ marginTop: 10 }}>
                  <button
                    onClick={() => startEdit(s)}
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
                    onClick={() => handleDelete(s.id)}
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

export default SkillsList;