// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProviderWrapper from "./ProviderWrapper";

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
  // Make sure the class names are stable strings, no dynamic runtime changes
  const bodyClassName = `${geistSans.variable} ${geistMono.variable}`;

  return (
    <html lang="en">
      <body className={bodyClassName}>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
