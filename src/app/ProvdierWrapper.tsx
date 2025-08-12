// app/ProviderWrapper.tsx
"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../store"; 
import { setTokens } from "../store/authSlice";

interface ProviderWrapperProps {
  children: React.ReactNode;
}

export default function ProviderWrapper({ children }: ProviderWrapperProps) {
  useEffect(() => {
    // Hydrate tokens from localStorage on app load (client-side only)
    const tokenString = localStorage.getItem("token");
    if (tokenString) {
      try {
        const tokens = JSON.parse(tokenString);
        if (tokens.access && tokens.refresh) {
          store.dispatch(setTokens(tokens));
        }
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
