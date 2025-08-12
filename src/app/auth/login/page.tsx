"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./styles";
import { useSelector } from "react-redux";
import { loginUser, setTokens } from "../../../store/authSlice";
import { RootState } from "../../../store";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setInfoMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInfoMessage(null);

    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
      valid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = "Please enter your password";
      valid = false;
    }
    setErrors(newErrors);

    if (!valid) return;

    try {
      const resultAction = await dispatch(loginUser(formData));
      if (loginUser.fulfilled.match(resultAction)) {
        const { role, access, refresh } = resultAction.payload.data;
        dispatch(setTokens({ access, refresh, role }));

        if (!role) {
          setInfoMessage(
            "Your account has no role assigned yet. Please register or contact support."
          );
          return;
        }

        // Redirect based on role
        if (role === "admin") router.push("/admin");
        else if (role === "reviewer") router.push("/reviewer");
        else if (role === "manager") router.push("/manager");
        else router.push("/applicant");
      } else {
        setInfoMessage("Login failed. Please try to register first.");
      }
    } catch (err) {
      let errorMsg = "Login failed. Please try again.";
      if (typeof err === "string") errorMsg = err;
      else if (err && typeof err === "object" && "message" in err)
        errorMsg = (err as { message: string }).message;

      setInfoMessage(errorMsg);
    }
  };

  function getErrorMessage(err: unknown): string {
    if (!err) return "";
    if (typeof err === "string") return err;
    if (
      typeof err === "object" &&
      err !== null &&
      "message" in err &&
      typeof (err as { message?: unknown }).message === "string"
    ) {
      return (err as { message: string }).message;
    }
    try {
      return JSON.stringify(err);
    } catch {
      return String(err);
    }
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div>
          <Image
            src="/images/logo.png"
            alt="A2SV Logo"
            width={0}
            height={0}
            sizes="100%"
            className="h-8 w-auto"
          />
        </div>
        <nav className={styles.nav}>
          <a href="#" className="hover:underline">
            The Journey
          </a>
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Testimonials
          </a>
          <a href="./register" className={styles.createAccount}>
            Create Account
          </a>
        </nav>
      </header>

      {/* Login Form */}
      <main className={styles.main}>
        <div className={styles.formWrapper}>
          <div className={styles.formLogo}>
            <Image
              src="/images/logo.png"
              alt="A2SV Logo"
              width={0}
              height={0}
              sizes="100vw"
              className="h-8 w-auto"
            />
          </div>
          <h2 className={styles.formTitle}>Sign in to your account</h2>
          <p className={styles.formLinks}>
            <a href="#" className="text-indigo-600 hover:underline">
              Back to Home
            </a>{" "}
            |{" "}
            <a href="./register" className="text-indigo-600 hover:underline">
              Create a new applicant account
            </a>
          </p>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="user@example.com"
                className={styles.input}
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="password123"
                className={styles.input}
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className={styles.options}>
              <label className={styles.remember}>
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a
                href="./forgot_password"
                className="text-sm text-indigo-600 hover:underline"
              >
                Forgot your password?
              </a>
            </div>

            <div>
              <button type="submit" className={styles.submit} disabled={loading}>
                <Image
                  src="/images/logo.png"
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="absolute left-4"
                  unoptimized
                />
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2">{getErrorMessage(error)}</p>
            )}

            {infoMessage && (
              <p className="text-yellow-600 text-sm mt-2">{infoMessage}</p>
            )}
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
        <div className={styles.copyright}>
          &copy; 2023 A2SV. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
