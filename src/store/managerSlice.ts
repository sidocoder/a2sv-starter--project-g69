import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from "./index";
import { createAxiosInstance } from "../utils/axiosInstance";

interface Application {
  id: string;
  applicant_name: string;
  slug: string;
  submitted: string;
  assigned_reviewer_name: string | null;
  status: "Under Review" | "New" | "Accepted" | "Rejected";
}

interface Reviewer {
  id: string;
  full_name: string;
  email: string;
}

interface ManagerState {
  applications: Application[];
  reviewers: Reviewer[];
  loading: boolean;
  error: string | null;
}

const initialState: ManagerState = {
  applications: [],
  reviewers: [],
  loading: false,
  error: null,
};

// Fetch applications
export const fetchApplications = createAsyncThunk<
  Application[],
  void,
  { rejectValue: string; dispatch: AppDispatch; state: RootState }
>(
  "manager/fetchApplications",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const axiosInstance = createAxiosInstance(dispatch);
      const response = await axiosInstance.get<{ data: Application[] }>("/manager/applications/");
      return response.data.data;
    } catch {
      return rejectWithValue("Failed to fetch applications");
    }
  }
);

// Fetch available reviewers
export const fetchReviewers = createAsyncThunk<
  Reviewer[],
  void,
  { rejectValue: string; dispatch: AppDispatch; state: RootState }
>(
  "manager/fetchReviewers",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const axiosInstance = createAxiosInstance(dispatch);
      const response = await axiosInstance.get<{ data: Reviewer[] }>("/manager/applications/available-reviewers/");
      return response.data.data;
    } catch {
      return rejectWithValue("Failed to fetch reviewers");
    }
  }
);

// Assign reviewer
export const assignReviewer = createAsyncThunk<
  { applicationId: string; reviewerId: string },
  { applicationId: string; reviewerId: string },
  { rejectValue: string; dispatch: AppDispatch; state: RootState }
>(
  "manager/assignReviewer",
  async ({ applicationId, reviewerId }, { rejectWithValue, dispatch }) => {
    try {
      const axiosInstance = createAxiosInstance(dispatch);
      await axiosInstance.patch(`/manager/applications/${applicationId}/assign/`, {
        reviewer_id: reviewerId,
      });
      return { applicationId, reviewerId };
    } catch {
      return rejectWithValue("Failed to assign reviewer");
    }
  }
);

// Decide application
export const decideApplication = createAsyncThunk<
  { applicationId: string; status: string },
  { applicationId: string; status: "accepted" | "rejected"; decisionNotes: string },
  { rejectValue: string; dispatch: AppDispatch; state: RootState }
>(
  "manager/decideApplication",
  async ({ applicationId, status, decisionNotes }, { rejectWithValue, dispatch }) => {
    try {
      const axiosInstance = createAxiosInstance(dispatch);
      await axiosInstance.patch(`/manager/applications/${applicationId}/decide/`, {
        status,
        decision_notes: decisionNotes,
      });
      return { applicationId, status };
    } catch {
      return rejectWithValue("Failed to decide application");
    }
  }
);

const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action: PayloadAction<Application[]>) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })

      .addCase(fetchReviewers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewers.fulfilled, (state, action: PayloadAction<Reviewer[]>) => {
        state.loading = false;
        state.reviewers = action.payload;
      })
      .addCase(fetchReviewers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })

      .addCase(assignReviewer.fulfilled, (state, action: PayloadAction<{ applicationId: string; reviewerId: string }>) => {
        const { applicationId, reviewerId } = action.payload;
        const app = state.applications.find((a) => a.id === applicationId);
        if (app) {
          const reviewer = state.reviewers.find((r) => r.id === reviewerId);
          app.assigned_reviewer_name = reviewer ? reviewer.full_name : null;
        }
      })

      .addCase(decideApplication.fulfilled, (state, action: PayloadAction<{ applicationId: string; status: string }>) => {
        const { applicationId, status } = action.payload;
        const app = state.applications.find((a) => a.id === applicationId);
        if (app) {
          app.status = status === "accepted" ? "Accepted" : "Rejected";
        }
      });
  },
});

export default managerSlice.reducer;
