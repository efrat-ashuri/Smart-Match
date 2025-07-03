import { useState, FormEvent } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role") === "manager" ? "manager" : "candidate";

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const { name, email, password } = form;

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("יש למלא את כל השדות");
      return;
    }
    if (!isValidEmail(email)) {
      setError("אימייל לא תקין");
      return;
    }

    try {
      // בדוק אם האימייל כבר קיים
      const url = role === "manager"
        ? "http://localhost:5297/managers"
        : "http://localhost:5297/candidates";
      const res = await fetch(url);
      const users = await res.json();
      const exists = users.find((u: any) => u.email === email);
      if (exists) {
        setError("אימייל זה כבר קיים");
        return;
      }
      // צור משתמש חדש
      const body =
        role === "manager"
          ? { name, email, password, managerRole: "Manager" }
          : { name, email, password };
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      // מעבר אוטומטי להתחברות
      navigate("/auth/login");
    } catch {
      setError("שגיאה בשרת");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        maxWidth: 320,
        margin: "40px auto",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <h2>
        {role === "manager" ? "הרשמה למנהל חדש" : "הרשמה למועמד חדש"}
      </h2>
      <input
        name="name"
        placeholder={role === "manager" ? "שם מלא של המנהל" : "שם מלא"}
        value={form.name}
        onChange={onChange}
      />
      <input
        name="email"
        placeholder={role === "manager" ? "אימייל של המנהל" : "אימייל"}
        value={form.email}
        onChange={onChange}
        autoComplete="username"
      />
      <input
        name="password"
        type="password"
        placeholder={role === "manager" ? "סיסמה למנהל" : "סיסמה"}
        value={form.password}
        onChange={onChange}
        autoComplete="new-password"
      />
      {error && <div style={{ color: "red", fontSize: "0.9em" }}>{error}</div>}
      {/* <button type="submit">הרשם</button> */}
      <p style={{ marginTop: 10 }}>
        כבר רשום? <Link to="/auth/login">התחבר</Link>
      </p>
    </form>
  );
};

export default RegisterPage;