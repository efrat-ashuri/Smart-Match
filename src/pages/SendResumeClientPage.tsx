import React, { useEffect, useState } from "react";
import axios from "axios";

type Requirement = { requirementId: number; description: string };
type Skill = { skillsId: number; name: string };

const SendResumeClientPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    experienceYears: 0,
    role: "",
    area: "",
    englishLevel: "Basic",
    selectedRequirements: [] as number[],
    selectedSkills: [] as number[],
  });

  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqRes = await axios.get("http://localhost:5297/api/Requirement");
        const skillsRes = await axios.get("http://localhost:5297/api/Skills");
        setRequirements(reqRes.data);
        setSkills(skillsRes.data);
      } catch {
        setError("שגיאה בטעינת הנתונים מהשרת");
      }
    };
    fetchData();
  }, []);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // ולידציה
    if (!form.name.trim() || !form.email.trim()) {
      setError("יש למלא שם ואימייל");
      return;
    }
    if (!isValidEmail(form.email)) {
      setError("אימייל לא תקין");
      return;
    }

    const candidateToSend = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      experienceYears: form.experienceYears,
      role: form.role,
      area: form.area,
      englishLevel: form.englishLevel,
      listRequirement: form.selectedRequirements.map((id) => {
        const req = requirements.find((r) => r.requirementId === id);
        return { requirementId: id, description: req?.description || "" };
      }),
      listSkills: form.selectedSkills.map((id) => {
        const skill = skills.find((s) => s.skillsId === id);
        return { skillsId: id, name: skill?.name || "", mark: 0 };
      }),
    };

    try {
      await axios.post("http://localhost:5297/api/Candidate", candidateToSend);
      alert("הקורות חיים נשלחו בהצלחה!");
      setForm({
        name: "",
        email: "",
        phone: "",
        experienceYears: 0,
        role: "",
        area: "",
        englishLevel: "Basic",
        selectedRequirements: [],
        selectedSkills: [],
      });
    } catch {
      setError("שגיאה בשליחת הקורות חיים לשרת");
    }
  };

  const handleMultiSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    field: "selectedRequirements" | "selectedSkills"
  ) => {
    const selectedValues = Array.from(e.target.selectedOptions).map((opt) =>
      parseInt(opt.value)
    );
    setForm((prev) => ({ ...prev, [field]: selectedValues }));
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>שלח קורות חיים</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          placeholder="שם"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="אימייל"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="טלפון"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          type="number"
          placeholder="שנות ניסיון"
          value={form.experienceYears}
          onChange={(e) => setForm({ ...form, experienceYears: +e.target.value })}
        />
        <input
          placeholder="תפקיד"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
        <input
          placeholder="אזור"
          value={form.area}
          onChange={(e) => setForm({ ...form, area: e.target.value })}
        />
        <select
          value={form.englishLevel}
          onChange={(e) => setForm({ ...form, englishLevel: e.target.value })}
        >
          <option value="Basic">Basic</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Fluent">Fluent</option>
          <option value="Native">Native</option>
        </select>

        <label>בחר דרישות:</label>
        <select
          multiple
          value={form.selectedRequirements.map(String)}
          onChange={(e) => handleMultiSelectChange(e, "selectedRequirements")}
        >
          {requirements.map((r) => (
            <option key={r.requirementId} value={r.requirementId}>
              {r.description}
            </option>
          ))}
        </select>

        <label>בחר כישורים:</label>
        <select
          multiple
          value={form.selectedSkills.map(String)}
          onChange={(e) => handleMultiSelectChange(e, "selectedSkills")}
        >
          {skills.map((s) => (
            <option key={s.skillsId} value={s.skillsId}>
              {s.name}
            </option>
          ))}
        </select>

        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">שלח קורות חיים</button>
      </form>
    </div>
  );
};

export default SendResumeClientPage;
