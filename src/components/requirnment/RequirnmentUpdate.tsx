import React, { useState } from "react";

type Requirnment = {
  id: number;
  title: string;
  description: string;
};

type Props = {
  requirnment: Requirnment;
  onUpdate: (requirnment: Requirnment) => void;
  onCancel: () => void;
};

const RequirnmentUpdate: React.FC<Props> = ({ requirnment, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(requirnment.title);
  const [description, setDescription] = useState(requirnment.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ ...requirnment, title, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="כותרת"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="תיאור"
      />
      <button type="submit">עדכן</button>
      <button type="button" onClick={onCancel}>ביטול</button>
    </form>
  );
};

export default RequirnmentUpdate;