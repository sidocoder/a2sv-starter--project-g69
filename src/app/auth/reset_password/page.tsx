"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // Next.js 13+ hooks
import styles from "../login/styles";
import Image from "next/image";
import axios from "axios";

const NewPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Get token from query params
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!token) {
      setError("Reset token is missing or invalid.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "https://a2sv-application-platform-backend-team12.onrender.com/auth/reset-password",
        {
          token,
          new_password: newPassword,
        }
      );

      // Redirect immediately on success
      router.push("../../applicant/application/dashboard/success");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to reset password.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to reset password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-end p-4 bg-white shadow">
        <nav className="space-x-8 text-sm font-medium">
          <a href="#" className="text-gray-900 hover:underline">
            Home
          </a>
          <a href="#" className="text-gray-900 hover:underline">
            About
          </a>
          <a href="#" className="text-gray-900 hover:underline">
            Success Stories
          </a>
          <a
            href="#"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Apply Now
          </a>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="max-w-md w-full bg-gray-100 p-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex items-center space-x-2">
              <img src="/images/logo.png" alt="A2SV Logo" className="h-8" />
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-1">Set a new password</h2>
          <p className="text-gray-600 mb-6 text-sm">
            Please choose a strong, new password for your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-indigo-500"
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-indigo-500"
              required
            />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div>
            <div className={styles.footerLogo}>
              <Image
                src="/images/A2SV.png"
                alt="A2SV Logo"
                width={0}
                height={0}
                sizes="100vw"
                className="h-8 w-auto"
              />
            </div>
            <p>Preparing Africa’s top tech talent for global opportunities.</p>
          </div>
          <div>
            <h4 className={styles.footerSectionTitle}>SOLUTIONS</h4>
            <ul className="space-y-1">
              <li>Student Training</li>
              <li>Corporate Partnership</li>
            </ul>
          </div>
          <div>
            <h4 className={styles.footerSectionTitle}>SUPPORT</h4>
            <ul className="space-y-1">
              <li>Contact Us</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h4 className={styles.footerSectionTitle}>COMPANY</h4>
            <ul className="space-y-1">
              <li>About</li>
              <li>Blog</li>
            </ul>
          </div>
        </div>
        <div className={styles.copyright}>&copy; 2023 A2SV. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default NewPasswordPage;
