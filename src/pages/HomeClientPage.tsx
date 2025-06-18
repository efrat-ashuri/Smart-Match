import { Link } from "react-router-dom";
import { Paths } from "../routes/paths";

const HomeClientPage = () => {
  return (
    <div style={{ maxWidth: 600, margin: "40px auto", textAlign: "center" }}>
      <h1>ברוך הבא, מועמד!</h1>
      <div style={{ margin: "30px 0" }}>
        <Link to={`/${Paths.viewJobsClient}`} style={{ margin: "0 10px" }}>
          צפייה במשרות
        </Link>
        <Link to={`/${Paths.sendResume}`} style={{ margin: "0 10px" }}>
          שליחת קורות חיים
        </Link>
      </div>
    </div>
  );
};

export default HomeClientPage;
