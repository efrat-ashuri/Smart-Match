import { Link } from "react-router-dom";

export const HomeClientPage = () => {
  return (
    <div style={{ maxWidth: 600, margin: "40px auto", textAlign: "center" }}>
      <h1>ברוך הבא, מועמד!</h1>
      <div style={{ margin: "30px 0" }}>
        <Link to="/jobs" style={{ margin: "0 10px" }}>צפייה במשרות</Link>
        <Link to="/candidates" style={{ margin: "0 10px" }}>הפרופיל שלי</Link>
      </div>
    </div>
  );
};

export default HomeClientPage;