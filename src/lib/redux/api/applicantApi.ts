import api from "./axiosInstance";

// POST - Start Application
const tokenString = localStorage.getItem("token");
const token = tokenString ? JSON.parse(tokenString) : null;
export const startApplication = (formData: FormData) =>
  api.post("/applications/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token?.access ?? ""}`,
    },
  });

// GET - Check Application Status
export const checkApplicationStatus = () =>
  api.get("/applications/my-status/",
    {
      headers: {
        "Authorization": `Bearer ${token?.access ?? ""}`,
      }
}  );

// GET - Get Application Data
export const getApplicationData = () =>
  api.get("/applications/:application_id", {
    headers: {
      "Authorization": `Bearer ${token?.access ?? ""}`,
    }
  });

// PUT - Edit Application Data
export const editApplicationData = (formData: FormData) =>
  api.put("/applications/my-status", formData, {
    headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token?.access ?? ""}` },
  });

// DELETE - Cancel Application
export const cancelApplication = () =>
  api.delete("/applications/:application_id", {
    headers: {
      "Authorization": `Bearer ${token?.access ?? ""}`,
    }
  });

// PATCH - Submit Application
export const submitApplication = () =>
  api.patch("/applications/:application_id", {
    headers: {
      "Authorization": `Bearer ${token?.access ?? ""}`,
    }
  });
