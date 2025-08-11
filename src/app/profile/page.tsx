"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import Header from "@/app/applicant/application/dashboard/components/header";
import PublicFooter from "@/app/applicant/application/dashboard/components/public-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const BASE_URL = "https://a2sv-application-platform-backend-team12.onrender.com";

const REFRESH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NzAzODEzOS1lZTFiLTQ3ZWEtOWI1OS1hM2NkYzY2ZGJlNmUiLCJleHAiOjE3NTU1MDYwNjcsInR5cGUiOiJyZWZyZXNoIn0.1gHoIOGafTTy2d1hfJcuI0nyo5Lkrbv1DYkyevaF-b4";

let accessToken: string;

interface Profile {
  full_name: string;
  email: string;
  role: string;
  profile_picture_url?: string;
}

async function getNewAccessToken(): Promise<void> {
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
}

async function fetchProfile(): Promise<Profile> {
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
}

async function updateProfile(formData: { full_name: string; email: string }): Promise<Profile> {
  if (!accessToken) {
    await getNewAccessToken();
  }
  let res = await fetch(`${BASE_URL}/profile/me`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (res.status === 401) {
    await getNewAccessToken();
    res = await fetch(`${BASE_URL}/profile/me`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  }
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Error ${res.status}: ${errText}`);
  }
  const data = await res.json();
  return data.data;
}

async function changePassword(
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
): Promise<any> {
  if (!accessToken) {
    await getNewAccessToken();
  }

  if (newPassword !== confirmPassword) {
    throw new Error("New password and confirmation do not match");
  }

  const res = await fetch(`${BASE_URL}/profile/change-password`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      current_password: currentPassword,
      new_password: newPassword,
      confirm_new_password: confirmPassword,
    }),
  });

  if (res.status === 401) {
    await getNewAccessToken();
    return changePassword(currentPassword, newPassword, confirmPassword);
  }

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Error ${res.status}: ${errText}`);
  }

  return await res.json();
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState<{ full_name: string; email: string; role: string }>({
    full_name: "",
    email: "",
    role: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile()
      .then((data) => {
        setProfile(data);
        setForm({
          full_name: data.full_name,
          email: data.email,
          role: data.role || "Applicant",
        });
      })
      .catch((err: unknown) => {
        if (err instanceof Error) setError(err.message);
        else setError(String(err));
      })
      .finally(() => setLoading(false));
  }, []);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const updated = await updateProfile({
        full_name: form.full_name,
        email: form.email,
      });
      setProfile(updated);          
      alert("Profile updated successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword() {
    setPasswordError(null);
    setChangingPassword(true);
    try {
      await changePassword(
        passwordForm.current_password,
        passwordForm.new_password,
        passwordForm.confirm_new_password
      );
      alert("Password changed successfully!");
      setPasswordForm({
        current_password: "",
        new_password: "",
        confirm_new_password: "",
      });
    } catch (err: unknown) {
      if (err instanceof Error) setPasswordError(err.message);
      else setPasswordError(String(err));
    } finally {
      setChangingPassword(false);
    }
  }

  if (loading) return <p className="p-4">Loading profile...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;
  if (!profile) return <p className="p-4 text-gray-600">No profile data available.</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Banner and Profile Picture Section */}
          <div className="relative h-40 bg-gray-200">
            <Image
              src={profile.profile_picture_url || "/placeholder.svg?height=120&width=120"}
              alt="Profile Picture"
              width={900}
              height={160}
              className="absolute inset-0 object-cover w-full h-full"
            />
            <div className="absolute -bottom-16 left-8">
              <Image
                src={profile.profile_picture_url || "/placeholder.svg?height=120&width=120"}
                alt="Profile Picture"
                width={120}
                height={120}
                className="rounded-full border-4 border-white shadow-md"
              />
            </div>
          </div>

          {/* User Info and Profile Details */}
          <div className="pt-20 pb-8 px-8">
            <h1 className="text-2xl font-bold text-gray-800">{profile.full_name}</h1>
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
                  <Label htmlFor="full_name" className="text-gray-700">
                    Full name
                  </Label>
                  <Input
                    id="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    className="mt-1 bg-white border-gray-200"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    className="mt-1 bg-white border-gray-200"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="role" className="text-gray-700">
                    Role
                  </Label>
                  <Input
                    id="role"
                    value={form.role}
                    onChange={handleChange}
                    className="mt-1 bg-gray-50 border-gray-200"
                  />
                </div>
                <div className="md:col-span-2 text-right">
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
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
                  <Label htmlFor="current_password" className="text-gray-700">
                    Current Password
                  </Label>
                  <Input
                    id="current_password"
                    type="password"
                    placeholder="Enter current password"
                    value={passwordForm.current_password}
                    onChange={handlePasswordChange}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="new_password" className="text-gray-700">
                    New Password
                  </Label>
                  <Input
                    id="new_password"
                    type="password"
                    placeholder="Enter new password"
                    value={passwordForm.new_password}
                    onChange={handlePasswordChange}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="confirm_new_password" className="text-gray-700">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirm_new_password"
                    type="password"
                    placeholder="Confirm new password"
                    value={passwordForm.confirm_new_password}
                    onChange={handlePasswordChange}
                    className="mt-1"
                  />
                </div>
                {passwordError && (
                  <p className="md:col-span-2 text-red-600">{passwordError}</p>
                )}
                <div className="md:col-span-2 text-right">
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={handleChangePassword}
                    disabled={changingPassword}
                  >
                    {changingPassword ? "Changing..." : "Change Password"}
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
