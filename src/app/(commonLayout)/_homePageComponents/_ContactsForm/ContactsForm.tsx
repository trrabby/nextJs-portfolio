"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import { config } from "@/config";
import { toast } from "sonner";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

export const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formInfo: any) => {
    const templateParams = {
      name: formInfo.name,
      email: formInfo.email,
      number: formInfo.number,
      message: formInfo.message,
    };

    const toastId = toast.loading("Sending message...");
    setLoading(true);
    emailjs
      .send(
        config().EmailJS_Service_ID as string,
        config().EmailJS_Template_ID as string,
        templateParams,
        config().EmailJS_User_ID! as string
      )
      .then(
        () => {
          toast.success(
            "Message sent successfully! You will be responded soon.",
            { id: toastId }
          );
          reset();
        },
        () => {
          toast.error("Failed to send message. Please try again later.", {
            id: toastId,
          });
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-5 flex flex-col gap-6 w-full lg:w-10/12"
    >
      {/* Full Name */}
      <div className="flex flex-col w-full text-left">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
          Full Name
        </label>
        <div className="relative">
          <MdDriveFileRenameOutline className="absolute left-3 top-4 text-gray-400 dark:text-gray-300" />
          <input
            type="text"
            placeholder="Enter your full name"
            {...register("name", { required: true })}
            className="w-full pl-10 pr-4 py-3 rounded-lg 
            bg-gray-100 dark:bg-white/10 
            text-gray-900 dark:text-white 
            placeholder-gray-500 dark:placeholder-gray-300 
            border border-gray-300 dark:border-gray-600 
            focus:outline-none hover:border-accent focus:border-accent focus:ring-2 focus:ring-accent transition"
          />
        </div>
        {errors.name && (
          <span className="text-red-500 text-xs mt-1">
            This field is required
          </span>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col w-full text-left">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
          Email
        </label>
        <div className="relative">
          <AiOutlineMail className="absolute left-3 top-4 text-gray-400 dark:text-gray-300" />
          <input
            type="email"
            placeholder="Enter your email address"
            {...register("email", { required: true })}
            className="w-full pl-10 pr-4 py-3 rounded-lg 
            bg-gray-100 dark:bg-white/10 
            text-gray-900 dark:text-white 
            placeholder-gray-500 dark:placeholder-gray-300 
            border border-gray-300 dark:border-gray-600 
            focus:outline-none hover:border-accent focus:border-accent focus:ring-2 focus:ring-accent transition"
          />
        </div>
        {errors.email && (
          <span className="text-red-500 text-xs mt-1">
            This field is required
          </span>
        )}
      </div>

      {/* Phone Number */}
      <div className="flex flex-col w-full text-left">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
          Mobile Number
        </label>
        <div className="relative">
          <AiOutlinePhone className="absolute left-3 top-4 text-gray-400 dark:text-gray-300" />
          <input
            type="number"
            placeholder="Enter your contact number"
            {...register("number", { required: true })}
            className="w-full pl-10 pr-4 py-3 rounded-lg 
            bg-gray-100 dark:bg-white/10 
            text-gray-900 dark:text-white 
            placeholder-gray-500 dark:placeholder-gray-300 
            border border-gray-300 dark:border-gray-600 
            focus:outline-none hover:border-accent focus:border-accent focus:ring-2 focus:ring-accent transition"
          />
        </div>
        {errors.number && (
          <span className="text-red-500 text-xs mt-1">
            This field is required
          </span>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col w-full text-left">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
          Message
        </label>
        <textarea
          {...register("message", { required: true })}
          placeholder={`Hi Towfiq, I'm interested in building a modern eCommerce website for my fashion brand...`}
          className="w-full px-4 py-3 h-40 rounded-lg 
          bg-gray-100 dark:bg-white/10 
          text-gray-900 dark:text-white 
          placeholder-gray-500 dark:placeholder-gray-300 
          border border-gray-300 dark:border-gray-600 
          focus:outline-none hover:border-accent focus:border-accent focus:ring-2 focus:ring-accent transition resize-none"
        ></textarea>
        {errors.message && (
          <span className="text-red-500 text-xs mt-1">
            This field is required
          </span>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-accent text-white font-semibold text-lg tracking-wide shadow-lg hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};
