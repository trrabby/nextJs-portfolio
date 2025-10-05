/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import profileImg from "../../../../../public/portfolioAssets/SiteLog/t3.png";
import { FiFacebook } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";
import { SlSocialLinkedin } from "react-icons/sl";
import { FaGithub } from "react-icons/fa";
import styles from "../../styles.module.css";
import { useTheme } from "next-themes";
import ThemeToggler from "../_ThemeController/ThemeToggler";
import { useScrollToSection } from "@/hooks/ScrollToSection";
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
  { id: "blogs", name: "Blogs" },
  { id: "projects", name: "Projects" },
  { id: "contacts", name: "Contacts" },
];

type TSocialProps = {
  logo: React.ReactNode;
  href: string;
};
const social: TSocialProps[] = [
  {
    logo: <FiFacebook />,
    href: "https://facebook.com/profile.trrabby",
  },
  {
    logo: <SlSocialLinkedin />,
    href: "https://linkedin.com/in/towfiqueWeb",
  },
  {
    logo: <FaGithub />,
    href: "https://github.com/trrabby",
  },
  {
    logo: <FiTwitter />,
    href: "https://twitter.com/towfique_veer",
  },
];

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { scrollToSectionSmDevice } = useScrollToSection();
  const user = useAppSelector(selectCurrentUser);
  const { theme } = useTheme();
  const [DashboardOpen, setDashboardOpen] = useState(false);

  return (
    <div className="flex">
      {open && (
        <div
          onClick={() => onClose()}
          className="w-4/12 h-screen fixed inset-0  bg-opacity-40 z-40"
        ></div>
      )}
      <div
        className={`${styles.navbar_backdrop_sm} ${
          open
            ? "fixed right-0 top-0 z-50 duration-500 flex flex-col justify-between"
            : "fixed translate-y-[1000px] right-0 duration-500 top-0 "
        }flex flex-col justify-between h-[calc(100vh-70px)] shadow-2xl shadow-primary bg-transparent rounded-l-2xl w-8/12 p-4`}
      >
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
        <div
          onClick={() => onClose()}
          className="flex flex-col gap-3 text-primary dark:text-fourth text-2xl text-left font-mono"
        >
          {navlinks.map(({ id, name }) => (
            <button
              key={id}
              onClick={() => scrollToSectionSmDevice(id)}
              className={`${styles.animated_underline} p-2 pr-4 rounded-md text-left font-bold transition-all duration-300 hover:text-accent hover:ease-linear hover:scale-110 relative group `}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="text-gray-950 dark:text-fourth transition-all duration-300 font-mono">
          <hr className="border border-gray-950 dark:border-fourth transition-all duration-300 mb-2" />
          <div className="flex gap-3 justify-center items-center">
            <p className="flex gap-2">
              Switch to{" "}
              {theme === "dark" ? <span>Light</span> : <span>Dark</span>}
            </p>
            <ThemeToggler />
          </div>{" "}
          <hr className="border border-gray-950 dark:border-fourth transition-all duration-300 mb-2" />
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
        <div className="flex gap-2 justify-between items-center text-gray-950 dark:text-fourth transition-all duration-300">
          {social.map((item) => (
            <Link
              className="hover:bg-third hover:scale-125 hover:duration-500 hover:text-primary w-8 h-8  text-center flex justify-center items-center rounded-lg"
              key={item.href}
              href={item.href}
            >
              {item.logo}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
