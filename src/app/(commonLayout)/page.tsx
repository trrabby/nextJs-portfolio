"use client";
import { useEffect, useRef, useState } from "react";
import { About } from "./_homePageComponents/About";
import { Home } from "./_homePageComponents/Home";
import Navbar from "./_homePageComponents/Navbar";
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

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false); // Hide on scroll down
      } else {
        setShowNavbar(true); // Show on scroll up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`w-full relative ${
        showNavbar
          ? "transform -translate-y-0 duration-300"
          : "transform -translate-y-24 duration-300"
      }`}
    >
      <div className="sticky top-0 w-2/12 md:w-full z-50">
        <Navbar sectionRefs={sectionRefs} />
      </div>
      <div className="relative">
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
