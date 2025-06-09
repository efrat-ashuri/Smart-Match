import React, { useState } from "react";

type Candidate = {
  id: number;
  name: string;
  email: string;
};

type Props = {
  candidate: Candidate;
  onUpdate: (candidate: Candidate) => void;
  onCancel: () => void;
};

const CandidateUpdate: React.FC<Props> = ({ candidate, onUpdate, onCancel }) => {
  const [name, setName] = useState(candidate.name);
  const [email, setEmail] = useState(candidate.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ ...candidate, name, email });
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

export default CandidateUpdate;