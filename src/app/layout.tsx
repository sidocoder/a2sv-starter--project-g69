// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProviderWrapper from "./ProviderWrapper";
import AuthGuard from "./AuthGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your App Title",
  description: "Your App Description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bodyClassName = `${geistSans.variable} ${geistMono.variable}`;

  return (
    <html lang="en">
      <body className={bodyClassName}>
        <ProviderWrapper>
          <AuthGuard>{children}</AuthGuard>
        </ProviderWrapper>
      </body>
    </html>
  );
}
