// src/types/managerTypes.ts

export interface ApplicationAPI {
  id: string;
  applicant_name: string;
  slug: string;
  submitted_at: string;
  assigned_reviewer_name: string | null;
  status: string;
}

export interface ApplicationCamelCase {
  id: string;
  applicant: string;
  slug: string;
  submitted: string;
  assignedReviewer: string | null;
  status: string;
}

export interface ReviewerAPI {
  id: string;
  full_name: string;
  email: string;
}

export interface ReviewerCamelCase {
  id: string;
  fullName: string;
  email: string;
}
