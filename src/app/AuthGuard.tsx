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
  const pathname = usePathname();

  useEffect(() => {
    // Skip token check on public pages
    if (publicPaths.includes(pathname)) return;

    const tokenString = localStorage.getItem("token");

    if (!tokenString) {
      // No token and on protected route: redirect to login
      router.push("/auth/login");
      return;
    }

    const tokenObj = JSON.parse(tokenString);
    const { access, refresh } = tokenObj;

    if (isTokenExpired(access)) {
      if (!refresh || isTokenExpired(refresh)) {
        // Both tokens expired → logout and redirect
        localStorage.removeItem("token");
        router.push("/auth/login");
      } 
      // else: refresh token valid → do nothing here, silent refresh handled elsewhere
    }
  }, [pathname, router]);

  return <>{children}</>;
}
