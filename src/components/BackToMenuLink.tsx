import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { selectAuth } from "../redux/auth/auth.selector";
import { Paths } from "../routes/paths";

const BackToMenuLink = () => {
  const { user } = useAppSelector(selectAuth);
console.log("USER FROM AUTH:", user); // הוסיפי שורה זו
  if (!user) return null;

  const role = user.role;
  const isManager = role === "admin";
  const to = isManager ? `/${Paths.home}` : `/${Paths.homeClient}`;

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <Link
        to={to}
        style={{
          fontSize: "1.1em",
          fontWeight: "bold",
          background: "#1976d2",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: 8,
          textDecoration: "none"
        }}
      >
        🔙 חזרה לתפריט {isManager ? "מנהל" : "מועמד"}
      </Link>
    </div>
  );
};

export default BackToMenuLink;
