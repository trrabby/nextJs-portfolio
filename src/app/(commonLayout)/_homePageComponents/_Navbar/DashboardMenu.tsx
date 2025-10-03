import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import Link from "next/link";
import React from "react";
import { FaUserCircle, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";

type DashboardMenuProps = {
  open: boolean;
  setDashboardOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const navlinks = [
  {
    name: "Profile",
    link: "/profile",
    Icon: <FaUserCircle />,
  },
  {
    name: "Dashboard",
    link: "/dashboard",
    Icon: <FaTachometerAlt />,
  },
];

export default function DashboardMenu({
  open,
  setDashboardOpen,
}: DashboardMenuProps) {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  if (!open) return null;
  return (
    <div
      className="absolute min-h-screen inset-0 z-50 flex items-start justify-end"
      onClick={() => setDashboardOpen(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Menu */}
      <div
        className="relative mt-20 mr-4 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside menu
      >
        <ul className="flex flex-col space-y-2">
          <li>
            {navlinks.map((item) => (
              <Link key={item.name} href={`${item.link}`}>
                <div
                  onClick={() => setDashboardOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent hover:text-white cursor-pointer transition"
                >
                  {item.Icon}
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
          </li>
          <li className="flex justify-center items-center gap-3 px-4 py-2 rounded-lg cursor-pointer w-full">
            <div
              onClick={handleLogout}
              className="flex gap-2 justify-center items-center text-red-500 hover:bg-red-500 hover:text-white transition px-6 py-2 rounded-xl"
            >
              <FaSignOutAlt className="w-5 h-5" />
              Log Out
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
