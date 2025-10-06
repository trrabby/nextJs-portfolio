/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { selectCurrentUser, setUser } from "@/redux/features/auth/authSlice";
import { FaUserEdit, FaCamera, FaPencilAlt } from "react-icons/fa";
import { IUser } from "@/constants";
import Avatar from "@mui/material/Avatar";
import { stringAvatar } from "@/utils/StringAvatar";
import imageCompression from "browser-image-compression";
import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/utils/PhotoCropper";
import { updateUser } from "@/services/Users";
import { toast } from "sonner";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { cn } from "@/utils/utils";

const ProfilePage = () => {
  const user = useAppSelector(selectCurrentUser) as IUser | null;
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(user?.imgUrl || "");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // State for cropping
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [imgLoading, setImgLoading] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const dispatch = useAppDispatch();
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  useEffect(() => {
    if (user?.authProvider && user?.needsPasswordChange) {
      setShowPasswordPopup(true);
    }
  }, [user]);

  const handleCropSave = async () => {
    if (!imgFile) return;
    try {
      const croppedBlob = await getCroppedImg(previewImage, croppedAreaPixels);
      const newFile = new File([croppedBlob], imgFile.name, {
        type: imgFile.type,
      });
      setImgFile(newFile);
      setPreviewImage(URL.createObjectURL(croppedBlob));
      setIsCropping(false); // hide cropper after saving
    } catch (e) {
      console.error(e);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: user ?? {},
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setImgLoading(true); // start loading
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      setImgFile(compressedFile);
      setPreviewImage(URL.createObjectURL(compressedFile));
      setIsCropping(true); // show cropper
    } catch (error) {
      console.error("Image compression error:", error);
      setImgLoading(false);
    }
  };

  const onSubmit = async (data: IUser) => {
    const profileData = {
      name: data.name,
      email: data.email,
      city: data.city,
      colony: data.colony,
      postOffice: data.postOffice,
      subDistrict: data.subDistrict,
      number: data.number,
      role: user?.role,
      status: user?.status,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(profileData));
    if (imgFile) {
      formData.append("file", imgFile);
    }

    try {
      const ToastId = toast.loading("Updating, please wait...");
      const res = await updateUser(formData, user?.email as string);
      console.log(res);
      if (res.success) {
        dispatch(setUser({ user: res.data, token: undefined }));
        toast.success(res.message || "Updated successfully", {
          id: ToastId,
        });
      } else {
        toast.error(res?.message, { id: ToastId });
      }
    } catch (err) {
      console.log(err);
    }

    // Example: await axios.put(`/api/user/${user._id}`, formData);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        <p>No user data found. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-fourth dark:bg-gray-900 text-forth dark:text-forth transition-all duration-500">
      {/* Return/Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl hover:bg-white/30 transition"
      >
        <AiOutlineArrowLeft size={20} />
        <span>Home</span>
      </Link>
      <div className="w-full max-w-3xl bg-white dark:bg-gray-900/10 backdrop-blur-2xl border border-white/20 dark:border-gray-700 rounded-3xl shadow-2xl p-10 transition-all duration-500">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-accent to-fourth bg-clip-text text-transparent">
            My Profile
          </h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 bg-accent/20 hover:bg-accent/40 text-accent rounded-lg font-medium transition-all duration-200"
          >
            <FaUserEdit /> {isEditing ? "Cancel Edit" : "Edit Profile"}
          </button>
        </div>

        {/* Pop Up */}
        {showPasswordPopup && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-xl text-center max-w-sm">
              <h3 className="text-lg font-semibold mb-2">
                Password Change Required
              </h3>
              <p className="text-sm mb-4">
                Your account requires a password update. Please set a new
                password to continue.
              </p>
              <Link
                href="/change-password"
                className="px-4 py-2 bg-transparent border border-accent hover:bg-accent hover:border-fourth text-black hover:text-white duration-500 rounded-lg font-medium"
              >
                Change Password
              </Link>
              <button
                onClick={() => setShowPasswordPopup(false)}
                className="block mx-auto mt-3 text-sm text-gray-500 hover:underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group w-36 h-36 rounded-full overflow-hidden border-4 border-accent/40 shadow-lg">
            {previewImage ? (
              <Image
                src={previewImage || "/default-avatar.png"}
                alt="Profile"
                fill
                className="object-center transition-all duration-300 group-hover:opacity-90"
                onLoad={() => setImgLoading(false)}
              />
            ) : (
              <Avatar {...stringAvatar(user.name)} />
            )}
            {isEditing && (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity"
              >
                <FaCamera className="text-2xl text-white" />
              </div>
            )}
            {imgLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10 rounded-full">
                <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <h2 className="mt-5 text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-400">{user.email}</p>
          <span
            className={cn(
              "mt-2 px-4 py-1 text-sm rounded-full font-medium transition-all duration-200",
              {
                "bg-red-500/20 text-red-400": user.role === "admin",
                "bg-blue-500/20 text-blue-400": user.role === "editor",
                "bg-green-500/20 text-green-400": user.role === "reader",
              }
            )}
          >
            {user.role.toUpperCase()}
          </span>
          <Link
            className="flex gap-2 items-center hover:underline pt-2"
            href={"change-password"}
          >
            <FaPencilAlt />
            Change Password
          </Link>
        </div>

        {/* Main Content */}
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: "Name", name: "name" },
                { label: "City", name: "city" },
                { label: "Sub District/Thana", name: "subDistrict" },
                { label: "Post Office", name: "postOffice" },
                { label: "Colony", name: "colony" },
                { label: "Phone Number", name: "number" },
              ].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-sm mb-1">{field.label}</label>
                  <input
                    {...register(field.name as keyof IUser, {
                      required: `${field.label} is required`,
                    })}
                    className="w-full bg-white/10 shadow-md dark:bg-gray-800 border-2 border-third hover:border-accent dark:hover:border-accent hover:cursor-pointer dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent outline-none transition-all duration-300"
                  />
                  {errors[field.name as keyof IUser] && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors[field.name as keyof IUser]?.message}
                    </p>
                  )}
                </div>
              ))}

              {isCropping && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                  <div className="relative w-[80%] h-[400px] bg-gray-800 p-4 rounded-xl">
                    <Cropper
                      image={previewImage}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                      <button
                        onClick={handleCropSave}
                        className="bg-accent px-6 py-2 rounded-lg text-white"
                      >
                        Save Crop
                      </button>
                      <button
                        onClick={() => {
                          setIsCropping(false);
                          setImgFile(null);
                          setPreviewImage(user?.imgUrl || "");
                        }}
                        className="bg-red-500 px-6 py-2 rounded-lg text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full py-3 bg-accent text-white rounded-xl hover:bg-accent/90 transition font-semibold"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "City", value: user.city },
              { label: "Sub District", value: user.subDistrict },
              { label: "Post Office", value: user.postOffice },
              { label: "Colony", value: user.colony },
              { label: "Phone Number", value: user.number },
              { label: "Status", value: user.status },
            ].map((item, index) => (
              <div
                key={index}
                className={cn(
                  "relative p-5 rounded-xl bg-white dark:bg-gray-800 border-l-4 shadow-md hover:shadow-xl hover:border-l-8 hover:border-gradient-to-r  transition-all duration-500",
                  {
                    "border-red-400 hover:from-red-400 hover:to-red-400":
                      user.role === "admin",
                    "border-blue-400 hover:from-blue-400 hover:to-blue-400":
                      user.role === "editor",
                    "border-green-400 hover:from-green-400 hover:to-green-400":
                      user.role === "reader",
                  }
                )}
              >
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide ">
                  {item.label}
                </p>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                  {item.value || "N/A"}
                </h4>
                <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-20 bg-gradient-to-r from-indigo-400 to-purple-400 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
