import { useState } from "react";
import { managerLogin } from "../services/manager.login";
import { useNavigate } from "react-router-dom";

const ManagerLoginPage = () => {
  const [form, setForm] = useState({ name: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");
  try {
    const manager = await managerLogin(form.name, form.password, "Manager");
    navigate("/homeManPage");
  } catch {
    setError("שם משתמש או סיסמה שגויים");
  }
};


  return (
    <form onSubmit={onSubmit}>
      <h2>התחברות מנהל</h2>
      <input
        name="name"
        placeholder="שם משתמש"
        value={form.name}
        onChange={onChange}
      />
      <input
        name="password"
        type="password"
        placeholder="סיסמה"
        value={form.password}
        onChange={onChange}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit">התחבר</button>
    </form>
  );
};

export default ManagerLoginPage;