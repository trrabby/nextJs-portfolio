/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { FaCamera, FaPencilAlt } from "react-icons/fa";
import Cropper from "react-easy-crop";
import Avatar from "@mui/material/Avatar";
import { IUser } from "@/constants";
import { stringAvatar } from "@/utils/StringAvatar";
import { getCroppedImg } from "@/utils/PhotoCropper";
import imageCompression from "browser-image-compression";
import { cn } from "@/utils/utils";

interface ProfileImageUploaderProps {
  user: IUser;
  previewImage: string;
  setPreviewImage: (img: string) => void;
  imgFile: File | null;
  setImgFile: (file: File | null) => void;
  isEditing: boolean;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  user,
  previewImage,
  setPreviewImage,
  imgFile,
  setImgFile,
  isEditing,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [imgLoading, setImgLoading] = useState(false);
  const [isCropping, setIsCropping] = useState(false);

  const onCropComplete = useCallback((_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setImgLoading(true);
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });
      setImgFile(compressedFile);
      setPreviewImage(URL.createObjectURL(compressedFile));
      setIsCropping(true);
    } catch (err) {
      console.error(err);
      setImgLoading(false);
    }
  };
  const handleCropSave = async () => {
    if (!imgFile || !croppedAreaPixels) return;

    try {
      const croppedBlob = await getCroppedImg(previewImage, croppedAreaPixels);
      if (!croppedBlob) throw new Error("Cropped blob is invalid");

      // Convert cropped blob to File
      const croppedFile = new File([croppedBlob], imgFile.name, {
        type: imgFile.type,
      });

      // Update the state with the cropped file
      setImgFile(croppedFile);
      setPreviewImage(URL.createObjectURL(croppedBlob));
    } catch (err) {
      console.error(err);
    } finally {
      setIsCropping(false);
      setImgLoading(false);
    }
  };

  const handleCancelCrop = () => {
    setIsCropping(false);
    setImgFile(null);
    setPreviewImage(user?.imgUrl || "");
    setImgLoading(false);
  };

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative group w-36 h-36 rounded-full overflow-hidden border-4 border-accent/40 shadow-lg flex justify-center items-center">
        {previewImage ? (
          <Image
            src={previewImage || "/default-avatar.png"}
            alt="Profile"
            fill
            unoptimized
            className="object-top transition-all duration-300 group-hover:opacity-90"
            onLoad={() => setImgLoading(false)}
          />
        ) : (
          <Avatar
            style={{ height: "100px", width: "100px" }}
            {...stringAvatar(user.name)}
          />
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
                onClick={handleCancelCrop}
                className="bg-red-500 px-6 py-2 rounded-lg text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <h2 className="mt-5 text-2xl font-semibold">{user.name}</h2>
      <p className="text-gray-400">{user.email}</p>

      {/* Role Badge */}
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

      {/* Change Password Button */}
      <a
        href="/change-password"
        className="flex gap-2 items-center hover:underline pt-2 text-accent"
      >
        <FaPencilAlt />
        Change Password
      </a>
    </div>
  );
};

export default ProfileImageUploader;
