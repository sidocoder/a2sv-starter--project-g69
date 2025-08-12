import type { Metadata } from "next";
import ProviderWrapper from "./ProviderWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "A2SV Starter Project",
  description: "A2sv application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
