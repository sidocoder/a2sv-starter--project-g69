"use client";

import { useState } from "react";
import styles from "../login/styles";
import Image from "next/image";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await axios.post(
        "https://a2sv-application-platform-backend-team12.onrender.com/auth/forgot-password/",
        {
          email,
          callback_url: `${window.location.origin}/auth/reset_password`
        }
      );

      setMessage(
        "If this email is registered, you will receive a reset link shortly."
      );
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Something went wrong.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 overflow-y-auto">
      {/* Navbar */}
      <header className="w-full border-b bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="A2SV Logo" className="h-8" />
          </div>
          <nav className="flex space-x-6 text-gray-700">
            <a href="#" className="hover:text-gray-900">Home</a>
            <a href="#" className="hover:text-gray-900">About</a>
            <a href="#" className="hover:text-gray-900">Success Stories</a>
            <a
              href="#"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
            >
              Apply Now
            </a>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-col items-center justify-center flex-grow px-6 py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
          <div className="flex justify-center mb-4">
            <img src="/images/logo.png" alt="A2SV Logo" className="h-12" />
          </div>

          <h2 className="text-xl font-bold text-center mb-2">
            Forgot your password?
          </h2>
          <p className="text-center text-gray-600 mb-6 text-sm">
            Enter your email and we’ll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>

          {message && <p className="mt-4 text-green-600 text-sm text-center">{message}</p>}
          {error && <p className="mt-4 text-red-600 text-sm text-center">{error}</p>}

          <div className="text-center mt-4">
            <a href="./login" className="text-indigo-600 hover:underline">
              Back to login
            </a>
          </div>
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
        <div className={styles.copyright}>
          &copy; 2023 A2SV. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
