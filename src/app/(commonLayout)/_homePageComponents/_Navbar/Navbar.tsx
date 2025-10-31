/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import profileImg from "../../../../../public/portfolioAssets/SiteLog/t3.png";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import { SlSocialLinkedin } from "react-icons/sl";
import { FaGithub } from "react-icons/fa";
import styles from "../../styles.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { selectCurrentUser, setUser } from "@/redux/features/auth/authSlice";
import { PiSignInBold } from "react-icons/pi";
import Tooltip from "@mui/material/Tooltip";
import StatusVariantSquare from "./StatusVariantSquare";
import DashboardMenu from "./DashboardMenu";
import { useSession } from "next-auth/react";
import { getMyProfileByEmail } from "@/services/Users";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import ThemeToggler from "../_ThemeController/ThemeToggler";

const navlinks = [
  { id: "home", name: "Home" },
  { id: "about", name: "About" },
  { id: "blogs", name: "Blogs", hasSubmenu: true },
  { id: "projects", name: "Projects", hasSubmenu: true },
  { id: "hireMe", name: "Hire Me" },
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

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [DashboardOpen, setDashboardOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const { scrollToSection } = useScrollToSection();

  useEffect(() => {
    const syncReduxUser = async () => {
      if (status === "authenticated" && session?.user?.email) {
        const userProfile = await getMyProfileByEmail(session.user.email);
        dispatch(
          setUser({
            user: userProfile.data,
            token: "oauth",
          })
        );
      }
    };
    syncReduxUser();
  }, [session, status, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
        setActiveSubmenu(null);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleSubmenuAction = (item: TSubmenuItem) => {
    if (item.type === "scroll") item.action();
    setActiveSubmenu(null);
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
    <div
      className={`${
        styles.navbar_backdrop
      } dark:bg-gray-950 flex flex-row justify-between items-center p-2 w-2/12 md:w-full transition-all duration-300 ${
        showNavbar ? "md:translate-y-0" : "-translate-y-0 md:-translate-y-24"
      }`}
    >
      {/* Logo */}
      <div className="flex justify-center items-center border-fourth">
        <Link href={"/"}>
          <Image
            alt="Site Logo"
            src={profileImg}
            height={60}
            width={200}
            priority
          />
        </Link>
      </div>

      {/* Navlinks */}
      <div className="flex flex-col md:flex-row gap-3 text-fourth text-lg text-right relative">
        {navlinks.map(({ id, name, hasSubmenu }) => (
          <div
            key={id}
            className="relative group"
            onMouseEnter={() => hasSubmenu && setActiveSubmenu(id)}
            onMouseLeave={() => hasSubmenu && setActiveSubmenu(null)}
          >
            <button
              onClick={() => !hasSubmenu && scrollToSection(id)}
              className={`${styles.animated_underline} p-2 pr-4 rounded-md font-bold transition-all duration-300 hover:text-accent hover:scale-110 relative flex items-center gap-1`}
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
                className={`${styles.submenuContent} absolute top-full right-0 mt-1 shadow-lg z-50`}
              >
                {getSubmenuItems(id).map((item, index) =>
                  item.type === "link" && item.href ? (
                    <Link
                      key={index}
                      href={item.href}
                      className={`${styles.submenuItem} block text-right w-full`}
                      onClick={() => setActiveSubmenu(null)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      key={index}
                      onClick={() => handleSubmenuAction(item)}
                      className={`${styles.submenuItem} block text-right w-full`}
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

      {/* Social Icons */}
      <div className="flex gap-2 justify-between items-center">
        {social.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            target="_blank"
            className="hover:bg-third hover:scale-125 hover:duration-500 hover:text-primary w-8 h-8 text-white flex justify-center items-center rounded-lg"
          >
            {item.logo}
          </Link>
        ))}
      </div>

      {/* User Section */}
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
          <Link className={styles.animated_underline} href={"/login"}>
            <Tooltip title="Sign in">
              <PiSignInBold className="hover:scale-125 hover:duration-500 dark:hover:text-third w-8 h-8 text-white text-center rounded-lg hover:shadow-lg hover:p-1" />
            </Tooltip>
          </Link>
        )}
        <ThemeToggler />
      </div>

      <div className={`${styles.triangle} ${styles.navbar_backdrop_sm}`}></div>
    </div>
  );
}
