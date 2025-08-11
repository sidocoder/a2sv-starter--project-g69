// src/components/ApplicationsContainer.tsx
"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ApplicationsTable from "./ApplicationsTable";
import type { ApplicationCamelCase, ReviewerCamelCase } from "../types/managerTypes";
import { selectApplications, selectReviewers } from "../selectors/managerSelectors";
import { assignReviewer } from "../../../store/managerSlice";
import type { AppDispatch } from "../../../store";

export default function ApplicationsContainer() {
  const dispatch = useDispatch<AppDispatch>();

  const applications: ApplicationCamelCase[] = useSelector(selectApplications);
  const reviewers: ReviewerCamelCase[] = useSelector(selectReviewers);

  const onAssignReviewer = (applicationId: string, reviewerId: string) => {
    dispatch(assignReviewer({ applicationId, reviewerId }));
  };

  return (
    <ApplicationsTable
      applications={applications}
      reviewers={reviewers}
      onAssignReviewer={onAssignReviewer}
    />
  );
}
