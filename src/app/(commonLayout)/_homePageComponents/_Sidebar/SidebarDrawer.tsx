"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Button from "@mui/material/Button";
import Sidebar from "./Sidebar";
import { cn } from "@/utils/utils";

export default function SidebarDrawer() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="bg-none">
      <Button className="fixed">
        <div
          className="py-2 px-0 z-40 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {/* HAMBURGER BUTTON */}
          <div
            className={cn(
              "w-8 h-6 flex flex-col justify-between transition-all duration-300",
              "relative"
            )}
          >
            <span
              className={cn(
                "block w-full h-[3px] bg-accent dark:bg-fourth transition-all duration-300",
                open && "translate-y-[10px] rotate-45"
              )}
            ></span>

            <span
              className={cn(
                "block w-full h-[3px] bg-accent dark:bg-fourth transition-all duration-300",
                open && "opacity-0"
              )}
            ></span>

            <span
              className={cn(
                "block w-full h-[3px] bg-accent dark:bg-fourth transition-all duration-300",
                open && "-translate-y-[10px] -rotate-45"
              )}
            ></span>
          </div>
          {/* END HAMBURGER */}
        </div>
      </Button>

      <Sidebar open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
