"use client";
import React from "react";
import { useRef } from "react";
import { About } from "./_homePageComponents/About";

import Navbar from "./_homePageComponents/Navbar";
import { Contacts } from "./_homePageComponents/Contacts";
import Projects from "./_homePageComponents/Projects";
import Blogs from "./_homePageComponents/Blogs";
import SidebarDrawer from "./_homePageComponents/_Sidebar_Drawer/SidebarDrawer";
import { Footer } from "./_homePageComponents/Footer";
import { Banner } from "./_homePageComponents/Banner";

// In page.tsx
export default function Page() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const blogsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactsRef = useRef(null);

  const sectionRefs = {
    home: homeRef,
    about: aboutRef,
    blogs: blogsRef,
    projects: projectsRef,
    contacts: contactsRef,
  };

  return (
    <div className="w-full relative">
      <div className="sticky hidden md:flex top-0 w-2/12 md:w-full z-50">
        <Navbar sectionRefs={sectionRefs} />
      </div>
      <div className="fixed flex md:hidden top-0 left-4 z-50 bg-transparent">
        <SidebarDrawer sectionRefs={sectionRefs} />
      </div>
      <div className="relative bg-fourth dark:bg-gray-900">
        <section ref={homeRef} className="min-h-screen">
          <Banner />
        </section>
        <section ref={aboutRef} className="min-h-screen">
          <About />
        </section>
        <section ref={blogsRef} className="min-h-screen">
          <Blogs />
        </section>
        <section ref={projectsRef} className="min-h-screen">
          <Projects />
        </section>
        <section ref={contactsRef} className="min-h-screen">
          <Contacts />
        </section>
        <Footer sectionRefs={sectionRefs} />
      </div>
    </div>
  );
}
