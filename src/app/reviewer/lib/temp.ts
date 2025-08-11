const BASE_URL =
  "https://a2sv-application-platform-backend-team12.onrender.com";

// Your constant refresh token (keep this secure)
const REFRESH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NzAzODEzOS1lZTFiLTQ3ZWEtOWI1OS1hM2NkYzY2ZGJlNmUiLCJleHAiOjE3NTUzNDY1NzAsInR5cGUiOiJyZWZyZXNoIn0.bKoXnPPshXzhilE2qq2d2dXbMNIWoDpEZC_-zncu3ok";

let accessToken: string;

// Get a new access token by sending refresh token in Authorization header
async function getNewAccessToken() {
  const res = await fetch(`${BASE_URL}/auth/token/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${REFRESH_TOKEN}`, // <-- refresh token here
    },
    body: "", // empty body as per your backend guideline
  });

  const data = await res.json();
  // console.log(data)

  const newAccessToken = data.access || data.data?.access;
  if (!newAccessToken) {
    throw new Error("No access token found in refresh response");
  }
  accessToken = newAccessToken;
  console.log("🔑 New access token obtained from constant refresh token.");
}

// Fetch reviews with automatic access token refresh
export async function fetch_review(page: number, limit: number) {
  try {
    if (!accessToken) {
      await getNewAccessToken(); // Get token on first call
    }

    let res = await fetch(
      `${BASE_URL}/reviews/assigned?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    // If token expired, refresh and retry
    if (res.status === 401) {
      console.warn("⚠️ Access token expired. Refreshing...");
      await getNewAccessToken();

      res = await fetch(
        `${BASE_URL}/reviews/assigned?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Error ${res.status}: ${errText}`);
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    if (typeof window !== "undefined") {
      alert(`There was an error: ${error}`);
    } else {
      console.error("❌ Fetch review error:", error);
    }
    return [];
  }
}
