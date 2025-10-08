import React from "react";
import { IUser } from "@/constants";
import { cn } from "@/utils/utils";

interface ProfileDetailsProps {
  user: IUser;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }) => {
  const items = [
    { label: "City", value: user.city },
    { label: "Sub District", value: user.subDistrict },
    { label: "Post Office", value: user.postOffice },
    { label: "Colony", value: user.colony },
    { label: "Phone Number", value: user.number },
    { label: "Status", value: user.status },
  ];

  return (
    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "relative p-5 rounded-xl bg-white dark:bg-gray-800 border-l-4 shadow-md hover:shadow-xl hover:border-l-8 transition-all duration-500",
            {
              "border-red-400": user.role === "admin",
              "border-blue-400": user.role === "editor",
              "border-green-400": user.role === "reader",
            }
          )}
        >
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {item.label}
          </p>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
            {item.value || "N/A"}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default ProfileDetails;
