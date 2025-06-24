import { Link } from "react-router-dom";
import { Paths } from "../routes/paths";

export const HomeManPage = () => {
  return (
    <div style={{ maxWidth: 600, margin: "40px auto", textAlign: "center" }}>
      <h1>ברוך הבא, מנהל!</h1>
      <div style={{ margin: "30px 0" }}>
        <Link to={`/${Paths.jobs}`} style={{ margin: "0 10px" }}>ניהול משרות</Link>
        {/* <Link to={`/${Paths.managers}`} style={{ margin: "0 10px" }}>ניהול מנהלים</Link> */}
        <Link to={`/${Paths.candidate}`} style={{ margin: "0 10px" }}>ניהול מועמדים</Link>
        <Link to={`/${Paths.skills}`} style={{ margin: "0 10px" }}>ניהול כישורים</Link>
        <Link to={`/${Paths.requirnments}`} style={{ margin: "0 10px" }}>ניהול דרישות</Link>
        {/* <Link to={`/${Paths.users}`} style={{ margin: "0 10px" }}>משתמשים</Link> */}
      </div>
    </div>
  );
};

export default HomeManPage;