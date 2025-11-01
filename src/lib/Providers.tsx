"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { Toaster } from "sonner";
import StoreProvider from "@/redux/StoreProvider/StoreProvider";
import { SessionProvider } from "next-auth/react";
import { RefProvider } from "@/Context/RefContext";
import { useEffect, useState } from "react";

function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen">{children}</div>;
  }

  const lightGradient =
    "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 30%, #e2e8f0 70%, #cbd5e1 100%)";
  const darkGradient =
    "linear-gradient(45deg, #0f172a 0%, #1e293b 30%, #334155 70%, #475569 100%)";

  return (
    <div
      style={{
        background: theme === "dark" ? darkGradient : lightGradient,
      }}
      className="relative min-h-screen text-gray-950 dark:text-fourth transition-all duration-500"
    >
      {children}
    </div>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <StoreProvider>
        <ThemeProvider attribute={"class"} enableSystem defaultTheme="system">
          <RefProvider>
            <Toaster richColors position="top-center" />
            <BackgroundWrapper>{children}</BackgroundWrapper>
          </RefProvider>
        </ThemeProvider>
      </StoreProvider>
    </SessionProvider>
  );
}
