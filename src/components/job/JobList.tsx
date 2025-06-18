// // import React, { useState, useEffect } from "react";

// // type Job = {
// //   id: string;
// //   title: string;
// //   description: string;
// //   area: string;
// //   englishLevel: string;
// //   requirements?: { name: string }[];
// //   skills?: { name: string }[];
// // };

// // const API_URL = "http://localhost:5297/api/Job";

// // interface JobListProps {
// //   isManager: boolean;
// // }

// // const JobList: React.FC<JobListProps> = ({ isManager }) => {
// //   const [jobs, setJobs] = useState<Job[]>([]);
// //   const [editingJob, setEditingJob] = useState<Job | null>(null);
// //   const [title, setTitle] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [area, setArea] = useState("");
// //   const [englishLevel, setEnglishLevel] = useState("");
// //   const [requirements, setRequirements] = useState<string>("");
// //   const [skills, setSkills] = useState<string>("");
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     fetch(API_URL)
// //       .then(async (res) => {
// //         if (!res.ok) {
// //           const text = await res.text();
// //           throw new Error(`שגיאה בשרת: ${res.status} - ${text}`);
// //         }
// //         return res.json();
// //       })
// //       .then(setJobs)
// //       .catch((e) => setError(e.message));
// //   }, []);

// //   const handleAdd = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (
// //       !title.trim() ||
// //       !description.trim() ||
// //       !area.trim() ||
// //       !englishLevel.trim()
// //     ) {
// //       setError("יש למלא שם, תיאור, אזור ורמת אנגלית");
// //       return;
// //     }
// //     setError(null);

// //     const listSkills = skills
// //       .split(",")
// //       .map((s) => s.trim())
// //       .filter(Boolean)
// //       .map((name) => ({ name }));

// //     const listRequirement = requirements
// //       .split(",")
// //       .map((s) => s.trim())
// //       .filter(Boolean)
// //       .map((name) => ({ name }));

// //     fetch(API_URL, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({
// //         title,
// //         description,
// //         area,
// //         englishLevel,
// //         passingScore: 0, // אפשר לשנות לפי הצורך
// //         numCandidate: 0, // אפשר לשנות לפי הצורך
// //         listSkills,
// //         listRequirement,
// //         managerId: 1, // הכנסי מזהה מנהל תקין אם צריך
// //       }),
// //     })
// //       .then(async (res) => {
// //         if (!res.ok) {
// //           const text = await res.text();
// //           throw new Error(`שגיאה בשרת: ${res.status} - ${text}`);
// //         }
// //         return res.json();
// //       })
// //       .then(() => {
// //         setTitle("");
// //         setDescription("");
// //         setArea("");
// //         setEnglishLevel("");
// //         setRequirements("");
// //         setSkills("");
// //         setError("המשרה נוספה בהצלחה!");
// //         setTimeout(() => setError(null), 2000);
// //         return fetch(API_URL);
// //       })
// //       .then(async (res) => {
// //         if (!res.ok) {
// //           const text = await res.text();
// //           throw new Error(`שגיאה בשרת: ${res.status} - ${text}`);
// //         }
// //         return res.json();
// //       })
// //       .then(setJobs)
// //       .catch((e) => setError(e.message));
// //   };

// //   const handleDelete = (id: string) => {
// //     fetch(`${API_URL}/${id}`, { method: "DELETE" })
// //       .then(() => setJobs(jobs.filter((j) => j.id !== id)))
// //       .catch((e) => setError(e.message));
// //   };

// //   const handleUpdate = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!editingJob) return;
// //     if (
// //       !title.trim() ||
// //       !description.trim() ||
// //       !area.trim() ||
// //       !englishLevel.trim()
// //     ) {
// //       setError("יש למלא שם, תיאור, אזור ורמת אנגלית");
// //       return;
// //     }
// //     setError(null);

// //     const listSkills = skills
// //       .split(",")
// //       .map((s) => s.trim())
// //       .filter(Boolean)
// //       .map((name) => ({ name }));

// //     const listRequirement = requirements
// //       .split(",")
// //       .map((s) => s.trim())
// //       .filter(Boolean)
// //       .map((name) => ({ name }));

