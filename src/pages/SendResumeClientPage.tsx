// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // type Requirement = { requirementId: number; description: string };
// // type Skill = { skillsId: number; name: string };

// // const SendResumeClientPage: React.FC = () => {
// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     experienceYears: 0,
// //     role: "",
// //     area: "",
// //     englishLevel: "Basic",
// //     selectedRequirements: [] as number[],
// //     selectedSkills: [] as number[],
// //   });

// //   const [requirements, setRequirements] = useState<Requirement[]>([]);
// //   const [skills, setSkills] = useState<Skill[]>([]);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const reqRes = await axios.get("http://localhost:5297/api/Requirement");
// //         const skillsRes = await axios.get("http://localhost:5297/api/Skills");
// //         setRequirements(reqRes.data);
// //         setSkills(skillsRes.data);
// //       } catch {
// //         setError("שגיאה בטעינת הנתונים מהשרת");
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   const isValidEmail = (email: string) =>
// //     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError("");

// //     // ולידציה
// //     if (!form.name.trim() || !form.email.trim()) {
// //       setError("יש למלא שם ואימייל");
// //       return;
// //     }
// //     if (!isValidEmail(form.email)) {
// //       setError("אימייל לא תקין");
// //       return;
// //     }

// //     const candidateToSend = {
// //       name: form.name,
// //       email: form.email,
// //       phone: form.phone,
// //       experienceYears: form.experienceYears,
// //       role: form.role,
// //       area: form.area,
// //       englishLevel: form.englishLevel,
// //       listRequirement: form.selectedRequirements.map((id) => {
// //         const req = requirements.find((r) => r.requirementId === id);
// //         return { requirementId: id, description: req?.description || "" };
// //       }),
// //       listSkills: form.selectedSkills.map((id) => {
// //         const skill = skills.find((s) => s.skillsId === id);
// //         return { skillsId: id, name: skill?.name || "", mark: 0 };
// //       }),
// //     };

// //     try {
// //       await axios.post("http://localhost:5297/api/Candidate", candidateToSend);
// //       alert("הקורות חיים נשלחו בהצלחה!");
// //       setForm({
// //         name: "",
// //         email: "",
// //         phone: "",
// //         experienceYears: 0,
// //         role: "",
// //         area: "",
// //         englishLevel: "Basic",
// //         selectedRequirements: [],
// //         selectedSkills: [],
// //       });
// //     } catch {
// //       setError("שגיאה בשליחת הקורות חיים לשרת");
// //     }
// //   };

// //   const handleMultiSelectChange = (
// //     e: React.ChangeEvent<HTMLSelectElement>,
// //     field: "selectedRequirements" | "selectedSkills"
// //   ) => {
// //     const selectedValues = Array.from(e.target.selectedOptions).map((opt) =>
// //       parseInt(opt.value)
// //     );
// //     setForm((prev) => ({ ...prev, [field]: selectedValues }));
// //   };

// //   return (
// //     <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
// //       <h2 style={{ textAlign: "center" }}>שלח קורות חיים</h2>
// //       <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
// //         <input
// //           placeholder="שם"
// //           value={form.name}
// //           onChange={(e) => setForm({ ...form, name: e.target.value })}
// //         />
// //         <input
// //           placeholder="אימייל"
// //           value={form.email}
// //           onChange={(e) => setForm({ ...form, email: e.target.value })}
// //         />
// //         <input
// //           placeholder="טלפון"
// //           value={form.phone}
// //           onChange={(e) => setForm({ ...form, phone: e.target.value })}
// //         />
// //         <input
// //           type="number"
// //           placeholder="שנות ניסיון"
// //           value={form.experienceYears}
// //           onChange={(e) => setForm({ ...form, experienceYears: +e.target.value })}
// //         />
// //         <input
// //           placeholder="תפקיד"
// //           value={form.role}
// //           onChange={(e) => setForm({ ...form, role: e.target.value })}
// //         />
// //         <input
// //           placeholder="אזור"
// //           value={form.area}
// //           onChange={(e) => setForm({ ...form, area: e.target.value })}
// //         />
// //         <select
// //           value={form.englishLevel}
// //           onChange={(e) => setForm({ ...form, englishLevel: e.target.value })}
// //         >
// //           <option value="Basic">Basic</option>
// //           <option value="Intermediate">Intermediate</option>
// //           <option value="Fluent">Fluent</option>
// //           <option value="Native">Native</option>
// //         </select>

