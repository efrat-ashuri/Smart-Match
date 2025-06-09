import React, { useState } from "react";

type Skill = {
  id: number;
  name: string;
  level: string;
};

type Props = {
  skill: Skill;
  onUpdate: (skill: Skill) => void;
  onCancel: () => void;
};

const SkillUpdate: React.FC<Props> = ({ skill, onUpdate, onCancel }) => {
  const [name, setName] = useState(skill.name);
  const [level, setLevel] = useState(skill.level);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ ...skill, name, level });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="שם כישור"
      />
      <input
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        placeholder="רמה"
      />
      <button type="submit">עדכן</button>
      <button type="button" onClick={onCancel}>ביטול</button>
    </form>
  );
};

export default SkillUpdate;