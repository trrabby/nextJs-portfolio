import React from "react";
import { FaUserEdit } from "react-icons/fa";

interface ProfileHeaderProps {
  isEditing: boolean;
  toggleEdit: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  isEditing,
  toggleEdit,
}) => {
  return (
    <div className="flex items-center justify-between mb-10 mt-10 md:mt-0">
      <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-third to-primary dark:from-accent dark:to-fourth bg-clip-text text-transparent">
        My Profile
      </h1>
      <button
        onClick={toggleEdit}
        className="flex items-center gap-2 px-4 py-2 bg-accent/20 hover:bg-accent/40 text-accent rounded-lg font-medium transition-all duration-200"
      >
        <FaUserEdit /> {isEditing ? "Cancel Edit" : "Edit Profile"}
      </button>
    </div>
  );
};

export default ProfileHeader;
