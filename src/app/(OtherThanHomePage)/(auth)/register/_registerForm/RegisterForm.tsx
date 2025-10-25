/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FaRegEye, FaRegEyeSlash, FaCloudUploadAlt } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getMyProfile, registerUser } from "@/services/Users";
import { useAppDispatch } from "@/redux/hook";
import { setUser } from "@/redux/features/auth/authSlice";
import { useState } from "react";
import useImageHandler from "@/hooks/useImgHandler";
import { motion, AnimatePresence } from "framer-motion";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const RegisterForm = () => {
  const { previews, files, loading, handleImageChange } =
    useImageHandler(false);
  const [toggle, setToggle] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch("password");
  const passwordConfirm = watch("passwordConfirm");
  const name = watch("name");
  const email = watch("email");
  const isButtonDisabled =
    !name || !email || !password || password !== passwordConfirm;

  // ✅ Handle form submission
  const onSubmit = async (data: RegisterFormData) => {
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match!");
      return;
    }

    const registerToast = toast.loading("Creating your account...");

    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));

      if (files && files.length > 0) {
        formData.append("file", files[0]);
      }

      const response = await registerUser(formData);

      if (response.success) {
        toast.success("Registration successful!", { id: registerToast });
        const user = await getMyProfile();
        dispatch(
          setUser({ user: user.data, token: response.data.accessToken })
        );
        router.push("/profile");
      } else {
        if (response?.message?.includes("E11000 duplicate")) {
          toast.error("This email already exists! Please login.", {
            id: registerToast,
          });
        } else if (response?.errorSources && response.errorSources.length > 0) {
          // Show all validation error messages
          response.errorSources.forEach((err: any) => {
            toast.error(`${err.path}: ${err.message}`, { id: registerToast });
          });
        } else {
          toast.error(response?.message || "Failed to register", {
            id: registerToast,
          });
          console.error(response);
        }
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Something went wrong", { id: registerToast });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex flex-col gap-6 w-full lg:w-10/12"
    >
      {/* Name */}
      <div className="flex flex-col text-left">
        <label className="text-sm font-semibold text-gray-200 mb-1">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-200 border border-gray-600 focus:outline-none hover:border-accent focus:border-accent focus:ring-2 focus:ring-accent transition"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className="text-red-500 text-xs mt-1">
            This field is required
          </span>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col text-left">
        <label className="text-sm font-semibold text-gray-200 mb-1">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-200 border border-gray-600 focus:outline-none  hover:border-accent focus:border-accent focus:ring-2 focus:ring-accent transition"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-red-500 text-xs mt-1">
            This field is required
          </span>
        )}
      </div>

      {/* Image Upload */}
      <div className="flex flex-col text-left">
        <label className="text-sm font-semibold text-gray-200 mb-1">
          Profile Image
        </label>
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-6 cursor-pointer hover:border-accent transition">
          <input
            type="file"
            accept="image/*"
            multiple={false}
            className="hidden"
            id="imageUpload"
            onChange={handleImageChange}
          />
          <label
            htmlFor="imageUpload"
            className="flex flex-col items-center text-gray-300 hover:text-accent transition"
          >
            <FaCloudUploadAlt size={40} />
            <span className="mt-2 text-sm">
              {loading ? "Loading..." : "Click to upload"}
            </span>
          </label>
          {previews.length > 0 && (
            <div className="mt-4 relative w-24 h-24">
              <Image
                src={previews[0]}
                alt="Preview"
                fill
                className="rounded-full object-cover border border-accent"
              />
            </div>
          )}
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col text-left relative">
        <label className="text-sm font-semibold text-gray-200 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type={toggle ? "text" : "password"}
            placeholder="Create a password"
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-200 border border-gray-600 focus:outline-none  hover:border-accent focus:border-accent focus:ring-2 focus:ring-accent transition"
            {...register("password", { required: true })}
          />
          <span
            onClick={() => setToggle(!toggle)}
            className="absolute right-3 top-3 text-gray-300 cursor-pointer hover:text-accent transition"
          >
            {toggle ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
          </span>
        </div>
        {errors.password && (
          <span className="text-red-500 text-xs mt-1">
            This field is required
          </span>
        )}
      </div>

      {/* Confirm Password (Animated) */}
      <AnimatePresence>
        {password && (
          <motion.div
            key="confirmPassword"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col text-left relative"
          >
            <label className="text-sm font-semibold text-gray-200 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter your password"
              className={`w-full px-4 py-3 rounded-lg bg-white/10 text-white  hover:border-accent placeholder-gray-200 border ${
                password && passwordConfirm && password !== passwordConfirm
                  ? "border-red-500 focus:border-red-500 focus:ring-red-400"
                  : "border-gray-600 focus:border-accent focus:ring-accent"
              } focus:outline-none focus:ring-2 transition`}
              {...register("passwordConfirm", { required: true })}
            />
            {password && passwordConfirm && password !== passwordConfirm ? (
              <span className="text-red-500 text-xs mt-1">
                Passwords do not match
              </span>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <button
        type="submit"
        disabled={isButtonDisabled}
        className={`w-full py-3 rounded-lg font-semibold text-lg tracking-wide shadow-lg transition ${
          isButtonDisabled
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-accent text-white hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98]"
        }`}
      >
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;
