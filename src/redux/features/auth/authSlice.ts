import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import type {
  User,
  LoginResponse,
  RegisterResponse,
} from "@/redux/types/auth.type";
import { authApi } from "./authApi";

type AuthState = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        user: User;
        token?: string;
        refreshToken?: string;
      }>,
    ) => {
      state.user = action.payload.user;
      if (action.payload.token) {
        state.token = action.payload.token;
        Cookies.set("token", action.payload.token, { expires: 1 });
      }
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken;
        Cookies.set("refreshToken", action.payload.refreshToken, {
          expires: 7,
        });
      }
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      localStorage.removeItem("user");
    },
    loadUserFromToken: (state) => {
      const token = Cookies.get("token");
      const refreshToken = Cookies.get("refreshToken");
      if (token) {
        state.token = token;
        state.refreshToken = refreshToken || null;
        const userStr = localStorage.getItem("user");
        if (userStr) state.user = JSON.parse(userStr);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }: PayloadAction<LoginResponse>) => {
        state.token = payload.data.access_token;
        state.refreshToken = payload.data.refresh_token;
        state.user = payload.data.user;
        Cookies.set("token", payload.data.access_token, { expires: 1 });
        Cookies.set("refreshToken", payload.data.refresh_token, { expires: 7 });
        localStorage.setItem("user", JSON.stringify(payload.data.user));
      },
    );
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }: PayloadAction<RegisterResponse>) => {
        state.token = payload.data.access_token;
        state.refreshToken = payload.data.refresh_token;
        state.user = payload.data.user;
        Cookies.set("token", payload.data.access_token, { expires: 1 });
        Cookies.set("refreshToken", payload.data.refresh_token, { expires: 7 });
        localStorage.setItem("user", JSON.stringify(payload.data.user));
      },
    );
  },
});

export const { setUser, logOut, loadUserFromToken } = authSlice.actions;
export default authSlice.reducer;