// //     fetch(`${API_URL}/${editingJob.id}`, {
// //       method: "PUT",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({
// //         ...editingJob,
// //         title,
// //         description,
// //         area,
// //         englishLevel,
// //         listSkills,
// //         listRequirement,
// //       }),
// //     })
// //       .then(async (res) => {
// //         if (!res.ok) {
// //           const text = await res.text();
// //           throw new Error(`שגיאה בשרת: ${res.status} - ${text}`);
// //         }
// //         return res.json();
// //       })
// //       .then((updatedJob) => {
// //         setJobs(jobs.map((j) => (j.id === updatedJob.id ? updatedJob : j)));
// //         setEditingJob(null);
// //         setTitle("");
// //         setDescription("");
// //         setArea("");
// //         setEnglishLevel("");
// //         setRequirements("");
// //         setSkills("");
// //       })
// //       .catch((e) => setError(e.message));
// //   };

// //   const startEdit = (job: Job) => {
// //     setEditingJob(job);
// //     setTitle(job.title || "");
// //     setDescription(job.description || "");
// //     setArea(job.area || "");
// //     setEnglishLevel(job.englishLevel || "");
// //     setRequirements(
// //       job.requirements ? job.requirements.map((r) => r.name).join(", ") : ""
// //     );
// //     setSkills(job.skills ? job.skills.map((s) => s.name).join(", ") : "");
// //     setError(null);
// //   };

// //   const cancelEdit = () => {
// //     setEditingJob(null);
// //     setTitle("");
// //     setDescription("");
// //     setArea("");
// //     setEnglishLevel("");
// //     setRequirements("");
// //     setSkills("");
// //     setError(null);
// //   };

// //   return (
// //     <div
// //       dir="rtl"
// //       style={{
// //         minHeight: "100vh",
// //         background: "#4978c9",
// //         padding: "0",
// //         fontFamily: "Arial, sans-serif",
// //       }}
// //     >
// //       <div
// //         style={{
// //           maxWidth: 900,
// //           margin: "40px auto",
// //           background: "#fff",
// //           borderRadius: 12,
// //           boxShadow: "0 2px 8px #0001",
// //           padding: 24,
// //         }}
// //       >
// //         {isManager && (
// //           <>
// //             <h2
// //               style={{
// //                 textAlign: "center",
// //                 color: "#222",
// //                 fontSize: 32,
// //                 marginBottom: 24,
// //                 fontWeight: "bold",
// //               }}
// //             >
// //               {editingJob ? "עדכן משרה" : "הוסף משרה"}
// //             </h2>
// //             <form
// //               onSubmit={editingJob ? handleUpdate : handleAdd}
// //               style={{
// //                 display: "flex",
// //                 gap: 8,
// //                 marginBottom: 24,
// //                 flexWrap: "wrap",
// //                 background: "#ffd000",
// //                 borderRadius: 8,
// //                 padding: 16,
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //               }}
// //             >
// //               <input
// //                 placeholder="שם משרה"
// //                 value={title}
// //                 onChange={(e) => setTitle(e.target.value)}
// //                 style={{
// //                   flex: 1,
// //                   padding: "6px 8px",
// //                   borderRadius: 6,
// //                   border: "1px solid #bbb",
// //                   fontSize: 15,
// //                   minWidth: 120,
// //                 }}
// //               />
// //               <input
// //                 placeholder="תיאור משרה"
// //                 value={description}
// //                 onChange={(e) => setDescription(e.target.value)}
// //                 style={{
// //                   flex: 2,
// //                   padding: "6px 8px",
// //                   borderRadius: 6,
// //                   border: "1px solid #bbb",
// //                   fontSize: 15,
// //                   minWidth: 180,
// //                 }}
// //               />
// //               <input
// //                 placeholder="אזור"
// //                 value={area}
// //                 onChange={(e) => setArea(e.target.value)}
// //                 style={{
// //                   flex: 1,
// //                   padding: "6px 8px",
// //                   borderRadius: 6,
// //                   border: "1px solid #bbb",
// //                   fontSize: 15,
// //                   minWidth: 120,
// //                 }}
// //               />
// //               <input
// //                 placeholder="רמת אנגלית"
// //                 value={englishLevel}
// //                 onChange={(e) => setEnglishLevel(e.target.value)}
// //                 style={{
// //                   flex: 1,
// //                   padding: "6px 8px",
// //                   borderRadius: 6,
// //                   border: "1px solid #bbb",
// //                   fontSize: 15,
// //                   minWidth: 120,
// //                 }}
// //               />
// //               <input
// //                 placeholder="דרישות (הפרד בפסיקים)"
// //                 value={requirements}
// //                 onChange={(e) => setRequirements(e.target.value)}
// //                 style={{
// //                   flex: 2,
// //                   padding: "6px 8px",
// //                   borderRadius: 6,
// //                   border: "1px solid #bbb",
// //                   fontSize: 15,
// //                   minWidth: 180,
// //                 }}
// //               />
// //               <input
// //                 placeholder="כישורים (הפרד בפסיקים)"
// //                 value={skills}
// //                 onChange={(e) => setSkills(e.target.value)}
// //                 style={{
// //                   flex: 2,
// //                   padding: "6px 8px",
// //                   borderRadius: 6,
// //                   border: "1px solid #bbb",
// //                   fontSize: 15,
// //                   minWidth: 180,
// //                 }}
// //               />
// //               <button
// //                 type="submit"
// //                 style={{
// //                   background: "#1976d2",
// //                   color: "#fff",
// //                   border: "none",
// //                   borderRadius: 6,
// //                   padding: "6px 16px",
// //                   cursor: "pointer",
// //                   fontWeight: "bold",
// //                   fontSize: 15,
// //                   minWidth: 80,
// //                 }}
// //               >
// //                 {editingJob ? "עדכן" : "הוסף"}
// //               </button>
// //               {editingJob && (
// //                 <button
// //                   type="button"
// //                   onClick={cancelEdit}
// //                   style={{
// //                     background: "#eee",
// //                     color: "#333",
// //                     border: "none",
// //                     borderRadius: 6,
// //                     padding: "6px 16px",
// //                     cursor: "pointer",
// //                     fontWeight: "bold",
// //                     fontSize: 15,
// //                     minWidth: 80,
// //                   }}
// //                 >
// //                   ביטול
// //                 </button>
// //               )}
// //             </form>
// //             {error && (
// //               <div
// //                 style={{
// //                   color: error.includes("הצלחה") ? "green" : "red",
// //                   marginBottom: 12,
// //                   textAlign: "right",
// //                 }}
// //               >
// //                 {error}
// //               </div>
// //             )}
// //           </>
// //         )}

