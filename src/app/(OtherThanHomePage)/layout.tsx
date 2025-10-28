import Navbar from "../(CommonLayout)/_homePageComponents/_Navbar/Navbar";
import SidebarDrawer from "../(CommonLayout)/_homePageComponents/_Sidebar/SidebarDrawer";
import { Footer } from "../(CommonLayout)/_homePageComponents/Footer";

// _ConditionalCommonLayout/ConditionalLayout.tsx
export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="sticky hidden md:flex top-0 w-full z-50">
        <Navbar />
      </div>
      <div className="fixed flex md:hidden top-0 left-4 z-50 bg-transparent">
        <SidebarDrawer />
      </div>
      <div className="md:pt-10">{children}</div>
      <Footer />
    </>
  );
}
