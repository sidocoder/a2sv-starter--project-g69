"use client";

import React, { useState, useEffect } from "react";
import Header from "@/app/applicant/application/dashboard/components/header";
import PublicFooter from "@/app/applicant/application/dashboard/components/public-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";


const BASE_URL =
  "https://a2sv-application-platform-backend-team12.onrender.com";

// Your constant refresh token (keep this secure)
const REFRESH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NzAzODEzOS1lZTFiLTQ3ZWEtOWI1OS1hM2NkYzY2ZGJlNmUiLCJleHAiOjE3NTU1MDYwNjcsInR5cGUiOiJyZWZyZXNoIn0.1gHoIOGafTTy2d1hfJcuI0nyo5Lkrbv1DYkyevaF-b4";

let accessToken: string;

async function getNewAccessToken() {
  const res = await fetch(`${BASE_URL}/auth/token/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${REFRESH_TOKEN}`,
    },
    body: "",
  });

  const data = await res.json();
  const newAccessToken = data.access || data.data?.access;
  if (!newAccessToken) {
    throw new Error("No access token found in refresh response");
  }
  accessToken = newAccessToken;
  console.log("🔑 New access token obtained from constant refresh token.");
}

async function fetchProfile() {
  try {
    if (!accessToken) {
      await getNewAccessToken();
    }

    let res = await fetch(`${BASE_URL}/profile/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status === 401) {
      console.warn("⚠️ Access token expired. Refreshing...");
      await getNewAccessToken();

      res = await fetch(`${BASE_URL}/profile/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
    }

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Error ${res.status}: ${errText}`);
    }

    const data = await res.json();
    return data.data;
  } catch (err) {
    if (typeof window !== "undefined") {
      alert(`There was an error: ${err}`);
    } else {
      console.error("❌ Fetch profile error:", err);
    }
    return null;
  }
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<{
    full_name: string;
    email: string;
    role: string;
    profile_picture_url?: string;
  } | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile().then((data) => {
      if (data) setProfile(data);
    });
  }, []);

  // Live password validation
  useEffect(() => {
    const errors: string[] = [];

    if (newPassword.length > 0) {
      if (newPassword.length < 8) {
        errors.push("Password must be at least 8 characters.");
      }
      if (!/[A-Z]/.test(newPassword)) {
        errors.push("Password must include at least one uppercase letter.");
      }
      if (!/[0-9]/.test(newPassword)) {
        errors.push("Password must include at least one number.");
      }
      if (!/[!@#$%^&*(),.?\":{}|<>]/.test(newPassword)) {
        errors.push("Password must include at least one special character.");
      }
    }

    setPasswordErrors(errors);
    setPasswordsMatch(confirmNewPassword === newPassword);
  }, [newPassword, confirmNewPassword]);


  // live Email validation
  const [email, setEmail] = React.useState(profile?.email || "");
  const [emailError, setEmailError] = React.useState("");

  // Email validation regex (simple but effective)
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle email input change with validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };


  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Banner and Profile Picture Section */}
          <div className="relative h-40 bg-gray-200">
            <Image
              src={"/placeholder.svg?height=160&width=900"}
              alt="Profile Banner"
              fill
              style={{ objectFit: "cover" }}
              className="absolute inset-0"
            />
            <div className="absolute -bottom-16 left-8">
              <Image
                src={
                  profile.profile_picture_url ||
                  "/placeholder.svg?height=120&width=120"
                }
                alt="Profile Picture"
                width={120}
                height={120}
                className="rounded-full border-4 border-white shadow-md"
              />
            </div>
          </div>

          {/* User Info and Profile Details */}
          <div className="pt-20 pb-8 px-8">
            <h1 className="text-2xl font-bold text-gray-800">
              {profile.full_name}
            </h1>
            <p className="text-gray-600">{profile.email}</p>

            {/* Personal Information Card */}
            <Card className="mt-8 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="full-name" className="text-gray-700">
                    Full name
                  </Label>
                  <Input
                    id="full-name"
                    defaultValue={profile.full_name}
                    className="mt-1 bg-gray-50 border-gray-200"
                  />
                </div>
                <div>
                  <Label htmlFor="email-address" className="text-gray-700">
                    Email address
                  </Label>
                  <Input
                    id="email-address"
                    defaultValue={profile.email}
                    className="mt-1 bg-gray-50 border-gray-200"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="role" className="text-gray-700">
                    Role
                  </Label>
                  <Input
                    id="role"
                    defaultValue={profile.role || "Applicant"}
                    className="mt-1 bg-gray-50 border-gray-200"
                  />
                </div>
                <div className="md:col-span-2 text-right">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Change Password Card */}
            <Card className="mt-8 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="current-password" className="text-gray-700">
                    Current Password
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="Enter current password"
                    className="mt-1"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="new-password" className="text-gray-700">
                    New Password
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                    className="mt-1"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {passwordErrors.length > 0 && (
                    <ul className="text-red-600 text-sm mt-1 list-disc ml-5">
                      {passwordErrors.map((error, i) => (
                        <li key={i}>{error}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Label
                    htmlFor="confirm-new-password"
                    className="text-gray-700"
                  >
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirm-new-password"
                    type="password"
                    placeholder="Confirm new password"
                    className="mt-1"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                  {!passwordsMatch && (
                    <p className="text-red-600 text-sm mt-1">
                      Passwords do not match.
                    </p>
                  )}
                </div>
                <div className="md:col-span-2 text-right">
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    disabled={
                      passwordErrors.length > 0 ||
                      !passwordsMatch ||
                      !currentPassword ||
                      !newPassword ||
                      !confirmNewPassword
                    }
                    onClick={() => {
                      // Handle password change submit here
                      alert("Change Password submitted!");
                    }}
                  >
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
