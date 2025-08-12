"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Helper to decode JWT payload (Base64 decode)
function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export default function Header() {
  const [managerName, setManagerName] = useState<string>("Manager");
  const router = useRouter();

  useEffect(() => {
    async function fetchManagerName() {
      const tokenString = localStorage.getItem("token");
      if (!tokenString) return;

      let email: string | null = null;
      try {
        const tokenObj = JSON.parse(tokenString);
        const accessToken = tokenObj?.access;

        if (accessToken) {
          const decoded = parseJwt(accessToken);
          email = decoded?.email || null;
        }
      } catch {
        // fallback or ignore
      }

      if (!email) return;

      try {
        // Assuming your backend is at the same origin or adjust baseURL
        const response = await axios.get("/admin/users/", {
          headers: {
            Authorization: `Bearer ${JSON.parse(tokenString).access}`,
          },
        });

        if (response.data && Array.isArray(response.data)) {
          const matchedUser = response.data.find(
            (user: { email: string }) => user.email === email
          );
          if (matchedUser && matchedUser.name) {
            setManagerName(matchedUser.name);
          }
        }
      } catch (err) {
        // handle error if needed
        console.error("Failed to fetch users:", err);
      }
    }

    fetchManagerName();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    router.push("auth/login");
  };

  return (
    <header className="bg-white border-b border-gray-300 flex items-center px-8 py-4">
      {/* Left side: logo */}
      <div className="flex items-center space-x-2 ml-8">
        <img
          src="/images/logo.png"
          alt="A2SV"
          width={100}
          height={75}
          className="h-8"
        />
      </div>

      {/* Center: Dashboard */}
      <div className="flex-grow text-center">
        <a
          href="#"
          className="text-sm text-gray-700 font-medium underline decoration-blue-600"
        >
          Dashboard
        </a>
      </div>

      {/* Right side: nav */}
      <nav className="flex items-center space-x-8 text-sm text-gray-700 font-medium">
        <a href="#" className="text-blue-600 hover:underline">
          Your Profile
        </a>
        <span>{managerName}</span>
        <button
          onClick={handleLogout}
          className="hover:underline text-blue-600 cursor-pointer bg-transparent border-none p-0"
          aria-label="Logout"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
