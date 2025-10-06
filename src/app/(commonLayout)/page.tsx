"use client";
import { About } from "./_homePageComponents/About";
import { Contacts } from "./_homePageComponents/Contacts";
import Projects from "./_homePageComponents/Projects";
import Blogs from "./_homePageComponents/Blogs";
import { Banner } from "./_homePageComponents/Banner";
import { useSectionRefs } from "@/Context/RefContext";
import ConditionalLayout from "./_ConditionalCommonLayout/ConditionalLayout";

export default function Page() {
  const { homeRef, aboutRef, blogsRef, projectsRef, contactsRef } =
    useSectionRefs();

  return (
    <ConditionalLayout>
      <div className="relative bg-fourth dark:bg-gray-900 transition-all duration-500">
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
      </div>
    </ConditionalLayout>
  );
}
