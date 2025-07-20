"use client";

import { AppProvider } from "@/hooks/AppContext";

export default function AppProviderWrapper({ children }) {
  return <AppProvider>{children}</AppProvider>;
}
