import React, { useState } from "react";

type Props = {
  onAdd: (user: { username: string; email: string }) => void;
};

const UserAdd: React.FC<Props> = ({ onAdd }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email) return;
    onAdd({ username, email });
    setUsername("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="שם משתמש"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="אימייל"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">הוסף</button>
    </form>
  );
};

export default UserAdd;