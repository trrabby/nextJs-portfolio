"use client"; // Ensure this runs on the client side

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import StoreProvider from "@/redux/StoreProvider/StoreProvider";
import { SessionProvider } from "next-auth/react";
import { RefProvider } from "@/Context/RefContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <StoreProvider>
        <ThemeProvider attribute={"class"} enableSystem defaultTheme="system">
          <RefProvider>
            <Toaster richColors position="top-center" />
            <div className="relative bg-fourth/50 dark:bg-gray-900 text-gray-950 dark:text-fourth transition-all duration-500">
              {children}
            </div>
          </RefProvider>
        </ThemeProvider>
      </StoreProvider>
    </SessionProvider>
  );
}
