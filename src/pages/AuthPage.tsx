import { Outlet } from "react-router-dom";

export const AuthPage = () => {
  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  );
};
