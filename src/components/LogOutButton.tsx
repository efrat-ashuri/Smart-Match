import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { logout } from "../redux/auth/auth.slice";
import { removeSession } from "../auth/auth.utils";

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeSession();             // מוחק את הטוקן מה-localStorage
    dispatch(logout());          // מנקה את המשתמש מ-Redux
    navigate("/auth/login");     // ניתוב לדף התחברות
  };

  return <button onClick={handleLogout}>התנתק</button>;
};

export default LogoutButton;
