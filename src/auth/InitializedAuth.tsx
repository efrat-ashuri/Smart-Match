import { useAppDispatch } from "../redux/store";
import { useEffect } from "react";
import { getSession, isValidToken, setSession } from "./auth.utils";
import { RoleType } from "../types/user.types";
import { setAuth, setInitialized } from "../redux/auth/auth.slice";

const InitializedAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initialize = async () => {
      const token = getSession();
      if (token && isValidToken(token)) {
        setSession(token);
        const user = {
          id: 1,
          name: "sara",
          role: RoleType.Admin,
          phone: "05246545614",
          email: "sara@gmail.com",
          address: "",
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
