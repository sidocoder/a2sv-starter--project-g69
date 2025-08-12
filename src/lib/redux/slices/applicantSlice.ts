import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  startApplication,
  checkApplicationStatus,
  getApplicationData,
  editApplicationData,
  cancelApplication,
  submitApplication,
} from "../api/applicantApi";

export const startApplicationThunk = createAsyncThunk(
  "application/start",
  async (formData: FormData) => {
    const res = await startApplication(formData);
    return res.data;
  }
);

export const checkStatusThunk = createAsyncThunk(
  "application/status",
  async (application_id: string) => {
    const res = await checkApplicationStatus(application_id);
    return res.data;
  }
);

export const getDataThunk = createAsyncThunk(
  "application/data",
  async () => {
    const res = await getApplicationData();
    return res.data;
  }
);

export const editApplicationThunk = createAsyncThunk(
  "application/edit",
  async (formData: FormData) => {
    const res = await editApplicationData(formData);
    return res.data;
  }
);

export const cancelApplicationThunk = createAsyncThunk(
  "application/cancel",
  async () => {
    const res = await cancelApplication();
    return res.data;
  }
);

export const submitApplicationThunk = createAsyncThunk(
  "application/submit",
  async () => {
    const res = await submitApplication();
    return res.data;
  }
);

interface ApplicationState {
  data: any;
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
