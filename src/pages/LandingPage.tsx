import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <h1>ברוכים הבאים</h1>
      <button
        style={{ margin: 20 }}
        onClick={() => navigate("/auth/login?role=candidate")}
      >
        כניסת מועמד
      </button>
      <button
        style={{ margin: 20 }}
        onClick={() => navigate("/auth/login?role=manager")}
      >
        כניסת מנהל
      </button>
    </div>
  );
};

export default LandingPage;