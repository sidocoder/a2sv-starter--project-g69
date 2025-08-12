import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  startApplication,
  checkApplicationStatus,
  getApplicationData,
  editApplicationData,
  cancelApplication,
  submitApplication,
} from "../api/applicantApi";
import type { AxiosInstance } from "axios";

export const startApplicationThunk = createAsyncThunk(
  "application/start",
  async (
    { formData, axiosInstance, token }: { formData: FormData; axiosInstance: AxiosInstance; token: string }
  ) => {
    const res = await startApplication(axiosInstance, formData, token);
    return res.data;
  }
);

export const checkStatusThunk = createAsyncThunk(
  "application/status",
  async (
    { axiosInstance, token }: { axiosInstance: AxiosInstance; token: string }
  ) => {
    const res = await checkApplicationStatus(axiosInstance, token);
    return res.data;
  }
);

export const getDataThunk = createAsyncThunk(
  "application/data",
  async (
    { application_id, axiosInstance, token }: { application_id: string; axiosInstance: AxiosInstance; token: string }
  ) => {
    const res = await getApplicationData(axiosInstance, application_id, token);
    return res.data;
  }
);

export const editApplicationThunk = createAsyncThunk(
  "application/edit",
  async (
    { formData, axiosInstance, token }: { formData: FormData; axiosInstance: AxiosInstance; token: string }
  ) => {
    const res = await editApplicationData(axiosInstance, formData, token);
    return res.data;
  }
);

export const cancelApplicationThunk = createAsyncThunk(
  "application/cancel",
  async (
    { application_id, axiosInstance, token }: { application_id: string; axiosInstance: AxiosInstance; token: string }
  ) => {
    const res = await cancelApplication(axiosInstance, application_id, token);
    return res.data;
  }
);

export const submitApplicationThunk = createAsyncThunk(
  "application/submit",
  async (
    { application_id, axiosInstance, token }: { application_id: string; axiosInstance: AxiosInstance; token: string }
  ) => {
    const res = await submitApplication(axiosInstance, application_id, token);
    return res.data;
  }
);

interface ApplicationState {
  data: Record<string, unknown> | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ApplicationState = {
  data: null,
  status: "idle",
  error: null,
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startApplicationThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(startApplicationThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(startApplicationThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
    // You can add more cases for the other thunks
  },
});

export default applicationSlice.reducer;
