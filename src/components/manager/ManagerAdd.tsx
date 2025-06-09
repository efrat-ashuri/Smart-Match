import React, { useState } from "react";

type Props = {
  onAdd: (manager: { name: string; email: string }) => void;
};

const ManagerAdd: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    onAdd({ name, email });
    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="שם"
        value={name}
        onChange={(e) => setName(e.target.value)}
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

export default ManagerAdd;