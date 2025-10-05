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
            {children}
          </RefProvider>
        </ThemeProvider>
      </StoreProvider>
    </SessionProvider>
  );
}
