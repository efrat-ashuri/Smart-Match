// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RoleType, UserType } from "../../types/user.types";

// type AuthState = {
//   user: UserType | null;
//   isInitialized: boolean;
// };

// const initialState: AuthState = {
//   user: null,
//   isInitialized: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setAuth(state, action: PayloadAction<UserType>) {
//       state.user = action.payload;
//       state.isInitialized = true;
//     },
//     setInitialized(state) {
//       state.isInitialized = true;
//     },
//     clearAuth(state) {
//       state.user = null;
//       state.isInitialized = false;
//     },
//   },
// });

// export const { setAuth, setInitialized, clearAuth } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoleType } from "../../types/user.types";

type UserType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: RoleType;
};

type AuthState = {
  user: UserType | null;
  isInitialized: boolean;
};

const initialState: AuthState = {
  user: null,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<UserType>) {
      state.user = action.payload;
      state.isInitialized = true;
    },
    setInitialized(state) {
      state.isInitialized = true;
    },
    logout(state) {
      state.user = null;
      state.isInitialized = true;
    },
  },
});

export const { setAuth, setInitialized, logout } = authSlice.actions;
export default authSlice.reducer;

