"use client";

import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "next-themes";
import React from "react";
import { FiSun } from "react-icons/fi";
import { RxMoon } from "react-icons/rx";

interface ThemeTogglerProps {
  lightCss?: string;
  logoSize?: string;
}

const ThemeToggler: React.FC<ThemeTogglerProps> = ({
  lightCss = "text-white",
  logoSize = "h-8 w-8",
}) => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <Tooltip
        title={`${
          theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
        }`}
        arrow
      >
        <div
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="rounded-full p-4 shadow-sm cursor-pointer"
        >
          {theme === "light" ? (
            <RxMoon
              className={`hover:duration-500 ${logoSize} ${lightCss} text-center flex justify-center items-center rounded-lg ease-in-out`}
            ></RxMoon>
          ) : (
            <FiSun
              className={`hover:duration-500 ${logoSize} text-white text-center flex justify-center items-center rounded-lg ease-in-out`}
            ></FiSun>
          )}
        </div>
      </Tooltip>
    </div>
  );
};

export default ThemeToggler;
