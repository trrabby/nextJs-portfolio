"use client";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { Tooltip } from "antd";
import Link from "next/link";
import React from "react";
import { GrDocumentUpdate } from "react-icons/gr";

const UpdateButton = ({ id }: { id: string }) => {
  const user = useAppSelector(selectCurrentUser);
  if (!id || !user) return null;
  return (
    <div>
      {user?.role === "admin" && (
        <div>
          <Link href={`/dashboard/blogs/manage/${id}`}>
            <Tooltip title="Updated Blog">
              {" "}
              <GrDocumentUpdate className="h-5 w-5 hover:scale-125 duration-300 cursor-pointer" />
            </Tooltip>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UpdateButton;
