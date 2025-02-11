/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Link from "next/link";
import profileImg from "../../../../public/portfolioAssets/SiteLog/po..png";
import { FiFacebook } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";
import { TiSocialSkypeOutline } from "react-icons/ti";
import { SlSocialLinkedin } from "react-icons/sl";
import { FaGithub } from "react-icons/fa";

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
  {
    logo: <TiSocialSkypeOutline />,
    href: "https://join.skype.com/invite/wj2WRec0GlAB",
  },
];

export default function SidebarHome({ sectionRefs }: { sectionRefs: any }) {
  const scrollToSection = (id: string) => {
    sectionRefs[id]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen fixed bg-accent flex flex-col justify-between p-2 w-2/12">
      <div className="flex justify-center items-center">
        <Link href={"/"}>
          <Image
            className=""
            alt="profile image"
            src={profileImg}
            width={130}
            height={60}
          />
        </Link>
      </div>
      <div className="hidden md:flex flex-col gap-3 text-fourth text-lg text-right">
        {navlinks.map(({ id, name }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className="p-2 pr-4 rounded-md text-right font-bold transition-all duration-300 hover:text-primary"
          >
            {name}
          </button>
        ))}
      </div>
      <div className="flex gap-2 justify-between items-center">
        {social.map((item) => (
          <Link
            className="hover:bg-third hover:scale-125 hover:duration-500 hover:text-primary w-8 h-8 text-white text-center flex justify-center items-center rounded-lg"
            key={item.href}
            href={item.href}
          >
            {item.logo}
          </Link>
        ))}
      </div>
    </div>
  );
}
