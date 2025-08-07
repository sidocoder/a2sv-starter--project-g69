"use client";

import React, { useState } from "react";

import Image from "next/image";
import styles from "./styles";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
      valid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = "Please enter your password";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      console.log("Form submitted", formData);
    }
  };
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
          <a href="#" className={styles.createAccount}>
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
            <a href="#" className="text-indigo-600 hover:underline">
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
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Forgot your password?
              </a>
            </div>
            <div>
              <button type="submit" className={styles.submit}>
                <Image
                  src="/images/lock.png"
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="absolute left-4"
                  unoptimized
                />
                Sign in
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div>
            <div className={styles.footerLogo}>
              <Image
                src="/images/logo1.png"
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
