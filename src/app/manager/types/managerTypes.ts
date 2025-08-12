// Raw API shapes
export interface ReviewerApi {
  id: string;
  full_name: string;
  email: string;
}

export interface ApplicationApi {
  id: string;
  applicant_name: string;
  status: string;
  assigned_reviewer_name: string | null;
  slug?: string;
  submitted?: string;
}

// UI shapes (after transformation)
export interface Reviewer {
  id: string;
  fullName: string;
  email: string;
}

export interface Application {
  id: string;
  applicant: string;
  slug: string;
  submitted: string;
  assignedReviewer: string | null;
  status: string; // normalized status like "under_review"
}
