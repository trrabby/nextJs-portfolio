/* eslint-disable react-hooks/exhaustive-deps */
// hooks/useScrollToSection.ts
"use client";

import { useSectionRefs } from "@/Context/RefContext";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useScrollToSection = () => {
  const { homeRef, aboutRef, blogsRef, projectsRef, contactsRef } =
    useSectionRefs();
  const router = useRouter();

  const sectionRefs: Record<string, React.RefObject<HTMLElement | null>> = {
    home: homeRef,
    about: aboutRef,
    blogs: blogsRef,
    projects: projectsRef,
    contacts: contactsRef,
  };

  const performScroll = useCallback(
    (id: string, navbarHeight = 100) => {
      const section = sectionRefs[id]?.current;
      if (section) {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const currentScrollY = window.scrollY;

        const isScrollingUp = sectionTop < currentScrollY;
        const offset = isScrollingUp ? navbarHeight : 0;
        const top = sectionTop - offset;

        window.scrollTo({ top, behavior: "smooth" });
        return true;
      }
      return false;
    },
    [sectionRefs]
  );

  const scrollToSection = useCallback(
    (id: string, navbarHeight = 100) => {
      // Check if we're on home page
      if (window.location.pathname !== "/") {
        sessionStorage.setItem("scrollToSection", id);
        router.push("/");
        return;
      }

      // If on home page, try to scroll
      performScroll(id, navbarHeight);
    },
    [router, performScroll]
  );

  const handleStoredScroll = useCallback(() => {
    const storedSection = sessionStorage.getItem("scrollToSection");
    if (storedSection) {
      // Remove immediately to prevent multiple scrolls
      sessionStorage.removeItem("scrollToSection");

      // Try to scroll with retry logic
      const tryScroll = (attempt = 0) => {
        const success = performScroll(storedSection);

        if (!success && attempt < 3) {
          // Retry after delay if refs aren't ready
          setTimeout(() => tryScroll(attempt + 1), 150 * (attempt + 1));
        }
      };

      tryScroll();
    }
  }, [performScroll]);

  return {
    scrollToSection,
    sectionRefs,
    handleStoredScroll,
  };
};
