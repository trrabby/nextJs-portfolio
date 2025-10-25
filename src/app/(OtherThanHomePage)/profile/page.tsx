/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { selectCurrentUser, setUser } from "@/redux/features/auth/authSlice";
import { IUser } from "@/constants";
import { toast } from "sonner";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { updateUser } from "@/services/Users";
import PasswordPopup from "./_profileComponents/PasswordChangePopup";
import ProfileHeader from "./_profileComponents/ProfileHeader";
import ProfileImageUploader from "./_profileComponents/ImageUploading";
import ProfileDetails from "./_profileComponents/ProfileDetails";
import ProfileForm from "./_profileComponents/ProfileForm";

const ProfilePage = () => {
  const user = useAppSelector(selectCurrentUser) as IUser | null;
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(user?.imgUrl || "");
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);

  useEffect(() => {
    if (user?.authProvider && user?.needsPasswordChange) {
      setShowPasswordPopup(true);
    }
  }, [user]);

  const onSubmit = async (data: IUser) => {
    const profileData = { ...data, role: user?.role, status: user?.status };
    const formData = new FormData();
    formData.append("data", JSON.stringify(profileData));
    if (imgFile) formData.append("file", imgFile);

    try {
      const ToastId = toast.loading("Updating, please wait...");
      const res = await updateUser(formData, user?.email as string);
      if (res.success) {
        dispatch(setUser({ user: res.data, token: undefined }));
        toast.success(res.message || "Updated successfully", { id: ToastId });
      } else {
        toast.error(res?.message, { id: ToastId });
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        <p>No user data found. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-white dark:bg-gray-900 text-forth dark:text-forth transition-all duration-500 py-3">
      <Link
        href="/"
        className="absolute top-6 left-6 flex justify-start lg:items-center gap-2 bg-transparent border border-accent text-gray-800 dark:text-white hover:text-white backdrop-blur-md px-4 py-2 rounded-xl hover:bg-accent transition duration-500 z-50"
      >
        <AiOutlineArrowLeft size={20} />
        <span>Home</span>
      </Link>

      {showPasswordPopup && (
        <PasswordPopup onClose={() => setShowPasswordPopup(false)} />
      )}

      <div className="w-full max-w-3xl bg-third/10 dark:bg-gray-900/10 backdrop-blur-2xl border border-white/20 dark:border-gray-700 rounded-3xl shadow-2xl p-10 transition-all duration-500">
        <ProfileHeader
          isEditing={isEditing}
          toggleEdit={() => setIsEditing(!isEditing)}
        />

        <ProfileImageUploader
          user={user}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          imgFile={imgFile}
          setImgFile={setImgFile}
          isEditing={isEditing}
        />

        {isEditing ? (
          <ProfileForm user={user} onSubmit={onSubmit} />
        ) : (
          <ProfileDetails user={user} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
