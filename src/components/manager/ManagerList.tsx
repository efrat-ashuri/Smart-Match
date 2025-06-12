import React, { useState, useEffect } from "react";

type Manager = {
  id?: string;
  name: string;
  email: string;
  password: string;
  managerRole?: string;
};

const API_URL = "http://localhost:3001/managers";

const ManagerList: React.FC = () => {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editingManager, setEditingManager] = useState<Manager | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setManagers);
  }, []);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("יש למלא את כל השדות");
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
      body: JSON.stringify({ name, email, password, managerRole: "Manager" }),
    })
      .then((res) => res.json())
      .then(() => {
        setName("");
        setEmail("");
        setPassword("");
        fetch(API_URL)
          .then((res) => res.json())
          .then(setManagers);
      });
  };

  const handleDelete = (id?: string) => {
    if (!id) return;
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setManagers(managers.filter((m) => m.id !== id)));
  };

  const startEdit = (manager: Manager) => {
    setEditingManager(manager);
    setName(manager.name);
    setEmail(manager.email);
    setPassword(manager.password);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingManager || !editingManager.id) return;
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("יש למלא את כל השדות");
      return;
    }
    if (!isValidEmail(email)) {
      setError("אימייל לא תקין");
      return;
    }
    setError(null);
    fetch(`${API_URL}/${editingManager.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editingManager, name, email, password, managerRole: "Manager" }),
    })
      .then((res) => res.json())
      .then((updatedManager) => {
        setManagers(
          managers.map((m) => (m.id === updatedManager.id ? updatedManager : m))
        );
        setEditingManager(null);
        setName("");
        setEmail("");
        setPassword("");
      });
  };

  const cancelEdit = () => {
    setEditingManager(null);
    setName("");
    setEmail("");
    setPassword("");
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
          ניהול מנהלים
        </h2>
        <form
          onSubmit={editingManager ? handleUpdate : handleAdd}
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
            placeholder="סיסמה"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
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
            {editingManager ? "עדכן" : "הוסף"}
          </button>
          {editingManager && (
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
          <div style={{ color: "red", marginBottom: 12, textAlign: "right" }}>
            {error}
          </div>
        )}
        <h2 style={{ textAlign: "center", color: "#ffd000", margin: "24px 0 16px 0", fontWeight: "bold" }}>
          רשימת מנהלים
        </h2>
        <ul style={{
          listStyle: "none",
          padding: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          justifyContent: "center"
        }}>
          {managers.map((m) => (
            <li
              key={m.id}
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
                {m.name}
              </div>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontWeight: "bold" }}>אימייל:</span> {m.email}
              </div>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontWeight: "bold" }}>סיסמה:</span> {m.password}
              </div>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontWeight: "bold" }}>סוג משתמש:</span> {m.managerRole || "לא מוגדר"}
              </div>
              <div style={{ marginTop: 10 }}>
                <button
                  onClick={() => startEdit(m)}
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
                  onClick={() => handleDelete(m.id)}
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
      </div>
    </div>
  );
};

export default ManagerList;