// //         <h2
// //           style={{
// //             textAlign: "center",
// //             color: "#ffd000",
// //             margin: "24px 0 16px 0",
// //             fontWeight: "bold",
// //           }}
// //         >
// //           רשימת משרות
// //         </h2>
// //         <ul
// //           style={{
// //             listStyle: "none",
// //             padding: 0,
// //             display: "flex",
// //             flexWrap: "wrap",
// //             gap: 24,
// //             justifyContent: "center",
// //           }}
// //         >
// //           {jobs.map((job) => (
// //             <li
// //               key={job.id}
// //               style={{
// //                 background: "#ffd000",
// //                 borderRadius: 12,
// //                 marginBottom: 10,
// //                 padding: "18px 20px",
// //                 minWidth: 260,
// //                 maxWidth: 320,
// //                 boxShadow: "0 1px 3px #0002",
// //                 display: "flex",
// //                 flexDirection: "column",
// //                 alignItems: "flex-start",
// //                 fontSize: 16,
// //                 color: "#222",
// //               }}
// //             >
// //               <div
// //                 style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}
// //               >
// //                 {job.title}
// //               </div>
// //               <div style={{ marginBottom: 8 }}>{job.description}</div>
// //               <div style={{ marginBottom: 8 }}>
// //                 <span style={{ fontWeight: "bold" }}>אזור: </span> {job.area}
// //               </div>
// //               <div style={{ marginBottom: 8 }}>
// //                 <span style={{ fontWeight: "bold" }}>רמת אנגלית: </span>{" "}
// //                 {job.englishLevel}
// //               </div>
// //               {job.requirements && job.requirements.length > 0 && (
// //                 <div style={{ marginBottom: 6 }}>
// //                   <span style={{ fontWeight: "bold", color: "#1976d2" }}>
// //                     דרישות:
// //                   </span>
// //                   <ul style={{ margin: "4px 0 0 0", paddingRight: 18 }}>
// //                     {job.requirements.map((req, idx) => (
// //                       <li key={idx} style={{ fontSize: 14 }}>
// //                         {req.name}
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               )}
// //               {job.skills && job.skills.length > 0 && (
// //                 <div style={{ marginBottom: 6 }}>
// //                   <span style={{ fontWeight: "bold", color: "#388e3c" }}>
// //                     כישורים:
// //                   </span>
// //                   <ul style={{ margin: "4px 0 0 0", paddingRight: 18 }}>
// //                     {job.skills.map((skill, idx) => (
// //                       <li key={idx} style={{ fontSize: 14 }}>
// //                         {skill.name}
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               )}
// //               {isManager && (
// //                 <div style={{ marginTop: 10 }}>
// //                   <button
// //                     onClick={() => startEdit(job)}
// //                     style={{
// //                       background: "#ffc107",
// //                       color: "#333",
// //                       border: "none",
// //                       borderRadius: 6,
// //                       padding: "4px 10px",
// //                       marginLeft: 6,
// //                       cursor: "pointer",
// //                       fontWeight: "bold",
// //                     }}
// //                   >
// //                     עדכן
// //                   </button>
// //                   <button
// //                     onClick={() => handleDelete(job.id)}
// //                     style={{
// //                       background: "#e53935",
// //                       color: "#fff",
// //                       border: "none",
// //                       borderRadius: 6,
// //                       padding: "4px 10px",
// //                       cursor: "pointer",
// //                       fontWeight: "bold",
// //                     }}
// //                   >
// //                     מחק
// //                   </button>
// //                 </div>
// //               )}
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // export default JobList;
// import React, { useState, useEffect } from "react";