// //         <label>בחר דרישות:</label>
// //         <select
// //           multiple
// //           value={form.selectedRequirements.map(String)}
// //           onChange={(e) => handleMultiSelectChange(e, "selectedRequirements")}
// //         >
// //           {requirements.map((r) => (
// //             <option key={r.requirementId} value={r.requirementId}>
// //               {r.description}
// //             </option>
// //           ))}
// //         </select>

// //         <label>בחר כישורים:</label>
// //         <select
// //           multiple
// //           value={form.selectedSkills.map(String)}
// //           onChange={(e) => handleMultiSelectChange(e, "selectedSkills")}
// //         >
// //           {skills.map((s) => (
// //             <option key={s.skillsId} value={s.skillsId}>
// //               {s.name}
// //             </option>
// //           ))}
// //         </select>

// //         {error && <div style={{ color: "red" }}>{error}</div>}
// //         <button type="submit">שלח קורות חיים</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default SendResumeClientPage;

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // type Requirement = { requirementId: number; description: string; advantageOrMust: string };
// // type Skill = { skillsId: number; name: string; mark: number };

// // const SendResumeClientPage: React.FC = () => {
// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     experienceYears: 0,
// //     role: "",
// //     area: "",
// //     englishLevel: "Basic",
// //     selectedRequirements: [] as number[],
// //     selectedSkills: [] as number[],
// //   });

