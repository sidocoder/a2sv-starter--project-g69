"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "../login/styles";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name";
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
      valid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = "Please enter your password";
      valid = false;
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      // Do something with valid form (e.g., send to server)
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
            Sign in
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
          <h2 className={styles.formTitle}>Create a new applicant account</h2>
          <p className={styles.formLinks}>
            <a href="#" className="gray">
              Or
            </a>{" "}
            <a href="#" className="text-indigo-600 hover:underline">
              Sign in to your existing account
            </a>
          </p>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Full name"
                className={styles.input}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                className={styles.input}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className={styles.input}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className={styles.input}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <div>
              <button type="submit" className={`${styles.submit} mt-8`}>
                Create Account
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
