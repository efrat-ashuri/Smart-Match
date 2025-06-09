import React, { useState } from "react";

type Props = {
  onAdd: (skill: { name: string; level: string }) => void;
};

const SkillAdd: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !level) return;
    onAdd({ name, level });
    setName("");
    setLevel("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="שם כישור"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="רמה"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      />
      <button type="submit">הוסף</button>
    </form>
  );
};

export default SkillAdd;