// //   const [requirements, setRequirements] = useState<Requirement[]>([]);
// //   const [skills, setSkills] = useState<Skill[]>([]);
// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState("");

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const [reqRes, skillsRes] = await Promise.all([
// //           axios.get("http://localhost:5297/api/Requinment"),
// //           axios.get("http://localhost:5297/api/Skills"),
// //         ]);
// //         setRequirements(reqRes.data);
// //         setSkills(skillsRes.data);
// //       } catch {
// //         setError("שגיאה בטעינת הנתונים מהשרת");
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   const isValidEmail = (email: string) =>
// //     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

// //   const handleCheckboxChange = (id: number, field: "selectedRequirements" | "selectedSkills") => {
// //     setForm((prev) => {
// //       const selected = prev[field].includes(id)
// //         ? prev[field].filter((x) => x !== id)
// //         : [...prev[field], id];
// //       return { ...prev, [field]: selected };
// //     });
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError("");
// //     setSuccess("");

// //     if (!form.name.trim() || !form.email.trim()) {
// //       setError("יש למלא שם ואימייל");
// //       return;
// //     }

// //     if (!isValidEmail(form.email)) {
// //       setError("אימייל לא תקין");
// //       return;
// //     }

// //     const candidateToSend = {
// //       name: form.name,
// //       email: form.email,
// //       phone: form.phone,
// //       experienceYears: form.experienceYears,
// //       role: form.role,
// //       area: form.area,
// //       englishLevel: form.englishLevel,
// //       listRequirement: form.selectedRequirements.map((id) => {
// //         const req = requirements.find((r) => r.requirementId === id);
// //         return {
// //           requirementId: id,
// //           description: req?.description || "",
// //           advantageOrMust: req?.advantageOrMust || "",
// //         };
// //       }),
// //       listSkills: form.selectedSkills.map((id) => {
// //         const skill = skills.find((s) => s.skillsId === id);
// //         return {
// //           skillsId: id,
// //           name: skill?.name || "",
// //           mark: skill?.mark ?? 0,
// //         };
// //       }),
// //     };

// //     try {
// //       const token = localStorage.getItem("token");
// //       await axios.post("http://localhost:5297/api/Candidate", candidateToSend, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       setSuccess("הקורות חיים נשלחו בהצלחה!");
// //       setForm({
// //         name: "",
// //         email: "",
// //         phone: "",
// //         experienceYears: 0,
// //         role: "",
// //         area: "",
// //         englishLevel: "Basic",
// //         selectedRequirements: [],
// //         selectedSkills: [],
// //       });
// //     } catch {
// //       setError("שגיאה בשליחת הקורות חיים לשרת");
// //     }
// //   };

// //   return (
// //     <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
// //       <h2 style={{ textAlign: "center" }}>שלח קורות חיים</h2>
// //       <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
// //         <input placeholder="שם" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
// //         <input placeholder="אימייל" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
// //         <input placeholder="טלפון" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
// //         <input type="number" placeholder="שנות ניסיון" value={form.experienceYears} onChange={(e) => setForm({ ...form, experienceYears: +e.target.value })} />
// //         <input placeholder="תפקיד" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
// //         <input placeholder="אזור" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} />
// //         <select value={form.englishLevel} onChange={(e) => setForm({ ...form, englishLevel: e.target.value })}>
// //           <option value="Basic">Basic</option>
// //           <option value="Intermediate">Intermediate</option>
// //           <option value="Fluent">Fluent</option>
// //           <option value="Native">Native</option>
// //         </select>

// //         <label>בחר דרישות:</label>
// //         <div>
// //           {requirements.map((r) => (
// //             <label key={r.requirementId} style={{ display: "block" }}>
// //               <input
// //                 type="checkbox"
// //                 checked={form.selectedRequirements.includes(r.requirementId)}
// //                 onChange={() => handleCheckboxChange(r.requirementId, "selectedRequirements")}
// //               />
// //               {r.description}
// //             </label>
// //           ))}
// //         </div>

// //         <label>בחר כישורים:</label>
// //         <div>
// //           {skills.map((s) => (
// //             <label key={s.skillsId} style={{ display: "block" }}>
// //               <input
// //                 type="checkbox"
// //                 checked={form.selectedSkills.includes(s.skillsId)}
// //                 onChange={() => handleCheckboxChange(s.skillsId, "selectedSkills")}
// //               />
// //               {s.name}
// //             </label>
// //           ))}
// //         </div>

// //         {error && <div style={{ color: "red" }}>{error}</div>}
// //         {success && <div style={{ color: "green" }}>{success}</div>}

// //         <button type="submit">שלח קורות חיים</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default SendResumeClientPage;


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// type Requirement = { requirementId: number; description: string; advantageOrMust: string };
// type Skill = { skillsId: number; name: string };
// type SkillWithMark = { skillsId: number; name: string; mark: number };

// const SendResumeClientPage: React.FC = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     experienceYears: 0,
//     role: "",
//     area: "",
//     englishLevel: "Basic",
//     selectedRequirements: [] as number[],
//     selectedSkills: [] as SkillWithMark[],
//   });

//   const [requirements, setRequirements] = useState<Requirement[]>([]);
//   const [skills, setSkills] = useState<Skill[]>([]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [reqRes, skillsRes] = await Promise.all([
//           axios.get("http://localhost:5297/api/Requinment"),
//           axios.get("http://localhost:5297/api/Skills"),
//         ]);
//         setRequirements(reqRes.data);
//         setSkills(skillsRes.data);
//       } catch {
//         setError("שגיאה בטעינת הנתונים מהשרת");
//       }
//     };
//     fetchData();
//   }, []);

//   const isValidEmail = (email: string) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

//   const handleRequirementToggle = (id: number) => {
//     setForm((prev) => {
//       const selected = prev.selectedRequirements.includes(id)
//         ? prev.selectedRequirements.filter((x) => x !== id)
//         : [...prev.selectedRequirements, id];
//       return { ...prev, selectedRequirements: selected };
//     });
//   };

//   const handleSkillToggle = (skill: Skill) => {
//     setForm((prev) => {
//       const exists = prev.selectedSkills.find((s) => s.skillsId === skill.skillsId);
//       if (exists) {
//         return {
//           ...prev,
//           selectedSkills: prev.selectedSkills.filter((s) => s.skillsId !== skill.skillsId),
//         };
//       } else {
//         return {
//           ...prev,
//           selectedSkills: [...prev.selectedSkills, { ...skill, mark: 0 }],
//         };
//       }
//     });
//   };

//   const updateSkillMark = (skillsId: number, mark: number) => {
//     setForm((prev) => ({
//       ...prev,
//       selectedSkills: prev.selectedSkills.map((s) =>
//         s.skillsId === skillsId ? { ...s, mark } : s
//       ),
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!form.name.trim() || !form.email.trim()) {
//       setError("יש למלא שם ואימייל");
//       return;
//     }

//     if (!isValidEmail(form.email)) {
//       setError("אימייל לא תקין");
//       return;
//     }

//     const candidateToSend = {
//       name: form.name,
//       email: form.email,
//       phone: form.phone,
//       experienceYears: form.experienceYears,
//       role: form.role,
//       area: form.area,
//       englishLevel: form.englishLevel,
//       listRequirement: form.selectedRequirements.map((id) => {
//         const req = requirements.find((r) => r.requirementId === id);
//         return {
//           requirementId: id,
//           description: req?.description || "",
//           advantageOrMust: req?.advantageOrMust || "",
//         };
//       }),
//       listSkills: form.selectedSkills,
//     };

//     try {
//       const token = localStorage.getItem("token");
//       await axios.post("http://localhost:5297/api/Candidate", candidateToSend, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setSuccess("הקורות חיים נשלחו בהצלחה!");
//       setForm({
//         name: "",
//         email: "",
//         phone: "",
//         experienceYears: 0,
//         role: "",
//         area: "",
//         englishLevel: "Basic",
//         selectedRequirements: [],
//         selectedSkills: [],
//       });
//     } catch {
//       setError("שגיאה בשליחת הקורות חיים לשרת");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
//       <h2 style={{ textAlign: "center" }}>שלח קורות חיים</h2>
//       <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//         <input placeholder="שם" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
//         <input placeholder="אימייל" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
//         <input placeholder="טלפון" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
//         <input type="number" placeholder="שנות ניסיון" value={form.experienceYears} onChange={(e) => setForm({ ...form, experienceYears: +e.target.value })} />
//         <input placeholder="תפקיד" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
//         <input placeholder="אזור" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} />
//         <select value={form.englishLevel} onChange={(e) => setForm({ ...form, englishLevel: e.target.value })}>
//           <option value="Basic">Basic</option>
//           <option value="Intermediate">Intermediate</option>
//           <option value="Fluent">Fluent</option>
//           <option value="Native">Native</option>
//         </select>

//         <label>בחר דרישות:</label>
//         <div>
//           {requirements.map((r) => (
//             <label key={r.requirementId} style={{ display: "block" }}>
//               <input
//                 type="checkbox"
//                 checked={form.selectedRequirements.includes(r.requirementId)}
//                 onChange={() => handleRequirementToggle(r.requirementId)}
//               />
//               {r.description}
//             </label>
//           ))}
//         </div>

//         <label>בחר כישורים והכנס ציון:</label>
//         <div>
//           {skills.map((s) => {
//             const selected = form.selectedSkills.find((x) => x.skillsId === s.skillsId);
//             return (
//               <div key={s.skillsId} style={{ marginBottom: 8 }}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={!!selected}
//                     onChange={() => handleSkillToggle(s)}
//                   />
//                   {s.name}
//                 </label>
//                 {selected && (
//                   <input
//                     type="number"
//                     value={selected.mark}
//                     min={0}
//                     max={100}
//                     onChange={(e) => updateSkillMark(s.skillsId, +e.target.value)}
//                     placeholder="ציון"
//                     style={{ marginRight: 8 }}
//                   />
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         {error && <div style={{ color: "red" }}>{error}</div>}
//         {success && <div style={{ color: "green" }}>{success}</div>}

//         <button type="submit">שלח קורות חיים</button>
//       </form>
//     </div>
//   );
// };

// export default SendResumeClientPage;
import React, { useEffect, useState } from "react";
import axios from "axios";

type Requirement = { requirementId: number; description: string; advantageOrMust: string };
type Skill = { skillsId: number; name: string };
type SelectedSkill = { skillsId: number; name: string; mark: number };

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
    selectedSkills: [] as SelectedSkill[],
  });

  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillSearch, setSkillSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reqRes, skillsRes] = await Promise.all([
          axios.get("http://localhost:5297/api/Requinment"),
          axios.get("http://localhost:5297/api/Skills"),
        ]);
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

  const handleRequirementChange = (id: number) => {
    setForm((prev) => {
      const selected = prev.selectedRequirements.includes(id)
        ? prev.selectedRequirements.filter((x) => x !== id)
        : [...prev.selectedRequirements, id];
      return { ...prev, selectedRequirements: selected };
    });
  };

  const handleSkillCheckbox = (skill: Skill) => {
    setForm((prev) => {
      const exists = prev.selectedSkills.find((s) => s.skillsId === skill.skillsId);
      const updatedSkills = exists
        ? prev.selectedSkills.filter((s) => s.skillsId !== skill.skillsId)
        : [...prev.selectedSkills, { skillsId: skill.skillsId, name: skill.name, mark: 0 }];
      return { ...prev, selectedSkills: updatedSkills };
    });
  };

  const handleSkillMarkChange = (id: number, mark: number) => {
    setForm((prev) => {
      const updatedSkills = prev.selectedSkills.map((s) =>
        s.skillsId === id ? { ...s, mark } : s
      );
      return { ...prev, selectedSkills: updatedSkills };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

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
        return {
          requirementId: id,
          description: req?.description || "",
          advantageOrMust: req?.advantageOrMust || "",
        };
      }),
      listSkills: form.selectedSkills,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5297/api/Candidate", candidateToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("הקורות חיים נשלחו בהצלחה!");
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

  const filteredSkills = skills.filter((s) =>
    s.name.toLowerCase().includes(skillSearch.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>שלח קורות חיים</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input placeholder="שם" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="אימייל" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="טלפון" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input type="number" placeholder="שנות ניסיון" value={form.experienceYears} onChange={(e) => setForm({ ...form, experienceYears: +e.target.value })} />
        <input placeholder="תפקיד" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
        <input placeholder="אזור" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} />
        <select value={form.englishLevel} onChange={(e) => setForm({ ...form, englishLevel: e.target.value })}>
          <option value="Basic">Basic</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Fluent">Fluent</option>
          <option value="Native">Native</option>
        </select>

        <label>בחר דרישות:</label>
        <div>
          {requirements.map((r) => (
            <label key={r.requirementId} style={{ display: "block" }}>
              <input
                type="checkbox"
                checked={form.selectedRequirements.includes(r.requirementId)}
                onChange={() => handleRequirementChange(r.requirementId)}
              />
              {r.description}
            </label>
          ))}
        </div>

        <label> בחר כישורים מתאימים והכנס ציון :</label>
        <input
          type="text"
          placeholder="🔍 חפש כישור..."
          value={skillSearch}
          onChange={(e) => setSkillSearch(e.target.value)}
          style={{ padding: "6px", borderRadius: "6px", marginBottom: "10px" }}
        />

        <div>
          {filteredSkills.map((s) => {
            const selected = form.selectedSkills.find((sk) => sk.skillsId === s.skillsId);
            return (
              <div key={s.skillsId} style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
                <input
                  type="checkbox"
                  checked={!!selected}
                  onChange={() => handleSkillCheckbox(s)}
                  style={{ marginRight: "8px" }}
                />
                <span style={{ flex: 1 }}>{s.name}</span>
                {selected && (
                  <input
                    type="number"
                    placeholder="ציון"
                    value={selected.mark}
                    onChange={(e) => handleSkillMarkChange(s.skillsId, +e.target.value)}
                    style={{ width: "80px", marginRight: "10px" }}
                    min={0}
                    max={100}
                  />
                )}
              </div>
            );
          })}
        </div>

        {error && <div style={{ color: "red" }}>{error}</div>}
        {success && <div style={{ color: "green" }}>{success}</div>}

        <button type="submit">שלח קורות חיים</button>
      </form>
    </div>
  );
};

export default SendResumeClientPage;
