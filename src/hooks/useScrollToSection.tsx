import { useSectionRefs } from "@/Context/RefContext";

export const useScrollToSection = () => {
  const { homeRef, aboutRef, blogsRef, projectsRef, contactsRef } =
    useSectionRefs();

  const sectionRefs: Record<string, React.RefObject<HTMLElement | null>> = {
    home: homeRef,
    about: aboutRef,
    blogs: blogsRef,
    projects: projectsRef,
    contacts: contactsRef,
  };

  const scrollToSection = (id: string, navbarHeight = 100) => {
    const section = sectionRefs[id]?.current;
    if (section) {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const currentScrollY = window.scrollY;

      const isScrollingUp = sectionTop < currentScrollY;
      const offset = isScrollingUp ? navbarHeight : 0;
      const top = sectionTop - offset;

      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const scrollToSectionSmDevice = (id: string) => {
    sectionRefs[id]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return { scrollToSection, sectionRefs, scrollToSectionSmDevice };
};
