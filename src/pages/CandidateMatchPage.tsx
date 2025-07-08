
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Paths } from "../routes/paths";

// type Candidate = {
//   candidateId?: number;
//   name: string;
//   email: string;
//   experienceYears: number;
//   area?: string;
//   englishLevel?: string;
// };

// type Job = {
//   jobId: number;
//   title: string;
//   description: string;
// };

// type Match = {
//   job: Job;
//   matchedCandidates: {
//     candidate: Candidate;
//     score: number;
//   }[];
// };

// const CandidateMatchPage: React.FC = () => {
//   const [matches, setMatches] = useState<Match[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("http://localhost:5297/api/CandidateMatchTest/run", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!res.ok) throw new Error("שגיאה בטעינת התאמות");

//         const data = await res.json();
//         setMatches(data);
//       } catch (err: any) {
//         console.error("שגיאה:", err);
//         setError(err.message || "אירעה שגיאה בטעינת הנתונים");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [token]);

//   return (
//     <div style={{ padding: "30px", direction: "rtl", maxWidth: 800, margin: "0 auto" }}>
//       <h2 style={{ fontSize: 28, color: "#1976d2", marginBottom: 20 }}>התאמות מועמדים למשרות</h2>

//       {loading ? (
//         <p>טוען נתונים...</p>
//       ) : error ? (
//         <h3 style={{ color: "red", textAlign: "center" }}>{error}</h3>
//       ) : matches.length === 0 ? (
//         <p>לא נמצאו התאמות</p>
//       ) : (
//         matches.map((match) => (
//           <div key={match.job.jobId} style={{ marginBottom: 30, background: "#eef3f8", padding: 20, borderRadius: 8 }}>
//             <h3 style={{ color: "#1976d2" }}>משרה: {match.job.title}</h3>
//             <p>{match.job.description}</p>
//             {match.matchedCandidates.length === 0 ? (
//               <p>אין מועמדים מתאימים</p>
//             ) : (
//               <ul style={{ listStyle: "none", padding: 0 }}>
//                 {match.matchedCandidates.map((mc, idx) => {
//                   const c = mc.candidate;
//                   return (
//                     <li key={`${match.job.jobId}-${c.candidateId ?? `no-id-${idx}`}`} style={{ marginBottom: 10, background: "#fff", padding: 12, borderRadius: 6 }}>
//                       <strong>{c.name}</strong> — {c.email} <br />
//                       <small>
//                         ניסיון: {c.experienceYears} שנים | אזור: {c.area ?? "לא צוין"} | אנגלית: {c.englishLevel ?? "לא צוין"}
//                       </small>
//                     </li>
//                   );
//                 })}
//               </ul>
//             )}
//           </div>
//         ))
//       )}

//       <div style={{ marginTop: 40, textAlign: "center" }}>
//         <Link
//           to={`/${Paths.home}`}
//           style={{
//             background: "#1976d2",
//             color: "#fff",
//             padding: "10px 20px",
//             textDecoration: "none",
//             borderRadius: 8,
//             fontWeight: "bold",
//             fontSize: "1.1em",
//           }}
//         >
//           🔙 חזרה לתפריט מנהל
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default CandidateMatchPage;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Paths } from "../routes/paths";
import { useAppSelector } from "../redux/store"; // לוודא שיש לך את זה
import { selectAuth } from "../redux/auth/auth.selector"; // לוודא שזה הנתיב

type Candidate = {
  candidateId?: number;
  name: string;
  email: string;
  experienceYears: number;
  area?: string;
  englishLevel?: string;
};

type Job = {
  jobId: number;
  title: string;
  description: string;
};

type Match = {
  job: Job;
  matchedCandidates: {
    candidate: Candidate;
    score: number;
  }[];
};

const CandidateMatchPage: React.FC = () => {
  const { user } = useAppSelector(selectAuth); // שולף את המנהל הנוכחי
  const managerId = user?.id; // מזהה המנהל מתוך ה־user

  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    if (!managerId) {
      setError("לא נמצא מזהה מנהל");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5297/api/CandidateMatchTest/run/${managerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("שגיאה בטעינת התאמות");

      const data = await res.json();
      setMatches(data);
    } catch (err: any) {
      setError(err.message || "אירעה שגיאה בטעינת הנתונים");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        direction: "rtl",
        maxWidth: 900,
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        background: "#f2f7fc",
        borderRadius: 12,
        boxShadow: "0 0 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ fontSize: 32, color: "#1976d2", marginBottom: 30, textAlign: "center" }}>
        🔍 התאמות מועמדים למשרות
      </h2>

      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <button
          onClick={handleFetch}
          style={{
            padding: "8px 16px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: 6,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          בדוק התאמות
        </button>
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>🔄 טוען נתונים...</p>
      ) : error ? (
        <h3 style={{ color: "red", textAlign: "center" }}>{error}</h3>
      ) : matches.length === 0 ? (
        <p style={{ textAlign: "center" }}>לא נמצאו התאמות</p>
      ) : (
        matches.map((match) => (
          <div
            key={match.job.jobId}
            style={{
              marginBottom: 30,
              background: "#ffffff",
              padding: 20,
              borderRadius: 8,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ color: "#1976d2", fontSize: 22 }}>משרה: {match.job.title}</h3>
            <p style={{ marginBottom: 15 }}>{match.job.description}</p>
            {match.matchedCandidates.length === 0 ? (
              <p>אין מועמדים מתאימים</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {match.matchedCandidates.map((mc, idx) => {
                  const c = mc.candidate;
                  return (
<li
  key={`${match.job.jobId}-${c.candidateId ?? `no-id-${idx}`}`}
  style={{
    marginBottom: 10,
    background: "#f9f9f9",
    padding: 12,
    borderRadius: 6,
    border: "1px solid #ddd",
  }}
>
  <strong>{c.name}</strong> — {c.email}
  <br />
  <small>
    ניסיון: {c.experienceYears} שנים |{" "}
    אזור: {c.area ?? "לא צוין"} |{" "}
    אנגלית: {c.englishLevel ?? "לא צוין"} |{" "}
    ניקוד: {mc.score.toFixed(2)}
  </small>
</li>

                  );
                })}
              </ul>
            )}
          </div>
        ))
      )}

      <div style={{ marginTop: 40, textAlign: "center" }}>
        <Link
          to={`/${Paths.home}`}
          style={{
            background: "#1976d2",
            color: "#fff",
            padding: "10px 24px",
            textDecoration: "none",
            borderRadius: 8,
            fontWeight: "bold",
            fontSize: "1.1em",
          }}
        >
          ⬅ חזרה לתפריט מנהל
        </Link>
      </div>
    </div>
  );
};

export default CandidateMatchPage;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Paths } from "../routes/paths";

