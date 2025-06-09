import React, { useState } from "react";

type Props = {
  onAdd: (requirnment: { title: string; description: string }) => void;
};

const RequirnmentAdd: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    onAdd({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="כותרת"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="תיאור"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">הוסף</button>
    </form>
  );
};

export default RequirnmentAdd;