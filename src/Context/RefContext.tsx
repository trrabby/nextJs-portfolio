"use client";
import React, { createContext, useRef, useContext, RefObject } from "react";

type SectionRefs = {
  homeRef: RefObject<HTMLElement | null>;
  aboutRef: RefObject<HTMLElement | null>;
  blogsRef: RefObject<HTMLElement | null>;
  projectsRef: RefObject<HTMLElement | null>;
  hireMeRef: RefObject<HTMLElement | null>;
  contactsRef: RefObject<HTMLElement | null>;
};

const RefContext = createContext<SectionRefs | null>(null);

export const RefProvider = ({ children }: { children: React.ReactNode }) => {
  const homeRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const blogsRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const hireMeRef = useRef<HTMLElement | null>(null);
  const contactsRef = useRef<HTMLElement | null>(null);

  const sectionRefs: SectionRefs = {
    homeRef,
    aboutRef,
    blogsRef,
    projectsRef,
    hireMeRef,
    contactsRef,
  };

  return (
    <RefContext.Provider value={sectionRefs}>{children}</RefContext.Provider>
  );
};

export const useSectionRefs = () => {
  const context = useContext(RefContext);
  // console.log("Context Value:", context);
  if (!context) {
    throw new Error("useSectionRefs must be used within RefProvider");
  }
  return context;
};
