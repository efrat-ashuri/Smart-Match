import React, { useState } from "react";

type User = {
  id: number;
  username: string;
  email: string;
};

type Props = {
  user: User;
  onUpdate: (user: User) => void;
  onCancel: () => void;
};

const UserUpdate: React.FC<Props> = ({ user, onUpdate, onCancel }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ ...user, username, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="שם משתמש"
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

export default UserUpdate;