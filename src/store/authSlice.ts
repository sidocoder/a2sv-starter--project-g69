// src/authSlice.ts
"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createAxiosInstance } from "../utils/axiosInstance";
import { isAxiosError } from "axios";
import type { AppDispatch, RootState } from "../store";

const API_URL = "/auth";

interface AuthState {
  loading: boolean;
  error: string | null;
  success: boolean;
  token: { access: string; refresh: string } | null;
}

interface AuthFormData {
  email: string;
  password: string;
}

interface RegisterFormData extends AuthFormData {
  name: string;
}

interface LoginResponse {
  success: boolean;
  data: {
    access: string;
    refresh: string;
    role: string;
  };
  message: string;
}

// Register thunk
export const registerUser = createAsyncThunk<
  { message: string; token?: string },
  RegisterFormData,
  { rejectValue: string }
>("auth/registerUser", async (formData, { rejectWithValue }) => {
  try {
    const payload = {
      full_name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    const axiosInstance = createAxiosInstance({} as AppDispatch); // dispatch not needed here
    const response = await axiosInstance.post(`${API_URL}/register`, payload);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as string);
    }
    return rejectWithValue("Registration failed");
  }
});

// Login thunk (needs dispatch)
export const loginUser = createAsyncThunk<
  LoginResponse,
  AuthFormData,
  {
    rejectValue: string;
    dispatch: AppDispatch;
    state: RootState;
  }
>("auth/loginUser", async (formData, { rejectWithValue, dispatch }) => {
  try {
    const axiosInstance = createAxiosInstance(dispatch);
    const response = await axiosInstance.post(`${API_URL}/token`, formData);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as string);
    }
    return rejectWithValue("Login failed");
  }
});

const initialState: AuthState = {
  loading: false,
  error: null,
  success: false,
  token:
    typeof window !== "undefined" && localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token")!)
      : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
    setTokens(state, action: PayloadAction<{ access: string; refresh: string }>) {
      const { access, refresh } = action.payload;
      state.token = { access, refresh };
      localStorage.setItem("token", JSON.stringify({ access, refresh }));
      localStorage.setItem("refreshToken", refresh);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const accessToken = action.payload.data?.access;
        const refreshToken = action.payload.data?.refresh;

        if (
          accessToken &&
          typeof accessToken === "string" &&
          refreshToken &&
          typeof refreshToken === "string"
        ) {
          state.token = { access: accessToken, refresh: refreshToken };
          localStorage.setItem(
            "token",
            JSON.stringify({ access: accessToken, refresh: refreshToken })
          );
          localStorage.setItem("refreshToken", refreshToken);
        } else {
          console.warn("No valid tokens in payload");
          state.token = null;
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const { resetAuthState, setTokens } = authSlice.actions;
export default authSlice.reducer;
