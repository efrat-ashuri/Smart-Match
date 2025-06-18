// import { ReactNode } from "react";
// import { Navigate } from "react-router";
// import { useAppSelector } from "../redux/store";
// import { selectAuth } from "../redux/auth/auth.selector";
// import { Paths } from "../routes/paths";
// import { RoleType } from "../types/user.types";

// type Props = {
//     children: ReactNode;
//     roles?: RoleType[];
// };

// const AuthGuard = ({ children, roles }: Props) => {
//     const { isAuthorized, isInitialized, user } = useAppSelector(selectAuth);

//     if (!isInitialized) {
//         return <h1>Loading...</h1>;
//     }

//     if (!isAuthorized) {
//         return <Navigate to={`/${Paths.auth}/${Paths.login}`} />;
//     }

//     if (roles && roles.length) {
//         console.log("user.role =", user!.role);
//         console.log("expected roles =", roles);
//         console.log("is included =", roles.includes(user!.role));
//         console.log("user.role =", user!.role, typeof user!.role);
//         console.log("expected roles =", roles, typeof roles[0]);
//         if (!roles.includes(user!.role)) {
//             return <h1>unauthorized</h1>;
//         }
//     }

//     return <>{children}</>;
// };

// export default AuthGuard;

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
  const { isAuthorized, isInitialized, user } = useAppSelector(selectAuth);

  // עדיין לא נטען
  if (!isInitialized) {
    return <h1>טוען הרשאות...</h1>;
  }

  // לא מחובר
  if (!isAuthorized || !user) {
    console.warn("🔐 המשתמש לא מחובר או ריק");
    return <Navigate to={`/${Paths.auth}/${Paths.login}`} />;
  }

  // בדיקת תפקיד
  if (roles && roles.length > 0) {
    console.log("👤 בדיקת תפקיד:");
    console.log("✅ user.role:", user.role, typeof user.role);
    console.log("✅ roles:", roles, typeof roles[0]);
    console.log("✅ roles.includes(user.role):", roles.includes(user.role));
    console.log("✅ roles array is string[]?", roles.every(r => typeof r === "string"));

    if (!roles.includes(user.role)) {
      console.error(`🚫 תפקיד לא מורשה: המשתמש הוא ${user.role}, אך נדרש ${roles.join(", ")}`);
      return <h1 style={{ textAlign: "center", color: "crimson" }}>unauthorized</h1>;
    }
  }

  return <>{children}</>;
};

export default AuthGuard;
