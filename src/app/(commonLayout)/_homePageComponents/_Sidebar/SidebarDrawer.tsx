"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Button from "@mui/material/Button";
import { RiMenuFill, RiMenuFoldLine } from "react-icons/ri";
import Sidebar from "./Sidebar";
// adjust path if needed

export default function SidebarDrawer() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="bg-none">
      <Button className="fixed">
        {open ? (
          <div
            className="p-4 shadow-2xl shadow-primary rounded-full bg-transparent z-40"
            onClick={() => setOpen(!open)}
          >
            <RiMenuFoldLine className="w-10 h-10 text-accent dark:text-fourth" />
          </div>
        ) : (
          <div
            className="p-4 shadow-primary rounded-full bg-transparent z-40"
            onClick={() => setOpen(!open)}
          >
            <RiMenuFill className="w-10 h-10 text-accent dark:text-fourth" />
          </div>
        )}
      </Button>

      {/* ✅ sectionRefs comes from context now */}
      <Sidebar open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
