// _homePageComponents/_ClientSectionRefs.tsx
"use client";

import { useEffect, useRef } from "react";
import { useSectionRefs } from "@/Context/RefContext";

export default function ClientSectionRefs({
  children,
}: {
  children: React.ReactNode;
}) {
  const { homeRef, aboutRef, blogsRef, projectsRef, contactsRef } =
    useSectionRefs();

  // attach refs to sections after render
  const sectionRefs = {
    home: homeRef,
    about: aboutRef,
    blogs: blogsRef,
    projects: projectsRef,
    contacts: contactsRef,
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sections = containerRef.current.querySelectorAll("[data-section]");
    sections.forEach((section) => {
      const key = section.getAttribute(
        "data-section"
      ) as keyof typeof sectionRefs;
      if (key && sectionRefs[key])
        sectionRefs[key].current = section as HTMLElement;
    });
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
