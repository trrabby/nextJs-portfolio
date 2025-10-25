"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaUserCircle, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";
import { useLogout } from "@/hooks/useLogOut";

type DashboardMenuProps = {
  open: boolean;
  setDashboardOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const navlinks = [
  { name: "Profile", link: "/profile", Icon: <FaUserCircle /> },
  { name: "Dashboard", link: "/dashboard", Icon: <FaTachometerAlt /> },
];

export default function DashboardMenu({
  open,
  setDashboardOpen,
}: DashboardMenuProps) {
  const logout = useLogout();
  const [visible, setVisible] = useState(false);

  // Sync internal visibility for smooth transition
  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      // wait for animation before hiding completely
      const timeout = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  if (!visible && !open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-end transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setDashboardOpen(false)}
    >
      {/* Backdrop */}
      <div
        className={`absolute h-screen inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      {/* Menu */}
      <div
        className={`relative mt-[500px] -mr-5 md:mt-20 md:mr-20 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-2 transform transition-all duration-300 ease-in-out ${
          open
            ? "translate-x-0 opacity-100 ease-in"
            : "translate-x-20 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Arrow */}
        <div className="absolute -top-2 right-4 w-4 h-4 bg-white dark:bg-gray-800 border-t border-l border-gray-200 dark:border-gray-700 transform rotate-45"></div>

        <ul className="flex flex-col space-y-1">
          {navlinks.map((item) => (
            <li key={item.name}>
              <Link href={item.link}>
                <div
                  onClick={() => setDashboardOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 cursor-pointer transition-colors duration-200"
                >
                  <span className="text-lg">{item.Icon}</span>
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            </li>
          ))}

          {/* Logout */}
          <li className="border-t border-gray-200 dark:border-gray-700 mt-1 pt-1">
            <div
              onClick={() => logout("/")}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 cursor-pointer transition-colors duration-200"
            >
              <FaSignOutAlt className="w-5 h-5" />
              <span className="font-medium">Log Out</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
