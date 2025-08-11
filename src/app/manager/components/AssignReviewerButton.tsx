"use client";

import React from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/index";
import { assignReviewer } from "../../../store/managerSlice";

export default function AssignReviewerButton() {
  const dispatch = useDispatch<AppDispatch>();

  // Example usage: applicationId as number, convert to string
  const handleAssign = (applicationId: number, reviewerId: string) => {
    dispatch(assignReviewer({ applicationId: applicationId.toString(), reviewerId }));
  };

  return (
    <button onClick={() => handleAssign(1, "reviewer123")}>
      Assign Reviewer
    </button>
  );
}
