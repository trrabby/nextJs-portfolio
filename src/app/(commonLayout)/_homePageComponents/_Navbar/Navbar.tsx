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
import { getMyProfileByEmail } from "@/services/Users"; // ✅ new import
import { useScrollToSection } from "@/hooks/ScrollToSection";
import ThemeToggler from "../_ThemeController/ThemeToggler";

const navlinks = [
  { id: "home", name: "Home" },
  { id: "about", name: "About" },
  { id: "blogs", name: "Blogs" },
  { id: "projects", name: "Projects" },
  { id: "contacts", name: "Contacts" },
];

type TSocialProps = {
  logo: React.ReactNode;
  href: string;
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
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const { scrollToSection } = useScrollToSection(); //hook to scroll to sections

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

  // Scroll hide/show behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // ✅ Updated scrollToSection function

  // const scrollToSection = (id: string) => {
  //   const refMap: Record<string, React.RefObject<HTMLElement | null>> = {
  //     home: homeRef,
  //     about: aboutRef,
  //     blogs: blogsRef,
  //     projects: projectsRef,
  //     contacts: contactsRef,
  //   };

  //   const section = refMap[id]?.current;
  //   if (section) {
  //     const navbarHeight = 100; // Adjust to actual height
  //     const sectionTop = section.getBoundingClientRect().top + window.scrollY;
  //     const currentScrollY = window.scrollY;

  //     // Scroll direction logic
  //     const isScrollingUp = sectionTop < currentScrollY;
  //     const offset = isScrollingUp ? navbarHeight : 0;
  //     const top = sectionTop - offset;

  //     window.scrollTo({ top, behavior: "smooth" });
  //   }
  // };

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
      <div className="flex flex-col md:flex-row gap-3 text-fourth text-lg text-right">
        {navlinks.map(({ id, name }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`${styles.animated_underline} p-2 pr-4 rounded-md text-right font-bold transition-all duration-300 hover:text-accent hover:ease-linear hover:scale-110 relative group`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Social Icons */}
      <div className="flex gap-2 justify-between items-center">
        {social.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            target="_blank"
            className="hover:bg-third hover:scale-125 hover:duration-500 hover:text-primary w-8 h-8 text-white text-center flex justify-center items-center rounded-lg"
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
          <Link className={`${styles.animated_underline}`} href={"/login"}>
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
