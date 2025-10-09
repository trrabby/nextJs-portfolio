"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogOut,
  LayoutDashboard,
  Settings,
  Home,
  ChevronDown,
  FolderKanban,
  BookOpenText,
  Award,
  Briefcase,
  Hammer,
  Users,
  Menu,
  X,
  PlusCircle,
  ListChecks,
  PenSquare,
  BookOpen,
  GraduationCap,
  BriefcaseBusiness,
  Wrench,
  UserCog,
  UserCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggler from "../(commonLayout)/_homePageComponents/_ThemeController/ThemeToggler";
import { useTheme } from "next-themes";
import { cn } from "@/utils/utils";
import Tooltip from "@mui/material/Tooltip";
import { useLogout } from "@/hooks/useLogOut";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { IUser } from "@/constants";

interface NormalSubLink {
  name: string;
  path: string;
  icon: React.ElementType;
  custom?: false;
}

interface CustomSubLink {
  name: string;
  custom: true;
  element: React.ReactNode;
}

type SubLink = NormalSubLink | CustomSubLink;

interface Route {
  name: string;
  icon: React.ElementType;
  path?: string;
  subLinks?: SubLink[];
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const { theme } = useTheme();
  const user = useAppSelector(selectCurrentUser) as IUser | null;
  const role = user?.role;
  const logout = useLogout();

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) =>
      prev.includes(menu) ? prev.filter((m) => m !== menu) : [...prev, menu]
    );
  };

  const toggleSidebar = () => setExpanded(!expanded);

  const routes: Route[] = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    {
      name: "Projects",
      icon: FolderKanban,
      subLinks: [
        {
          name: "Add Project",
          path: "/dashboard/projects/add",
          icon: PlusCircle,
        },
        {
          name: "Manage Projects",
          path: "/dashboard/projects/manage",
          icon: ListChecks,
        },
      ],
    },
    {
      name: "Blogs",
      icon: BookOpenText,
      subLinks: [
        { name: "Add Blog", path: "/dashboard/blogs/add", icon: PenSquare },
        {
          name: "Manage Blogs",
          path: "/dashboard/blogs/manage",
          icon: BookOpen,
        },
      ],
    },
    {
      name: "Certificates",
      icon: Award,
      subLinks: [
        {
          name: "Add Certificate",
          path: "/dashboard/certificates/add",
          icon: PlusCircle,
        },
        {
          name: "Manage Certificates",
          path: "/dashboard/certificates/manage",
          icon: GraduationCap,
        },
      ],
    },
    {
      name: "Experiences",
      icon: Briefcase,
      subLinks: [
        {
          name: "Add Experience",
          path: "/dashboard/experiences/add",
          icon: PlusCircle,
        },
        {
          name: "Manage Experiences",
          path: "/dashboard/experiences/manage",
          icon: BriefcaseBusiness,
        },
      ],
    },
    {
      name: "Skills",
      icon: Hammer,
      subLinks: [
        { name: "Add Skill", path: "/dashboard/skills/add", icon: PlusCircle },
        {
          name: "Manage Skills",
          path: "/dashboard/skills/manage",
          icon: Wrench,
        },
      ],
    },
    ...(role === "admin"
      ? [
          {
            name: "Users",
            icon: Users,
            subLinks: [
              {
                name: "Manage Users",
                path: "/dashboard/users/manage",
                icon: UserCog,
              },
              {
                name: "User Roles",
                path: "/dashboard/users/roles",
                icon: UserCheck,
              },
            ],
          },
        ]
      : []),
    {
      name: "Settings",
      icon: Settings,
      subLinks: [
        {
          name: "Theme",
          custom: true,
          element: (
            <div
              className={cn(
                "flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 font-mono transition-all duration-300",
                expanded
                  ? "px-4 py-2 border-y-2 border-primary dark:border-fourth"
                  : "px-2 py-2 justify-center"
              )}
            >
              <ThemeToggler />
              {expanded && (
                <span>Switch to {theme === "dark" ? "Light" : "Dark"}</span>
              )}
            </div>
          ),
        },
        {
          name: "Logout",
          custom: true,
          element: (
            <button
              onClick={() => logout("/")}
              className={cn(
                "flex items-center justify-center gap-2 text-red-500 hover:bg-red-500 hover:text-white rounded-md transition-colors duration-300 w-full font-bold",
                expanded
                  ? "px-4 py-2 mt-2 text-base"
                  : "px-2 py-2 justify-center"
              )}
            >
              <LogOut className="h-6 w-6 font-bold" />
              {expanded && <span>Logout</span>}
            </button>
          ),
        },
      ],
    },

    { name: "Home", icon: Home, path: "/" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-100 transition-all">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:static z-50 min-h-screen flex flex-col justify-between border-r border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl transition-all duration-300",
          expanded ? "w-60" : "w-16"
        )}
      >
        {/* Sidebar header */}
        <div className="flex flex-col items-center md:items-start">
          <div
            className="flex items-center gap-2 p-4 font-bold text-xl cursor-pointer"
            onClick={toggleSidebar}
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Menu
                className={cn(
                  "absolute transition-all duration-300",
                  expanded ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                )}
              />
              <X
                className={cn(
                  "absolute transition-all duration-300",
                  expanded ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                )}
              />
            </div>
            <span
              className={cn(
                "transition-all duration-300 origin-left overflow-hidden whitespace-nowrap",
                expanded
                  ? "opacity-100 translate-x-0 w-auto"
                  : "opacity-0 -translate-x-4 w-0"
              )}
            >
              Dashboard
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col mt-4 w-full">
            {routes.map(({ name, icon: Icon, path, subLinks }) => {
              const isActive =
                pathname === path ||
                subLinks?.some(
                  (sub) => "path" in sub && pathname.startsWith(sub.path)
                );
              const isOpen = openMenus.includes(name);

              return (
                <div key={name}>
                  {subLinks ? (
                    <button
                      onClick={() => toggleMenu(name)}
                      className={cn(
                        "flex items-center justify-between w-full px-4 py-3 rounded-md transition-colors duration-300",
                        "hover:bg-gray-200/50 dark:hover:bg-gray-800/70",
                        isActive
                          ? "text-accent font-semibold bg-accent/10 dark:bg-accent/15"
                          : "text-gray-700 dark:text-gray-300"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div whileHover={{ rotate: 10 }}>
                          <Tooltip title={name} placement="right">
                            <Icon size={20} />
                          </Tooltip>
                        </motion.div>
                        {expanded && (
                          <span className="transition-all duration-300">
                            {name}
                          </span>
                        )}
                      </div>
                      {expanded && (
                        <ChevronDown
                          size={18}
                          className={cn(
                            "transition-transform duration-300",
                            isOpen ? "rotate-180" : "rotate-0"
                          )}
                        />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={path!}
                      className={cn(
                        "flex items-center gap-3 w-full px-4 py-3 rounded-md transition-colors duration-300",
                        "hover:bg-gray-200/50 dark:hover:bg-gray-800/70",
                        isActive
                          ? "text-accent font-semibold bg-accent/10 dark:bg-accent/15"
                          : "text-gray-700 dark:text-gray-300"
                      )}
                    >
                      <motion.div whileHover={{ rotate: 10 }}>
                        <Tooltip title={name} placement="right">
                          <Icon size={20} />
                        </Tooltip>
                      </motion.div>
                      {expanded && (
                        <span className="transition-all duration-300">
                          {name}
                        </span>
                      )}
                    </Link>
                  )}

                  {/* SubLinks */}
                  {subLinks && (
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      {subLinks.map((sub) =>
                        sub.custom ? (
                          <div key={sub.name}>{sub.element}</div>
                        ) : (
                          <Link
                            key={sub.name}
                            href={sub.path}
                            className={cn(
                              "flex items-center gap-3 py-2 text-sm rounded-md transition-colors duration-300",
                              expanded ? "pl-12 pr-4" : "px-6",
                              "hover:bg-gray-200/50 dark:hover:bg-gray-800/70",
                              pathname === sub.path
                                ? "text-accent font-semibold bg-accent/10 dark:bg-accent/15"
                                : "text-gray-500 dark:text-gray-400"
                            )}
                          >
                            <Tooltip title={sub.name} placement="right">
                              <sub.icon size={16} />
                            </Tooltip>
                            {expanded && <span>{sub.name}</span>}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-16 md:ml-0 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
