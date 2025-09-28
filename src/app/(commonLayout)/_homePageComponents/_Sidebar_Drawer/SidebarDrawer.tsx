/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Button from "@mui/material/Button";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Sidebar from "../Sidebar";

export default function SidebarDrawer({ sectionRefs }: { sectionRefs: any }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="bg-none">
      <Button className="fixed">
        {open ? (
          <div
            className="p-4 shadow-2xl shadow-primary rounded-full bg-transparent z-40"
            onClick={() => setOpen(!open)}
          >
            <MenuOpenIcon className="w-20 h-20" />
          </div>
        ) : (
          <div
            className="p-4 shadow-primary rounded-full bg-transparent z-40"
            onClick={() => setOpen(!open)}
          >
            <MenuOutlinedIcon className="w-20 h-20 " />
          </div>
        )}
      </Button>
      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
        sectionRefs={sectionRefs}
      />
    </div>
  );
}
