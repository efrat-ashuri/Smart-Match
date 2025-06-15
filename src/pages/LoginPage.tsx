import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";
import { setSession } from "../auth/auth.utils";
import { useAppDispatch } from "../redux/store";
import { setAuth } from "../redux/auth/auth.slice";
import { RoleType } from "../types/user.types";
import { Paths } from "../routes/paths";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    password: "",
    role: "candidate", // ברירת מחדל: מועמד
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const { name, password, role } = form;

    if (!name.trim() || !password) {
      setError("אנא מלא את כל השדות");
      return;
    }

    try {
      const token = await login(name.trim(), password, role);
      setSession(token);

      // קביעת ה-role לפי הבחירה בטופס
      const user = {
        id: 1,
        name,
        role: role === "manager" ? RoleType.Admin : RoleType.User,
        phone: "",
        address: "",
      };

      dispatch(setAuth(user));

      // ניווט לנתיב המתאים לפי role
      if (role === "manager") {
        navigate(`/${Paths.home}`); // לדף מנהל
      } else {
        navigate(`/${Paths.homeClient}`); // לדף מועמד
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("שם משתמש או סיסמה שגויים");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        maxWidth: 300,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <h2>התחברות</h2>

      <input
        name="name"
        placeholder="שם משתמש"
        value={form.name}
        onChange={onChange}
        autoComplete="username"
      />

      <input
        name="password"
        type="password"
        placeholder="סיסמה"
        value={form.password}
        onChange={onChange}
        autoComplete="current-password"
      />

      <label>בחר תפקיד:</label>
      <select name="role" value={form.role} onChange={onChange}>
        <option value="candidate">מועמד</option>
        <option value="manager">מנהל</option>
      </select>

      {error && <div style={{ color: "red", fontSize: "0.9em" }}>{error}</div>}

      <button type="submit">התחבר</button>

      <p style={{ marginTop: 10 }}>
        עדיין לא רשום? <Link to={`/${Paths.auth}/${Paths.register}`}>הרשם</Link>
      </p>
      <p style={{ marginTop: 10 }}>
        מנהל? <Link to={`/${Paths.auth}/manager-login`}>התחברות מנהל</Link>
      </p>
    </form>
  );
};

export default LoginPage;