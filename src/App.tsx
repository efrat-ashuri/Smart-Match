import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserList from "./components/user/UserList";
import ManagerList from "./components/manager/ManagerList";
import CandidateList from "./components/candidate/CandidateList";
import SkillList from "./components/skills/SkillsList";
import RequirementList from "./components/requirnment/RequirnmentList";
import JobList from "./components/job/JobList";
import Navbar from "./components/NavLink";

type UserType = "none" | "manager" | "candidate";

const App: React.FC = () => {
  const [userType, setUserType] = useState<UserType>("none");
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [showRegister, setShowRegister] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const url =
      userType === "manager"
        ? "http://localhost:3001/managers"
        : "http://localhost:3001/candidates";
    try {
      const res = await fetch(url);
      const users = await res.json();
      const found = users.find(
        (u: any) => u.email === email && u.password === password
      );
      if (found) {
        setLoggedIn(true);
        setError(null);
      } else {
        setError("אימייל או סיסמה שגויים");
      }
    } catch {
      setError("שגיאה בשרת");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword) {
      setError("יש למלא את כל השדות");
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/candidates");
      const candidates = await res.json();
      const exists = candidates.find((c: any) => c.email === registerEmail);
      if (exists) {
        setError("אימייל זה כבר קיים");
        return;
      }
      await fetch("http://localhost:3001/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
        }),
      });
      setEmail(registerEmail);
      setPassword(registerPassword);
      setShowRegister(false);
      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");
      setError(null);
      setLoggedIn(true);
    } catch {
      setError("שגיאה בשרת");
    }
  };

  if (userType === "none") {
    return (
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <h2>כניסת מנהל</h2>
        <button onClick={() => setUserType("manager")}>כניסת מנהל</button>
        <h2 style={{ marginTop: 30 }}>כניסת מועמד</h2>
        <button onClick={() => setUserType("candidate")}>כניסת מועמד</button>
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <h2>{userType === "manager" ? "התחברות מנהל" : "התחברות מועמד"}</h2>
        {!showRegister ? (
          <>
            <form onSubmit={handleLogin} style={{ display: "inline-block", marginTop: 20 }}>
              <input
                placeholder="אימייל"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={inputStyle}
              />
              <input
                placeholder="סיסמה"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={inputStyle}
              />
              <button type="submit" style={buttonStyle}>התחבר</button>
            </form>
            {userType === "candidate" && (
              <div style={{ marginTop: 20 }}>
                <button onClick={() => setShowRegister(true)}>מועמד חדש? לחץ להרשמה</button>
              </div>
            )}
          </>
        ) : (
          <form onSubmit={handleRegister} style={{ display: "inline-block", marginTop: 20 }}>
            <input
              placeholder="שם מלא"
              value={registerName}
              onChange={e => setRegisterName(e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="אימייל"
              value={registerEmail}
              onChange={e => setRegisterEmail(e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="סיסמה"
              type="password"
              value={registerPassword}
              onChange={e => setRegisterPassword(e.target.value)}
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>הרשמה</button>
            <div style={{ marginTop: 10 }}>
              <button type="button" onClick={() => { setShowRegister(false); setError(null); }}>
                חזרה להתחברות
              </button>
            </div>
          </form>
        )}
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
        <div style={{ marginTop: 20 }}>
          <button onClick={() => {
            setUserType("none");
            setEmail("");
            setPassword("");
            setError(null);
            setShowRegister(false);
          }}>חזרה</button>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar userType={userType} setUserType={() => {
        setUserType("none");
        setLoggedIn(false);
        setEmail("");
        setPassword("");
      }} />
      <Routes>
        {userType === "manager" && (
          <>
            <Route path="/users" element={<UserList />} />
            <Route path="/skills" element={<SkillList isManager={true} />} />
            <Route path="/managers" element={<ManagerList />} />
            <Route path="/candidates" element={<CandidateList />} />
            <Route path="/requirements" element={<RequirementList isManager={true} />} />
            <Route path="/jobs" element={<JobList isManager={true} />} />
          </>
        )}
        {userType === "candidate" && (
          <>
            <Route path="/candidates" element={<CandidateList />} />
            <Route path="/jobs" element={<JobList isManager={false} />} />
          </>
        )}
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <h1>דף הבית</h1>
              {userType === "manager" && (
                <>
                  <h2>מועמדים</h2>
                  <h2>דרישות</h2>
                  <h2>כישורים</h2>
                  <h2>משרות</h2>
                </>
              )}
              {userType === "candidate" && (
                <>
                  <h2>מועמדים</h2>
                  <h2>צפייה במשרות</h2>
                </>
              )}
              <button onClick={() => {
                setUserType("none");
                setLoggedIn(false);
                setEmail("");
                setPassword("");
              }}>התנתק</button>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

// עיצוב בסיסי
const inputStyle = {
  display: "block",
  margin: "10px auto",
  padding: 8,
  borderRadius: 6,
  border: "1px solid #bbb",
};

const buttonStyle = {
  background: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "8px 18px",
  fontWeight: "bold",
  fontSize: 17,
  marginTop: 10,
};

export default App;
