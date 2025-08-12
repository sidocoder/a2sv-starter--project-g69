import { store } from "../../../store";

const BASE_URL =
  "https://a2sv-application-platform-backend-team12.onrender.com";
const REFRESH_TOKEN = "YOUR_REFRESH_TOKEN_HERE"; // move to env in production

let accessToken: string;

function getTokenFromRedux() {
  var tokenstr = localStorage.getItem("token");
  if (!tokenstr) return null;
  return JSON.parse(tokenstr).access;
}



export async function fetch_review(page: number, limit: number) {
  try {
    let token = getTokenFromRedux();
    console.log(token);

    let res = await fetch(
      `${BASE_URL}/reviews/assigned?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 401) {
      console.warn("⚠️ Token expired. Refreshing...");
      token = getTokenFromRedux();

      res = await fetch(
        `${BASE_URL}/reviews/assigned?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);

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
