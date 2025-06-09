import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserList from "./components/user/UserList";
import ManagerList from "./components/manager/ManagerList";
import CandidateList from "./components/candidate/CandidateList";
import SkillList from "./components/skills/SkillsList";
import RequirnmentList from "./components/requirnment/RequirnmentList";
import JobList from "./components/job/JobList";
import Navbar from "./components/NavLink";

const App: React.FC = () => (
  <BrowserRouter>
  <Navbar />
    <Routes>
      <Route path="/users" element={<UserList />} />
      <Route path="/skills" element={<SkillList />} />
      <Route path="/managers" element={<ManagerList />} />
      <Route path="/candidates" element={<CandidateList />} />
      <Route path="/requirnments" element={<RequirnmentList />} />
      <Route path="/jobs" element={<JobList />} />
      <Route path="*" element={<div>ברוכה הבאה! בחרי טבלה מהתפריט.</div>} />
    </Routes>
  </BrowserRouter>
);

export default App;