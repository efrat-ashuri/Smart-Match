import React, { useState, useEffect } from "react";

type User = {
  id: number;
  username: string;
  email: string;
};

const API_URL = "http://localhost:3001/users";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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
    if (!username.trim()) {
      setError("יש להזין שם משתמש");
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
      body: JSON.stringify({ username, email }),
    })
      .then((res) => res.json())
      .then((newUser) => {
        setUsers([...users, newUser]);
        setUsername("");
        setEmail("");
      });
  };

  const handleDelete = (id: number) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setUsers(users.filter((u) => u.id !== id)));
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    if (!username.trim()) {
      setError("יש להזין שם משתמש");
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
    fetch(`${API_URL}/${editingUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editingUser, username, email }),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
        setEditingUser(null);
        setUsername("");
        setEmail("");
      });
  };

  const startEdit = (user: User) => {
    setEditingUser(user);
    setUsername(user.username);
    setEmail(user.email);
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setUsername("");
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
      <h2 style={{ textAlign: "center", color: "#333" }}>רשימת משתמשים</h2>
      <form
        onSubmit={editingUser ? handleUpdate : handleAdd}
        style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}
      >
        <input
          placeholder="שם משתמש"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        {users.map((user) => (
          <li
            key={user.id}
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
              <b>{user.username}</b> <span style={{ color: "#888" }}>({user.email})</span>
            </span>
            <span>
              <button
                onClick={() => startEdit(user)}
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
                onClick={() => handleDelete(user.id)}
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

export default UserList;