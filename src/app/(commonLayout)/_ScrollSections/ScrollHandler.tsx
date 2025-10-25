// _homePageComponents/_ScrollHandler.tsx
"use client";

import { useEffect } from "react";
import { useScrollToSection } from "@/hooks/useScrollToSection";

export default function ScrollHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const { handleStoredScroll } = useScrollToSection();

  useEffect(() => {
    // Handle any stored scroll sections when home page loads
    handleStoredScroll();
  }, [handleStoredScroll]);

  return <>{children}</>;
}
