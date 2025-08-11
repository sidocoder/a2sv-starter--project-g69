import type { ApplicationAPI, ApplicationCamelCase } from '../app/manager/types/managerTypes';

export function transformApplication(apiApp: ApplicationAPI): ApplicationCamelCase {
  return {
    id: apiApp.id,
    applicant: apiApp.applicant_name,
    slug: apiApp.slug,
    submitted: apiApp.submitted_at,
    assignedReviewer: apiApp.assigned_reviewer_name,
    status: apiApp.status,
  };
}
