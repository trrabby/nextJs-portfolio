"use client";
import { TUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navlinks = [
  {
    path: "/",
    name: "Home ",
  },
  {
    path: "/about",
    name: "About",
  },
  {
    path: "/blogs",
    name: "Blogs",
  },
  {
    path: "/projects",
    name: "Projects",
  },
  {
    path: "/contacts",
    name: "Contacts",
  },
];

const NavbarHome = () => {
  const pathName = usePathname();
  //   console.log(pathName);

  const token = useAppSelector(useCurrentToken);
  let user: TUser | undefined;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  return (
    <div>
      <div className=" text-accent bg-transparent backdrop-blur-sm z-30 w-full py-2">
        <div className="navbar flex justify-between items-center">
          <div className="flex flex-row lg:flex-row justify-between items-end lg:flex-1">
            <div className="w-2/6 pl-10 flex items-end">
              <Image
                className="w-16"
                src="https://i.ibb.co.com/M9tL3RT/suspension.png"
                alt=""
                width={50}
                height={50}
              />
              <p className="text-primary text-3xl font-extrabold p-2 px-4 flex gap-2">
                <span className="text-accent">PRESTIGE</span>
                WHEELS
              </p>
            </div>
            {/* Menu */}
            <div className="px-10 pl-28 flex flex-1 justify-between text-lg">
              {/* Menu lg */}
              <div className="navbar-center hidden md:flex gap-3 text-accent">
                {navlinks.map((navLink) => {
                  return (
                    <Link
                      className={
                        pathName === navLink.path
                          ? "text-primary font-bold"
                          : "hover:text-primary font-bold"
                      }
                      href={navLink.path}
                      key={navLink.path} // Ensure a unique key
                    >
                      {navLink.name}
                    </Link>
                  );
                })}
              </div>

              <div className="flex gap-4 items-center justify-center">
                {!user && (
                  <Link
                    className={
                      pathName === "/logIn"
                        ? "text-primary font-bold"
                        : "hover:text-primary font-bold"
                    }
                    href={"/logIn"}
                  >
                    SIGN IN
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarHome;
