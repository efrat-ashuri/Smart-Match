import React, { useState } from "react";

type Manager = {
  id: number;
  name: string;
  email: string;
};

type Props = {
  manager: Manager;
  onUpdate: (manager: Manager) => void;
  onCancel: () => void;
};

const ManagerUpdate: React.FC<Props> = ({ manager, onUpdate, onCancel }) => {
  const [name, setName] = useState(manager.name);
  const [email, setEmail] = useState(manager.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ ...manager, name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="שם"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="אימייל"
      />
      <button type="submit">עדכן</button>
      <button type="button" onClick={onCancel}>ביטול</button>
    </form>
  );
};

export default ManagerUpdate;