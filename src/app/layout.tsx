import type { Metadata } from "next";
import ProviderWrapper from "./ProviderWrapper";
<<<<<<< HEAD
import "./globals.css";

export const metadata: Metadata = {
  title: "A2SV Starter Project",
  description: "A2sv application",
=======
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
  title: "A2SV Application",
  description: "A2SV application for managing users and admin tasks",
>>>>>>> 15c7c73c1960e832199ff4c35a46c5cb93482e94
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
<<<<<<< HEAD
  return (
    <html lang="en">
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
=======

  const bodyClassName = `${geistSans.variable} ${geistMono.variable}`;

  return (
    <html lang="en">
      <body className={bodyClassName}>
        <ProviderWrapper>
          <AuthGuard>{children}</AuthGuard>
        </ProviderWrapper>
>>>>>>> 15c7c73c1960e832199ff4c35a46c5cb93482e94
      </body>
    </html>
  );
}
