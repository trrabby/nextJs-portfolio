/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import profileImg from "../../../../../public/portfolioAssets/SiteLog/t3.png";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import { SlSocialLinkedin } from "react-icons/sl";
import { FaGithub } from "react-icons/fa";
import styles from "../../styles.module.css";
import { useTheme } from "next-themes";
import ThemeToggler from "../_ThemeController/ThemeToggler";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import StatusVariantSquare from "../_Navbar/StatusVariantSquare";
import DashboardMenu from "../_Navbar/DashboardMenu";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { PiSignInBold } from "react-icons/pi";

const navlinks = [
  { id: "home", name: "Home" },
  { id: "about", name: "About" },
  { id: "blogs", name: "Blogs", hasSubmenu: true },
  { id: "projects", name: "Projects", hasSubmenu: true },
  { id: "contacts", name: "Contacts" },
];

type TSocialProps = {
  logo: React.ReactNode;
  href: string;
};

type TSubmenuItem = {
  name: string;
  action: () => void;
  type: "scroll" | "link";
  href?: string;
};

const social: TSocialProps[] = [
  { logo: <FiFacebook />, href: "https://facebook.com/profile.trrabby" },
  { logo: <SlSocialLinkedin />, href: "https://linkedin.com/in/towfiqueWeb" },
  { logo: <FaGithub />, href: "https://github.com/trrabby" },
  { logo: <FiTwitter />, href: "https://twitter.com/towfique_veer" },
];

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { scrollToSection } = useScrollToSection();
  const user = useAppSelector(selectCurrentUser);
  const { theme } = useTheme();
  const [DashboardOpen, setDashboardOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const handleSubmenuAction = (item: TSubmenuItem) => {
    if (item.type === "scroll") item.action();
    setActiveSubmenu(null);
    onClose();
  };

  const blogsSubmenu: TSubmenuItem[] = [
    {
      name: "Featured Blogs",
      action: () => scrollToSection("blogs"),
      type: "scroll",
    },
    { name: "All Blogs", action: () => {}, type: "link", href: "/blogs" },
  ];

  const projectsSubmenu: TSubmenuItem[] = [
    {
      name: "Featured Projects",
      action: () => scrollToSection("projects"),
      type: "scroll",
    },
    { name: "All Projects", action: () => {}, type: "link", href: "/projects" },
  ];

  const getSubmenuItems = (menuId: string): TSubmenuItem[] => {
    switch (menuId) {
      case "blogs":
        return blogsSubmenu;
      case "projects":
        return projectsSubmenu;
      default:
        return [];
    }
  };

  return (
    <div className="flex">
      {open && (
        <div
          onClick={() => onClose()}
          className="w-4/12 h-screen fixed inset-0 bg-opacity-40 z-40"
        ></div>
      )}

      <div
        className={`${styles.navbar_backdrop_sm} ${
          open
            ? "fixed right-0 top-0 z-50 duration-500 flex flex-col justify-between"
            : "fixed translate-y-[1000px] right-0 duration-500 top-0"
        } flex flex-col justify-between h-[calc(100vh-70px)] shadow-2xl shadow-primary bg-transparent rounded-l-2xl w-8/12 p-4`}
      >
        {/* Logo */}
        <div>
          <Link href={"/"}>
            <Image
              className="p-2"
              alt="Site Logo"
              src={profileImg}
              width={180}
              height={60}
            />
          </Link>
        </div>

        {/* Navlinks with submenu */}
        <div className="flex flex-col gap-3 text-primary dark:text-fourth text-2xl text-left font-mono">
          {navlinks.map(({ id, name, hasSubmenu }) => (
            <div key={id} className="relative">
              <button
                onClick={() => {
                  if (hasSubmenu)
                    setActiveSubmenu(activeSubmenu === id ? null : id);
                  else {
                    scrollToSection(id);
                    onClose();
                  }
                }}
                className={`${styles.animated_underline} p-2 pr-4 rounded-md text-left font-bold transition-all duration-300 hover:text-accent hover:ease-linear hover:scale-110 flex items-center justify-between`}
              >
                {name}
                {hasSubmenu && (
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeSubmenu === id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </button>

              {hasSubmenu && activeSubmenu === id && (
                <div
                  className={`${styles.submenuContent} pl-6 mt-1 flex flex-col gap-1`}
                >
                  {getSubmenuItems(id).map((item, index) =>
                    item.type === "link" && item.href ? (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={() => {
                          handleSubmenuAction(item);
                        }}
                        className={`${styles.submenuItem} block w-full text-left text-sm text-nowrap duration-300`}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <button
                        key={index}
                        onClick={() => handleSubmenuAction(item)}
                        className={`${styles.submenuItem} block text-left w-full text-sm text-nowrap duration-300`}
                      >
                        {item.name}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Theme toggler */}
        <div className="text-gray-950 dark:text-fourth transition-all duration-300 font-mono mt-4">
          <hr className="border border-gray-950 dark:border-fourth mb-2" />
          <div className="flex gap-3 justify-center items-center">
            <p className="flex gap-2">
              Switch to{" "}
              {theme === "dark" ? <span>Light</span> : <span>Dark</span>}
            </p>
            <ThemeToggler />
          </div>
          <hr className="border border-gray-950 dark:border-fourth mt-2 mb-2" />
        </div>

        {/* User section */}
        <div className="flex items-center justify-center gap-2">
          {user ? (
            <div onClick={() => setDashboardOpen(!DashboardOpen)}>
              <StatusVariantSquare img={user.imgUrl!} />
              <DashboardMenu
                open={DashboardOpen}
                setDashboardOpen={setDashboardOpen}
              />
            </div>
          ) : (
            <Link
              onClick={() => onClose()}
              className={`${styles.animated_underline} text-gray-950 dark:text-fourth transition-all duration-300 font-mono`}
              href={"/login"}
            >
              <div className="flex gap-3 justify-center items-center">
                <p className="flex gap-2">Sign In</p>
                <Tooltip title="Sign in">
                  <PiSignInBold className="hover:scale-125 hover:duration-500 dark:hover:text-third w-8 h-8 text-white text-center rounded-lg hover:shadow-lg hover:p-1" />
                </Tooltip>
              </div>
            </Link>
          )}
        </div>

        {/* Social icons */}
        <div className="flex gap-2 justify-between items-center text-gray-950 dark:text-fourth transition-all duration-300 mt-3">
          {social.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              className="hover:bg-third hover:scale-125 hover:duration-500 hover:text-primary w-8 h-8 text-center flex justify-center items-center rounded-lg"
            >
              {item.logo}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
