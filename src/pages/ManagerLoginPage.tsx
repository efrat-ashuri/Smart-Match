// import { FormEvent, useState } from "react";
// import { managerLogin } from "../services/manager.login";
// import { useNavigate } from "react-router-dom";
// import { Paths } from "../routes/paths";
// import { setSession } from "../auth/auth.utils";
// import { useAppDispatch } from "../redux/store";
// import { setAuth } from "../redux/auth/auth.slice";
// import { RoleType } from "../types/user.types";

// const ManagerLoginPage = () => {
//   const [form, setForm] = useState({ name: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");

//     if (!form.name.trim() || !form.password) {
//       setError("אנא מלא את כל השדות");
//       return;
//     }

//     try {
//       const token = await managerLogin(form.name, form.password, "manager");
//       setSession(token);

//       const user = {
//         id: 1,
//         name: form.name,
//         role: RoleType.Admin,
//         phone: "",
//         address: "",
//       };

//       dispatch(setAuth(user));
//       navigate(`/${Paths.home}`);
//     } catch (err) {
//       console.error("Manager login error:", err);
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
//       <h2>התחברות מנהל</h2>
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
//       {error && <div style={{ color: "red", fontSize: "0.9em" }}>{error}</div>}
//       <button type="submit">התחבר</button>
//     </form>
//   );
// };

// export default ManagerLoginPage;