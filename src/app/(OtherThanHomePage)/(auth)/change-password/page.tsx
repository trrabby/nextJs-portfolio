/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { IUser } from "@/constants";
import { toast } from "sonner";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { changePassword } from "@/services/AuthService";
import { useLogout } from "@/hooks/useLogOut";

interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

const ChangePasswordPage = () => {
  const user = useAppSelector(selectCurrentUser) as IUser | null;
  const [loading, setLoading] = useState(false);
  const logout = useLogout();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<ChangePasswordForm>();

  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  const showConfirmPassword = Boolean(newPassword && newPassword.length > 0);
  const passwordsMatch =
    confirmPassword === undefined || confirmPassword === newPassword;

  // Password visibility states
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPasswordText, setShowConfirmPasswordText] = useState(false);

  useEffect(() => {
    if (user?.authProvider && user?.needsPasswordChange) {
      setValue("oldPassword", `default_${user.email}`);
    }
  }, [user, setValue]);

  const readOnlyRequired = user?.authProvider && user?.needsPasswordChange;

  const onSubmit = async (data: ChangePasswordForm) => {
    if (!user) return;

    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Updating Password...");
    try {
      const result = await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });

      if (result.success) {
        toast.success(result.message || "Password updated successfully!", {
          id: toastId,
        });
        await logout("login");
        toast.info("Please login with new password");
      } else {
        toast.error(result.message || "Failed to update password", {
          id: toastId,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
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
      {/* Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 bg-transparent border border-accent text-gray-800 dark:text-white hover:text-white backdrop-blur-md px-4 py-2 rounded-xl hover:bg-accent transition duration-500 z-50"
      >
        <AiOutlineArrowLeft size={20} />
        <span>Home</span>
      </Link>

      <div className="w-full max-w-md bg-third/10 dark:bg-gray-900/10 backdrop-blur-2xl border border-white/20 dark:border-gray-700 rounded-3xl shadow-2xl p-10 transition-all duration-500">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-third to-primary dark:from-accent dark:to-fourth bg-clip-text text-transparent">
          Change Password
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Old Password */}
          <div>
            <label className="block text-sm mb-1">Old Password</label>
            <input
              type={readOnlyRequired ? "password" : "text"}
              {...register("oldPassword", {
                required: "Old password is required",
              })}
              className="w-full bg-white/10 shadow-md dark:bg-gray-800 border-2 border-third hover:border-accent dark:hover:border-accent hover:cursor-pointer dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent outline-none transition-all duration-300"
              readOnly={readOnlyRequired as boolean}
            />
            {errors.oldPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="relative">
            <label className="block text-sm mb-1">New Password</label>
            <input
              type={showNewPassword ? "text" : "password"}
              {...register("newPassword", {
                required: "New password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className="w-full bg-white/10 shadow-md dark:bg-gray-800 border-2 border-third hover:border-accent dark:hover:border-accent hover:cursor-pointer dark:border-gray-700 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-accent outline-none transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-accent"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.newPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          {showConfirmPassword && (
            <div className="relative">
              <label className="block text-sm mb-1">Confirm Password</label>
              <input
                type={showConfirmPasswordText ? "text" : "password"}
                {...register("confirmPassword")}
                className={`w-full bg-white/10 shadow-md dark:bg-gray-800 border-2 ${
                  passwordsMatch
                    ? "border-third"
                    : "border-red-500 focus:ring-red-500"
                } hover:border-accent dark:hover:border-accent hover:cursor-pointer dark:border-gray-700 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-accent outline-none transition-all duration-300`}
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPasswordText(!showConfirmPasswordText)
                }
                className="absolute right-3 top-9 text-gray-400 hover:text-accent"
              >
                {showConfirmPasswordText ? <FaEyeSlash /> : <FaEye />}
              </button>
              {!passwordsMatch && (
                <p className="text-red-400 text-sm mt-1">
                  Passwords do not match
                </p>
              )}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-accent text-white rounded-xl hover:bg-accent/90 transition font-semibold"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