// type Candidate = {
//   candidateId?: number;
//   name: string;
//   email: string;
//   experienceYears: number;
//   area?: string;
//   englishLevel?: string;
// };

// type Job = {
//   jobId: number;
//   title: string;
//   description: string;
// };

// type Match = {
//   job: Job;
//   matchedCandidates: {
//     candidate: Candidate;
//     score: number;
//   }[];
// };

// const CandidateMatchPage: React.FC = () => {
//   const [managerId, setManagerId] = useState<string>("");
//   const [matches, setMatches] = useState<Match[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleFetch = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       if (!managerId) throw new Error("יש להזין מזהה מנהל (Manager ID)");

//       const token = localStorage.getItem("token");

//       const res = await fetch(`http://localhost:5297/api/CandidateMatchTest/run/${managerId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) throw new Error("שגיאה בטעינת התאמות");

//       const data = await res.json();
//       setMatches(data);
//     } catch (err: any) {
//       setError(err.message || "אירעה שגיאה בטעינת הנתונים");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: "30px",
//         direction: "rtl",
//         maxWidth: 900,
//         margin: "0 auto",
//         fontFamily: "Arial, sans-serif",
//         background: "#f2f7fc",
//         borderRadius: 12,
//         boxShadow: "0 0 12px rgba(0,0,0,0.1)",
//       }}
//     >
//       <h2 style={{ fontSize: 32, color: "#1976d2", marginBottom: 30, textAlign: "center" }}>
//         🔍 התאמות מועמדים למשרות
//       </h2>

//       <div style={{ display: "flex", alignItems: "center", marginBottom: 30, justifyContent: "center" }}>
//         <label style={{ fontSize: 16 }}>מזהה מנהל (Manager ID): </label>
//         <input
//           type="text"
//           value={managerId}
//           onChange={(e) => setManagerId(e.target.value)}
//           placeholder="למשל: 5"
//           style={{
//             marginLeft: 10,
//             padding: 8,
//             width: 100,
//             borderRadius: 6,
//             border: "1px solid #ccc",
//             fontSize: 14,
//           }}
//         />
//         <button
//           onClick={handleFetch}
//           style={{
//             marginRight: 10,
//             padding: "8px 16px",
//             backgroundColor: "#1976d2",
//             color: "white",
//             border: "none",
//             borderRadius: 6,
//             fontWeight: "bold",
//             cursor: "pointer",
//           }}
//         >
//           בדוק התאמות
//         </button>
//       </div>

//       {loading ? (
//         <p style={{ textAlign: "center" }}>🔄 טוען נתונים...</p>
//       ) : error ? (
//         <h3 style={{ color: "red", textAlign: "center" }}>{error}</h3>
//       ) : matches.length === 0 ? (
//         <p style={{ textAlign: "center" }}>לא נמצאו התאמות</p>
//       ) : (
//         matches.map((match) => (
//           <div
//             key={match.job.jobId}
//             style={{
//               marginBottom: 30,
//               background: "#ffffff",
//               padding: 20,
//               borderRadius: 8,
//               boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//             }}
//           >
//             <h3 style={{ color: "#1976d2", fontSize: 22 }}>משרה: {match.job.title}</h3>
//             <p style={{ marginBottom: 15 }}>{match.job.description}</p>
//             {match.matchedCandidates.length === 0 ? (
//               <p>אין מועמדים מתאימים</p>
//             ) : (
//               <ul style={{ listStyle: "none", padding: 0 }}>
//                 {match.matchedCandidates.map((mc, idx) => {
//                   const c = mc.candidate;
//                   return (
//                     <li
//                       key={`${match.job.jobId}-${c.candidateId ?? `no-id-${idx}`}`}
//                       style={{
//                         marginBottom: 10,
//                         background: "#f9f9f9",
//                         padding: 12,
//                         borderRadius: 6,
//                         border: "1px solid #ddd",
//                       }}
//                     >
//                       <strong>{c.name}</strong> — {c.email} <br />
//                       <small>
//                         ניסיון: {c.experienceYears} שנים | אזור: {c.area ?? "לא צוין"} | אנגלית:{" "}
//                         {c.englishLevel ?? "לא צוין"}
//                       </small>
//                     </li>
//                   );
//                 })}
//               </ul>
//             )}
//           </div>
//         ))
//       )}

//       <div style={{ marginTop: 40, textAlign: "center" }}>
//         <Link
//           to={`/${Paths.home}`}
//           style={{
//             background: "#1976d2",
//             color: "#fff",
//             padding: "10px 24px",
//             textDecoration: "none",
//             borderRadius: 8,
//             fontWeight: "bold",
//             fontSize: "1.1em",
//           }}
//         >
//           ⬅ חזרה לתפריט מנהל
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default CandidateMatchPage;
