"use client";
import { useRef } from "react";
import { About } from "./_homePageComponents/About";
import { Home } from "./_homePageComponents/Home";
import SidebarHome from "./_homePageComponents/Sidebar";
import { Contacts } from "./_homePageComponents/Contacts";

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
    <div className="flex w-full ">
      <div className="w-2/12">
        <SidebarHome sectionRefs={sectionRefs} />
      </div>
      <div className="flex-1">
        <section ref={homeRef} className="min-h-screen">
          <Home />
        </section>
        <section ref={aboutRef} className="min-h-screen">
          <About />
        </section>
        <section ref={blogsRef} className="min-h-screen">
          <div>Blogs</div>
        </section>
        <section ref={projectsRef} className="min-h-screen">
          <div>Projects</div>
        </section>
        <section ref={contactsRef} className="min-h-screen">
          <Contacts />
        </section>
      </div>
    </div>
  );
}
