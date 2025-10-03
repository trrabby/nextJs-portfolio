import * as React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
const squareAvatarSrc = "/images/avatar-2.png";

export default function StatusVariantSquare(data: { img: string }) {
  const activeStatus = true;
  const { img } = data;
  return (
    <Tooltip className="hover:cursor-pointer" title="Dashboard">
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            backgroundColor: activeStatus ? "#84fadf" : "#1a0033",
            width: 52,
            height: 52,
            borderRadius: "50%",
            animation: activeStatus
              ? "ripple 1.9s infinite ease-in-out"
              : "none",
            overflow: "hidden",

            "@keyframes ripple": {
              "0%": {
                transform: "scale(1)",
                opacity: 1,
              },
              "100%": {
                transform: "scale(1.1)",
                opacity: 0,
              },
            },
          }}
        />
        {/* <Avatar
        src={img ? img : squareAvatarSrc}
        alt="Profile Img"
        className="object-top"
        sx={{
          width: 46,
          height: 46,
          border: "2px solid #fff",
          position: "absolute",
          top: 2,
          left: 2,
        }}
      /> */}
        <div className="absolute top-1 left-1 flex justify-center items-center">
          <div className=" relative w-11 h-11 overflow-hidden flex justify-center items-center object-center">
            <Image
              src={img ? img : squareAvatarSrc}
              alt="Profile Img"
              fill
              className="object-top rounded-full"
            />
          </div>
        </div>
      </Box>
    </Tooltip>
  );
}
