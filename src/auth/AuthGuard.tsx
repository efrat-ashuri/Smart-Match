import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../redux/store";
import { selectAuth } from "../redux/auth/auth.selector";
import { Paths } from "../routes/paths";
import { RoleType } from "../types/user.types";

type Props = {
  children: ReactNode;
  roles?: RoleType[];
};

const AuthGuard = ({ children, roles }: Props) => {
  const { isInitialized, user } = useAppSelector(selectAuth);
  const isAuthorized = !!user;

  if (!isInitialized) {
    return <h1>טוען הרשאות...</h1>;
  }

  if (!isAuthorized || !user) {
    return <Navigate to={`/${Paths.auth}/${Paths.login}`} />;
  }

  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    return <h1 style={{ textAlign: "center", color: "crimson" }}>unauthorized</h1>;
  }

  return <>{children}</>;
};

export default AuthGuard;
