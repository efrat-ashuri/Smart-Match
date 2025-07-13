import { useEffect } from "react";
import { useAppDispatch } from "../redux/store";
import { getSession, isValidToken, setSession, jwtDecode } from "./auth.utils";
import { setAuth, setInitialized } from "../redux/auth/auth.slice";
import { RoleType } from "../types/user.types";

const InitializedAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initialize = async () => {
      const token = getSession();
      if (token && isValidToken(token)) {
        setSession(token);
        const decoded = jwtDecode(token);

        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        const mappedRole = role?.toLowerCase() === "manager" ? RoleType.Admin : RoleType.User;

        const user = {
          id: 1,
          name: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"] || "",
          email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || "",
          phone: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/postalcode"] || "",
          address: "",
          role: mappedRole,
        };

        dispatch(setAuth(user));
      } else {
        dispatch(setInitialized());
      }
    };

    initialize();
  }, []);

  return null;
};

export default InitializedAuth;
