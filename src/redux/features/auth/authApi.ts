import { baseApi } from "@/redux/hooks/baseApi";
import type {
  LoginRequest,
  LoginResponse,
  LoginSessionsResponse,
  RegisterResponse,
} from "@/redux/types/auth.type";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation<RegisterResponse, FormData>({
      query: (formData) => ({
        url: "/auth/register",
        method: "POST",
        body: formData,
      }),
    }),
    authMe: builder.query({
      query: () => "/auth/me",
    }),
    getLoginSessions: builder.query<LoginSessionsResponse, void>({
      query: () => "/auth/login-sessions",
    }),
    forgotPassword: builder.mutation<
      {
        statusCode: number;
        success: boolean;
        message: string;
        data: { message: string };
      },
      { email: string }
    >({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useAuthMeQuery,
  useGetLoginSessionsQuery,
  useForgotPasswordMutation,
} = authApi;
