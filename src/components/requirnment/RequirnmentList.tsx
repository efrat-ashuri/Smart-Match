import React, { useState, useEffect } from "react";
import BackToMenuLink from "../BackToMenuLink";
type Requirement = {
  requirementId: number;
  description: string;
  advantageOrMust: "Must" | "Advantage";
};

// שימי לב! אם בקונטרולר שלך השם Requinment (לא נכון) אז תשאירי כך.
// אבל עדיף לשנות גם בקונטרולר וגם כאן ל-Requirement
const API_URL = "http://localhost:5297/api/Requinment";

interface RequirementListProps {
  isManager: boolean;
}

const RequirementList: React.FC<RequirementListProps> = ({ isManager }) => {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [description, setDescription] = useState("");
  const [advantageOrMust, setAdvantageOrMust] = useState<"Must" | "Advantage">("Must");
  const [editingRequirement, setEditingRequirement] = useState<Requirement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token");

  const fetchRequirements = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setRequirements(data);
      } else {
        setError("שגיאה בשליפת דרישות");
      }
    } catch (err) {
      setError("בעיה בחיבור לשרת");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return setError("יש למלא תיאור דרישה");

    setError(null);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description, advantageOrMust }),
      });

      if (res.ok) {
        await fetchRequirements();
        setDescription("");
        setAdvantageOrMust("Must");
      } else {
        setError("שגיאה בהוספת דרישה");
      }
    } catch {
      setError("שגיאה בחיבור לשרת");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRequirement || !description.trim()) return setError("יש למלא תיאור");

    setError(null);
    try {
      const res = await fetch(`${API_URL}/${editingRequirement.requirementId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          requirementId: editingRequirement.requirementId,
          description,
          advantageOrMust,
        }),
      });

      if (res.ok) {
        // לא כל PUT מחזיר תוכן - אז לא לעשות res.json בלי לבדוק
        await fetchRequirements();
        cancelEdit();
      } else {
        setError("שגיאה בעדכון דרישה");
      }
    } catch {
      setError("בעיה בחיבור לשרת");
    }
  };

  const handleDelete = async (id: number) => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setRequirements(requirements.filter((r) => r.requirementId !== id));
      } else {
        setError("שגיאה במחיקה");
      }
    } catch {
      setError("בעיה בחיבור לשרת");
    }
  };

  const startEdit = (r: Requirement) => {
    setEditingRequirement(r);
    setDescription(r.description);
    setAdvantageOrMust(r.advantageOrMust);
  };

  const cancelEdit = () => {
    setEditingRequirement(null);
    setDescription("");
    setAdvantageOrMust("Must");
    setError(null);
  };

  if (!isManager) return null;

  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: "#4978c9", padding: "0" }}>
      <div style={{
        maxWidth: 900, margin: "40px auto", background: "#fff", borderRadius: 12,
        boxShadow: "0 2px 8px #0001", padding: 24
      }}>
        <h2 style={{ textAlign: "center", color: "#222", fontSize: 32, marginBottom: 24, fontWeight: "bold" }}>
          ניהול דרישות
        </h2>

        <form onSubmit={editingRequirement ? handleUpdate : handleAdd} style={{
          display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap", background: "#ffd000",
          borderRadius: 8, padding: 16, alignItems: "center", justifyContent: "center"
        }}>
          <input
            placeholder="תיאור דרישה"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #bbb", minWidth: 140 }}
          />
          <select
            value={advantageOrMust}
            onChange={(e) => setAdvantageOrMust(e.target.value as "Must" | "Advantage")}
            style={{ padding: 8, borderRadius: 6, border: "1px solid #bbb" }}
          >
            <option value="Must">חובה</option>
            <option value="Advantage">יתרון</option>
          </select>
          <button type="submit" style={{
            background: "#1976d2", color: "#fff", border: "none", borderRadius: 6,
            padding: "8px 16px", fontWeight: "bold", cursor: "pointer"
          }}>
            {editingRequirement ? "עדכן" : "הוסף"}
          </button>
          {editingRequirement && (
            <button type="button" onClick={cancelEdit} style={{
              background: "#eee", border: "none", borderRadius: 6,
              padding: "8px 16px", fontWeight: "bold", cursor: "pointer"
            }}>
              ביטול
            </button>
          )}
        </form>

        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
        {loading ? (
          <p style={{ textAlign: "center" }}>טוען...</p>
        ) : (
          <ul style={{
            listStyle: "none", padding: 0, display: "flex", flexWrap: "wrap",
            gap: 24, justifyContent: "center"
          }}>
            {requirements.map((r) => (
              <li key={r.requirementId} style={{
                background: "#fff", borderRadius: 12, padding: 20,
                minWidth: 260, boxShadow: "0 1px 3px #0002"
              }}>
                <div style={{ fontWeight: "bold", fontSize: 18 }}>{r.description}</div>
                <div style={{ fontStyle: "italic", color: "#555", marginBottom: 10 }}>
                  {r.advantageOrMust === "Must" ? "חובה" : "יתרון"}
                </div>
                <button onClick={() => startEdit(r)} style={{
                  background: "#ffc107", border: "none", borderRadius: 6,
                  padding: "6px 12px", fontWeight: "bold", cursor: "pointer", marginRight: 6
                }}>
                  עדכן
                </button>
                <button onClick={() => handleDelete(r.requirementId)} style={{
                  background: "#e53935", color: "#fff", border: "none",
                  borderRadius: 6, padding: "6px 12px", fontWeight: "bold", cursor: "pointer"
                }}>
                  מחק
                </button>
              </li>
            ))}
          </ul>       
        )}
         <BackToMenuLink />
      </div>
    </div>
  );
};

export default RequirementList;
