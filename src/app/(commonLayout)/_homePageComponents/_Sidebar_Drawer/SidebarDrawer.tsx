/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Sidebar from "../Sidebar";

export default function SidebarDrawer({ sectionRefs }: { sectionRefs: any }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <div>
          <Sidebar sectionRefs={sectionRefs} />
        </div>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button className="bg-none fixed" onClick={toggleDrawer(true)}>
        {open ? <MenuOpenIcon /> : <MenuOutlinedIcon />}
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
