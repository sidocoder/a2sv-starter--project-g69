import { createSelector } from "reselect";
import type { RootState } from "../../../store";

// Select the entire manager slice state
const selectManagerState = (state: RootState) => state.manager;

// Select raw applications array
export const selectApplicationsRaw = createSelector(
  [selectManagerState],
  (manager) => manager.applications
);

// Convert raw applications to camelCase keys expected by UI components
export const selectApplications = createSelector(
  [selectApplicationsRaw],
  (applications) =>
    applications.map((app) => ({
      id: app.id,
      applicant: app.applicant_name,
      slug: app.slug,
      submitted: app.submitted,
      assignedReviewer: app.assigned_reviewer_name,
      status: app.status.toLowerCase().replace(/\s/g, "_"), // e.g. "Under Review" -> "under_review"
    }))
);

// Select raw reviewers array
export const selectReviewersRaw = createSelector(
  [selectManagerState],
  (manager) => manager.reviewers
);

// Convert raw reviewers to camelCase keys expected by UI components
export const selectReviewers = createSelector(
  [selectReviewersRaw],
  (reviewers) =>
    reviewers.map((rev) => ({
      id: rev.id,
      fullName: rev.full_name,
      email: rev.email,
    }))
);
