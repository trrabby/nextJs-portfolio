// _ConditionalCommonLayout/ConditionalLayout.tsx
import Navbar from "../_homePageComponents/_Navbar/Navbar";
import { Footer } from "../_homePageComponents/Footer";
import SidebarDrawer from "../_homePageComponents/_Sidebar/SidebarDrawer";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sticky hidden md:flex top-0 w-full z-50">
        <Navbar />
      </div>
      <div className="fixed flex md:hidden top-0 left-4 z-50 bg-transparent">
        <SidebarDrawer />
      </div>
      <div>{children}</div>
      <Footer />
    </>
  );
}
