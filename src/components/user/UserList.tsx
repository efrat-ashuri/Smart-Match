import React, { useState, useEffect } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

const API_URL = "http://localhost:3001/users";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setUsers);
  }, []);

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
      body: JSON.stringify({ name, email, phone }),
    })
      .then((res) => res.json())
      .then(() => {
        setName("");
        setEmail("");
        setPhone("");
        fetch(API_URL)
          .then((res) => res.json())
          .then(setUsers);
      });
  };

  const handleDelete = (id: string) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setUsers(users.filter((u) => u.id !== id)));
  };

  const startEdit = (user: User) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone || "");
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    if (!name.trim() || !email.trim()) {
      setError("יש למלא שם ואימייל");
      return;
    }
    if (!isValidEmail(email)) {
      setError("אימייל לא תקין");
      return;
    }
    setError(null);
    fetch(`${API_URL}/${editingUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editingUser, name, email, phone }),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setUsers(
          users.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );
        setEditingUser(null);
        setName("");
        setEmail("");
        setPhone("");
      });
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setName("");
    setEmail("");
    setPhone("");
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
          ניהול משתמשים
        </h2>
        <form
          onSubmit={editingUser ? handleUpdate : handleAdd}
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
            {editingUser ? "עדכן" : "הוסף"}
          </button>
          {editingUser && (
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
          רשימת משתמשים
        </h2>
        <ul style={{
          listStyle: "none",
          padding: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          justifyContent: "center"
        }}>
          {users.map((u) => (
            <li
              key={u.id}
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
                {u.name}
              </div>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontWeight: "bold" }}>אימייל:</span> {u.email}
              </div>
              {u.phone && (
                <div style={{ marginBottom: 4 }}>
                  <span style={{ fontWeight: "bold" }}>טלפון:</span> {u.phone}
                </div>
              )}
              <div style={{ marginTop: 10 }}>
                <button
                  onClick={() => startEdit(u)}
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
                  onClick={() => handleDelete(u.id)}
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

export default UserList;