// type Job = {
//   id: number;
//   title: string;
//   description: string;
//   area: string;
//   englishLevel: string;
//   requirements?: { name: string }[];
//   skills?: { name: string }[];
// };

// const API_URL = "http://localhost:5297/api/Job";

// interface JobListProps {
//   isManager: boolean;
// }

// const JobList: React.FC<JobListProps> = ({ isManager }) => {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [editingJob, setEditingJob] = useState<Job | null>(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [area, setArea] = useState("");
//   const [englishLevel, setEnglishLevel] = useState("");
//   const [requirements, setRequirements] = useState<string>("");
//   const [skills, setSkills] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetch(API_URL)
//       .then(async (res) => {
//         if (!res.ok) {
//           const text = await res.text();
//           throw new Error(`\u05e9\u05d2\u05d9\u05d0\u05d4 \u05d1\u05e9\u05e8\u05ea: ${res.status} - ${text}`);
//         }
//         return res.json();
//       })
//       .then(setJobs)
//       .catch((e) => setError(e.message));
//   }, []);

//   const handleAdd = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title.trim() || !description.trim() || !area.trim() || !englishLevel.trim()) {
//       setError("יש למלא שם, תיאור, אזור ורמת אנגלית");
//       return;
//     }
//     setError(null);

//     const listSkills = skills.split(",").map((s) => s.trim()).filter(Boolean).map((name) => ({ name }));
//     const listRequirement = requirements.split(",").map((s) => s.trim()).filter(Boolean).map((name) => ({ name }));

//     fetch(API_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         title,
//         description,
//         area,
//         englishLevel,
//         passingScore: 0,
//         numCandidate: 0,
//         listSkills,
//         listRequirement,
//         managerId: 1,
//       }),
//     })
//       .then(async (res) => {
//         if (!res.ok) {
//           const text = await res.text();
//           throw new Error(`\u05e9\u05d2\u05d9\u05d0\u05d4 \u05d1\u05e9\u05e8\u05ea: ${res.status} - ${text}`);
//         }
//         return res.json();
//       })
//       .then(() => {
//         setTitle("");
//         setDescription("");
//         setArea("");
//         setEnglishLevel("");
//         setRequirements("");
//         setSkills("");
//         setError("המשרה נוספה בהצלחה!");
//         setTimeout(() => setError(null), 2000);
//         return fetch(API_URL);
//       })
//       .then(async (res) => {
//         if (!res.ok) {
//           const text = await res.text();
//           throw new Error(`\u05e9\u05d2\u05d9\u05d0\u05d4 \u05d1\u05e9\u05e8\u05ea: ${res.status} - ${text}`);
//         }
//         return res.json();
//       })
//       .then(setJobs)
//       .catch((e) => setError(e.message));
//   };

