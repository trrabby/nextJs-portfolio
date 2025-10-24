// _homePageComponents/ScrollSections.tsx  ✅ Server Component (no "use client")
import { Banner } from "../_homePageComponents/Banner";
import { About } from "../_homePageComponents/About";
import FeaturedBlogs from "../_homePageComponents/FeaturedBlogs";
import Projects from "../_homePageComponents/Projects";
import { Contacts } from "../_homePageComponents/Contacts";
import ClientSectionRefs from "./ClientSectionRefs";

export default function ScrollSections() {
  return (
    <div className="relative bg-fourth dark:bg-gray-900 transition-all duration-500">
      <ClientSectionRefs>
        <section data-section="home" className="min-h-screen">
          <Banner />
        </section>
        <section data-section="about" className="min-h-screen">
          <About />
        </section>
        <section data-section="blogs" className="min-h-screen">
          <FeaturedBlogs />
        </section>
        <section data-section="projects" className="min-h-screen">
          <Projects />
        </section>
        <section data-section="contacts" className="min-h-screen">
          <Contacts />
        </section>
      </ClientSectionRefs>
    </div>
  );
}
