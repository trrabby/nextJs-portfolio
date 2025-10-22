/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { createBlog } from "@/services/Blogs";
import { toast } from "sonner";
import useImageHandler from "@/hooks/useImgHandler";
import Image from "next/image";
import { motion } from "framer-motion";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useRouter } from "next/navigation";
import { SectionHead } from "@/components/SectionHead";
import { Typewriter } from "react-simple-typewriter";

export interface IBlogFormData {
  title: string;
  category: string;
  tags: string;
  featured?: boolean;
  content: string;
}

const AddBlogPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IBlogFormData>({
    defaultValues: {
      title: "",
      category: "",
      tags: "",
      featured: false,
      content: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    previews: thumbnailPreviews,
    files: thumbnailFiles,
    loading: thumbnailLoading,
    handleImageChange: handleThumbnailChange,
    resetImages: resetThumbnails,
  } = useImageHandler(true);

  const onSubmit = async (data: IBlogFormData) => {
    if (!data.content || data.content.trim() === "<p></p>") {
      toast.error("Content is required");
      return;
    }

    const toastId = toast.loading("Publishing blog...");
    setIsSubmitting(true);

    try {
      const tagsArray = data.tags
        ? data.tags.split(",").map((t) => t.trim())
        : [];

      console.log(data);

      const payload = { ...data, tags: tagsArray };
      console.log(payload);
      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      thumbnailFiles.forEach((file) => formData.append("files", file));

      const response = await createBlog(formData);

      if (response.success) {
        toast.success("Blog published successfully!", { id: toastId });
        reset();
        resetThumbnails();
        router.push("/dashboard/blogs/add");
      } else if (response?.errorSources && response.errorSources.length > 0) {
        // Show all validation error messages
        response.errorSources.forEach((err: any) => {
          toast.error(`${err.path}: ${err.message}`, { id: toastId });
        });
      } else {
        toast.error("Failed to publish blog", { id: toastId });
        console.log(response);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br md:py-12 md:px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl md:p-10"
      >
        <SectionHead
          title="Add New Blog"
          titleColor="text-[#04d1a1] dark:text-[#04d1a1] pb-4"
          para={`Turn On PC mode on your browser to access all features.`}
          paraColor="lg:hidden text-[#04d1a1] dark:text-gray-300"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 w-10/12 mx-auto"
        >
          {/* Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/** Title */}
            <div className="flex flex-col">
              <label className="font-medium mb-2">Title</label>
              <input
                type="text"
                placeholder="Enter blog title"
                {...register("title", { required: true })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#04d1a1] bg-gray-50 dark:bg-gray-800 dark:border-[#04d1a1]"
              />
              {errors.title && (
                <p className="text-red-500 mt-1">{errors.title.message}</p>
              )}
            </div>

            {/** Category */}
            <div className="flex flex-col">
              <label className="font-medium mb-2">Category</label>
              <input
                type="text"
                placeholder="Enter category"
                {...register("category", { required: true })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#04d1a1] bg-gray-50 dark:bg-gray-800 dark:border-[#04d1a1]"
              />
              {errors.category && (
                <p className="text-red-500 mt-1">{errors.category.message}</p>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col">
            <label className="font-medium mb-2">Tags (comma separated)</label>
            <input
              type="text"
              placeholder="e.g., React,Next.js,Web Dev"
              {...register("tags", { required: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#04d1a1] bg-gray-50 dark:bg-gray-800 dark:border-[#04d1a1]"
            />
          </div>

          {/* Blog Content */}
          <div className="flex flex-col">
            <label className="font-medium mb-2 h-6">
              <Typewriter
                words={[
                  "Write your blog content...",
                  "Write your content here...",
                  "Share your thoughts...",
                  "Express your ideas...",
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </label>
            <Controller
              name="content"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <SimpleEditor value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.content && (
              <p className="text-red-500 mt-1">{errors.content.message}</p>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex flex-col">
            <label className="font-medium mb-2">Thumbnails</label>
            <input
              type="file"
              accept="image/*"
              required
              multiple
              onChange={handleThumbnailChange}
              className="text-gray-700 dark:text-[#f2f7ff]"
            />
            {thumbnailLoading && (
              <p className="text-sm text-[#04d1a1] mt-1">Loading previews...</p>
            )}

            {thumbnailPreviews.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {thumbnailPreviews.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative w-28 h-28 rounded-xl overflow-hidden border border-[#84fadf] dark:border-[#04d1a1] shadow-md"
                  >
                    <Image
                      src={src}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register("featured")}
              className="accent-[#04d1a1]"
            />
            <span className="text-md font-medium dark:text-white">
              Mark as Featured
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 font-semibold rounded-xl  text-accent hover:text-fourth dark:text-white  text-lg transition-all duration-200 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-transparent border-2 border-accent hover:bg-[#04d1a1]"
            }`}
          >
            {isSubmitting ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddBlogPage;