//   const handleDelete = (id: number) => {
//     if (!id) {
//       setError("שגיאה: מזהה משרה חסר");
//       return;
//     }

//     fetch(`${API_URL}/${id}`, { method: "DELETE" })
//       .then(() => setJobs(jobs.filter((j) => j.id !== id)))
//       .catch((e) => setError(e.message));
//   };

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingJob?.id) {
//       setError("שגיאה: מזהה משרה חסר לעדכון");
//       return;
//     }

//     if (!title.trim() || !description.trim() || !area.trim() || !englishLevel.trim()) {
//       setError("יש למלא שם, תיאור, אזור ורמת אנגלית");
//       return;
//     }
//     setError(null);

//     const listSkills = skills.split(",").map((s) => s.trim()).filter(Boolean).map((name) => ({ name }));
//     const listRequirement = requirements.split(",").map((s) => s.trim()).filter(Boolean).map((name) => ({ name }));

//     fetch(`${API_URL}/${editingJob.id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         ...editingJob,
//         title,
//         description,
//         area,
//         englishLevel,
//         listSkills,
//         listRequirement,
//       }),
//     })
//       .then(async (res) => {
//         if (!res.ok) {
//           const text = await res.text();
//           throw new Error(`שגיאה בשרת: ${res.status} - ${text}`);
//         }
//         return res.json();
//       })
//       .then((updatedJob) => {
//         setJobs(jobs.map((j) => (j.id === updatedJob.id ? updatedJob : j)));
//         setEditingJob(null);
//         setTitle("");
//         setDescription("");
//         setArea("");
//         setEnglishLevel("");
//         setRequirements("");
//         setSkills("");
//       })
//       .catch((e) => setError(e.message));
//   };

//   const startEdit = (job: Job) => {
//     setEditingJob(job);
//     setTitle(job.title || "");
//     setDescription(job.description || "");
//     setArea(job.area || "");
//     setEnglishLevel(job.englishLevel || "");
//     setRequirements(job.requirements?.map((r) => r.name).join(", ") || "");
//     setSkills(job.skills?.map((s) => s.name).join(", ") || "");
//     setError(null);
//   };

//   const cancelEdit = () => {
//     setEditingJob(null);
//     setTitle("");
//     setDescription("");
//     setArea("");
//     setEnglishLevel("");
//     setRequirements("");
//     setSkills("");
//     setError(null);
//   };

//   return (
//     <div dir="rtl">
//       {/* Your UI rendering remains the same */}
//     </div>
//   );
// };

// export default JobList;

import React, { useState, useEffect } from "react";

type Requirement = {
  description: string;
  advantageOrMust: string;
};

type Skill = {
  name: string;
};

type Job = {
  jobId: number;
  title: string;
  description: string;
  area: string;
  englishLevel: string;
  requirements: Requirement[];
  skills: Skill[];
};

const API_URL = "http://localhost:5297/api/Job";

interface JobListProps {
  isManager: boolean;
}

const JobList: React.FC<JobListProps> = ({ isManager }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [englishLevel, setEnglishLevel] = useState("Basic");
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [skills, setSkills] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("שגיאה בשליפת משרות");
      const data = await res.json();

      const transformed = data.map((job: any) => ({
        ...job,
        requirements: job.listRequirement || [],
        skills: job.listSkills || [],
      }));

      setJobs(transformed);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !area || !englishLevel) {
      setError("יש למלא שם, תיאור, אזור ורמת אנגלית");
      return;
    }

    const listSkills = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((name) => ({ name }));

   try {
  const token = localStorage.getItem("token");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ הכי חשוב!
    },
    body: JSON.stringify({
      title,
      description,
      area,
      englishLevel,
      passingScore: 0,
      numCandidate: 0,
      listSkills,
      listRequirement: requirements,
      managerId: 1,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`שגיאה בשרת: ${res.status} - ${text}`);
  }
      resetForm();
      setError("המשרה נוספה בהצלחה!");
      setTimeout(() => setError(null), 2000);
      await fetchJobs();
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleDelete = async (id?: number | string) => {
  const numericId = typeof id === "string" ? parseInt(id) : id;
  if (!numericId || isNaN(numericId)) {
    setError("שגיאה: מזהה משרה לא תקין למחיקה");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/${numericId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // 👈 שליחת הטוקן לשרת
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`שגיאה בשרת: ${res.status} - ${text}`);
    }

    setJobs(jobs.filter((j) => j.jobId !== numericId));
  } catch (e: any) {
    setError(e.message);
  }
};

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;

    const listSkills = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((name) => ({ name }));

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/${editingJob.jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" ,
        Authorization: `Bearer ${token}`,
        }, // ✅ הכי חשוב!
        body: JSON.stringify({
          ...editingJob,
          title,
          description,
          area,
          englishLevel,
          listSkills,
          listRequirement: requirements,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`שגיאה בשרת: ${res.status} - ${text}`);
      }

      await fetchJobs();
      resetForm();
      setError("המשרה עודכנה בהצלחה!");
      setTimeout(() => setError(null), 2000);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const startEdit = (job: Job) => {
    setEditingJob(job);
    setTitle(job.title);
    setDescription(job.description);
    setArea(job.area);
    setEnglishLevel(job.englishLevel);
    setSkills(job.skills.map((s) => s.name).join(", "));
    setRequirements(job.requirements);
  };

  const resetForm = () => {
    setEditingJob(null);
    setTitle("");
    setDescription("");
    setArea("");
    setEnglishLevel("Basic");
    setRequirements([]);
    setSkills("");
  };

  const addRequirement = () => {
    setRequirements([...requirements, { description: "", advantageOrMust: "Must" }]);
  };

  const updateRequirement = (index: number, field: keyof Requirement, value: string) => {
    const updated = [...requirements];
    updated[index][field] = value;
    setRequirements(updated);
  };

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  return (
    <div dir="rtl" style={{ padding: 20 }}>
      <h2>רשימת משרות</h2>
      {error && <div style={{ color: error.includes("הצלחה") ? "green" : "red" }}>{error}</div>}

      {isManager && (
        <form onSubmit={editingJob ? handleUpdate : handleAdd} style={{ marginBottom: 20 }}>
          <input placeholder="שם משרה" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input placeholder="תיאור" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input placeholder="אזור" value={area} onChange={(e) => setArea(e.target.value)} />
          <select value={englishLevel} onChange={(e) => setEnglishLevel(e.target.value)}>
            <option value="Basic">Basic</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Fluent">Fluent</option>
            <option value="Native">Native</option>
          </select>

          <h4>דרישות:</h4>
          {requirements.map((req, index) => (
            <div key={index} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                placeholder="דרישה"
                value={req.description}
                onChange={(e) => updateRequirement(index, "description", e.target.value)}
              />
              <select
                value={req.advantageOrMust}
                onChange={(e) => updateRequirement(index, "advantageOrMust", e.target.value)}
              >
                <option value="Must">חובה</option>
                <option value="Advantage">רצוי</option>
              </select>
              <button type="button" onClick={() => removeRequirement(index)}>❌</button>
            </div>
          ))}
          <button type="button" onClick={addRequirement}>+ הוסף דרישה</button>
          <br />
          <input
            placeholder="כישורים (מופרדים בפסיקים)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <br />
          <button type="submit">{editingJob ? "עדכן" : "הוסף"}</button>
          {editingJob && <button type="button" onClick={resetForm}>ביטול</button>}
        </form>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {jobs.map((job) => (
          <li key={job.jobId} style={{ background: "#f0f0f0", padding: 10, marginBottom: 10 }}>
            <strong>{job.title}</strong> – {job.area} – {job.englishLevel}
            <p>{job.description}</p>

            <p>
              דרישות:{" "}
              {job.requirements.length > 0
                ? job.requirements.map((r) => `${r.description} (${r.advantageOrMust})`).join(", ")
                : "אין דרישות"}
            </p>

            <p>
              כישורים:{" "}
              {job.skills.length > 0
                ? job.skills.map((s) => s.name).join(", ")
                : "אין כישורים"}
            </p>

            {isManager && (
              <>
                <button onClick={() => startEdit(job)}>ערוך</button>
                <button onClick={() => handleDelete(job.jobId)}>מחק</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
