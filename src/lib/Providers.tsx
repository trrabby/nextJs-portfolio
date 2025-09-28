"use client"; // Ensure this runs on the client side

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/store";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider attribute={"class"} enableSystem defaultTheme="system">
          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
