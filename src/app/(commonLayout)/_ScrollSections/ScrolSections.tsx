// _homePageComponents/ScrollSections.tsx  ✅ Server Component (no "use client")
import { Banner } from "../_homePageComponents/Banner";
import { About } from "../_homePageComponents/About";
import FeaturedBlogs from "../_homePageComponents/FeaturedBlogs";
import { Contacts } from "../_homePageComponents/Contacts";
import ClientSectionRefs from "./ClientSectionRefs";
import FeaturedProjects from "../_homePageComponents/FeaturedProjects";

export default function ScrollSections() {
  return (
    <div>
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
          <FeaturedProjects />
        </section>
        <section data-section="contacts" className="min-h-screen">
          <Contacts />
        </section>
      </ClientSectionRefs>
    </div>
  );
}
