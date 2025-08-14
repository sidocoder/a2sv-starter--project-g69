
import type { AxiosInstance } from "axios";

// All API functions now require axiosInstance and token from the component
export const startApplication = (axiosInstance: AxiosInstance, formData: FormData, token: string) =>
  axiosInstance.post("/applications/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`,
    },
  });

export const checkApplicationStatus = (axiosInstance: AxiosInstance, token: string) =>
  axiosInstance.get("/applications/my-status/", {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

export const getApplicationData = (axiosInstance: AxiosInstance, application_id: string, token: string) =>
  axiosInstance.get(`/applications/${application_id}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

export const editApplicationData = (axiosInstance: AxiosInstance, formData: FormData, token: string) =>
  axiosInstance.put("/applications/my-status", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`,
    },
  });

export const cancelApplication = (axiosInstance: AxiosInstance, application_id: string, token: string) =>
  axiosInstance.delete(`/applications/${application_id}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

export const submitApplication = (axiosInstance: AxiosInstance, application_id: string, token: string) =>
  axiosInstance.patch(`/applications/${application_id}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

export async function getReviewDetails(axiosInstance: AxiosInstance, application_id: string, token: string) {
  try {
    const res = await axiosInstance.get(`/applicant/${application_id}/review-details`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching review details:", error);
    throw error;
  }
}
