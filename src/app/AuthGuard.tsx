"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

function isTokenExpired(token: string) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

const publicPaths = ["/", "/auth/login", "/auth/register", "/about"]; // add your public routes

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() ?? ""; // Fallback to empty string if null

  useEffect(() => {
    if (!pathname) return; // No path yet, skip

    // Skip token check on public pages
    if (publicPaths.includes(pathname)) return;

    const tokenString = localStorage.getItem("token");

    if (!tokenString) {
      router.push("/auth/login");
      return;
    }

    const tokenObj = JSON.parse(tokenString);
    const { access, refresh } = tokenObj;

    if (isTokenExpired(access)) {
      if (!refresh || isTokenExpired(refresh)) {
        localStorage.removeItem("token");
        router.push("/auth/login");
      }
    }
  }, [pathname, router]);

  return <>{children}</>;
}
