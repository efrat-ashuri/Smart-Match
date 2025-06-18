// import { FormEvent, useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { login } from "../services/auth.service";
// import { setSession } from "../auth/auth.utils";
// import { useAppDispatch } from "../redux/store";
// import { setAuth } from "../redux/auth/auth.slice";
// import { RoleType } from "../types/user.types";
// import { Paths } from "../routes/paths";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useAppDispatch();
//   const [error, setError] = useState("");

//   const [form, setForm] = useState({
//     name: "",
//     password: "",
//     role: "candidate", // ברירת מחדל - מועמד
//   });

//   // קריאה ל-role מה-URL
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const urlRole = params.get("role");
//     if (urlRole === "manager" || urlRole === "candidate") {
//       setForm((prev) => ({ ...prev, role: urlRole }));
//     }
//   }, [location.search]);

//   const onChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setError("");

//     const { name, password, role } = form;
//     console.log("Submitting form with role:", role); // לוג לדיבוג

//     if (!name.trim() || !password) {
//       setError("אנא מלא את כל השדות");
//       return;
//     }

//     try {
//       console.log("Calling login with role:", role); // לוג לדיבוג
//       const token = await login(form.name, form.password, role);
//       console.log("Login response token:", token); // לוג לדיבוג
//       setSession(token);

//       const user = {
//         id: 1,
//         name,
//         role: role === "manager" ? RoleType.Admin : RoleType.User,
//         phone: "",
//         address: "",
//       };

//       console.log("Created user object:", user); // לוג לדיבוג
//       dispatch(setAuth(user));
      
//       // בדיקה מפורשת של סוג המשתמש
//       if (role === "manager") {
//         console.log("ניווט למנהל");
//         navigate(`/${Paths.home}`);
//       } else if (role === "candidate") {
//         console.log("ניווט למועמד");
//         navigate(`/${Paths.homeClient}`);
//       } else {
//         console.error("Unknown role:", role);
//         setError("שגיאה: תפקיד לא ידוע");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("שם משתמש או סיסמה שגויים");
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmit}
//       style={{
//         maxWidth: 300,
//         margin: "0 auto",
//         display: "flex",
//         flexDirection: "column",
//         gap: 10,
//       }}
//     >
//       <h2>התחברות</h2>

//       <input
//         name="name"
//         placeholder="שם משתמש"
//         value={form.name}
//         onChange={onChange}
//         autoComplete="username"
//       />

//       <input
//         name="password"
//         type="password"
//         placeholder="סיסמה"
//         value={form.password}
//         onChange={onChange}
//         autoComplete="current-password"
//       />

//       <label>בחר תפקיד:</label>
//       <select name="role" value={form.role} onChange={onChange}>
//         <option value="candidate">מועמד</option>
//         <option value="manager">מנהל</option>
//       </select>

//       {error && <div style={{ color: "red", fontSize: "0.9em" }}>{error}</div>}

//       <button type="submit">התחבר</button>

//       <p style={{ marginTop: 10 }}>
//         עדיין לא רשום?{" "}
//         <Link to={`/${Paths.auth}/${Paths.register}`}>הרשם</Link>
//       </p>
//       <p style={{ marginTop: 10 }}>
//         מנהל?{" "}
//         <Link to={`/${Paths.auth}/manager-login`}>התחברות מנהל</Link>
//       </p>
//     </form>
//   );
// };

// export default LoginPage;

import { FormEvent, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../services/auth.service";
import { setSession, jwtDecode } from "../auth/auth.utils";
import { useAppDispatch } from "../redux/store";
import { setAuth } from "../redux/auth/auth.slice";
import { RoleType } from "../types/user.types";
import { Paths } from "../routes/paths";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    password: "",
    role: "candidate",
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlRole = params.get("role");
    if (urlRole === "manager" || urlRole === "candidate") {
      setForm((prev) => ({ ...prev, role: urlRole }));
    }
  }, [location.search]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const mapRoleFromServer = (roleClaim: string): RoleType => {
    switch (roleClaim.toLowerCase()) {
      case "manager":
        return RoleType.Admin;
      case "candidate":
        return RoleType.User;
      default:
        return RoleType.User;
    }
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
      const token = await login(name, password, role);
      setSession(token);

      const decoded = jwtDecode(token);
      const roleClaim = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      const user = {
        id: 1,
        name: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"] || name,
        role: mapRoleFromServer(roleClaim),
        phone: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/postalcode"] || "",
        address: "",
        email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || "",
      };

      dispatch(setAuth(user));

      if (user.role === RoleType.Admin) {
        navigate(`/${Paths.home}`);
      } else {
        navigate(`/${Paths.homeClient}`);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("שם משתמש או סיסמה שגויים");
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 300, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}>
      <h2>התחברות</h2>

      <input name="name" placeholder="שם משתמש" value={form.name} onChange={onChange} autoComplete="username" />

      <input name="password" type="password" placeholder="סיסמה" value={form.password} onChange={onChange} autoComplete="current-password" />

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
