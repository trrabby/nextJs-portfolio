/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { updateBlog } from "@/services/Blogs";
import { toast } from "sonner";
import useImageHandler from "@/hooks/useImgHandler";
import Image from "next/image";
import { motion } from "framer-motion";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useRouter } from "next/navigation";
import { SectionHead } from "@/components/SectionHead";
import { Typewriter } from "react-simple-typewriter";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export interface IBlogFormData {
  title: string;
  category: string;
  tags: string;
  featured?: boolean;
  content: string;
}

interface BlogData {
  _id: string;
  title: string;
  category: string;
  tags: string;
  featured: boolean;
  content: string;
  thumbnails: string[];
}

interface UpdateBlogClientProps {
  blogData: BlogData;
}

const UpdateBlogClient = ({ blogData }: UpdateBlogClientProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IBlogFormData>({
    defaultValues: {
      title: blogData.title,
      category: blogData.category,
      tags: blogData.tags,
      featured: blogData.featured,
      content: blogData.content,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverThumbnails, setServerThumbnails] = useState<string[]>(
    blogData.thumbnails
  );
  const router = useRouter();

  const {
    previews: thumbnailPreviews,
    files: thumbnailFiles,
    loading: thumbnailLoading,
    setFiles: setThumbnailFiles,
    setPreviews,
  } = useImageHandler(true);

  // Initialize previews with server thumbnails on component mount
  useEffect(() => {
    if (serverThumbnails.length > 0) {
      setPreviews(serverThumbnails);
    }
  }, [serverThumbnails, setPreviews]);

  // Enhanced handler for new file uploads that properly preserves existing previews
  const handleNewThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const newFiles = Array.from(selectedFiles);

    // Generate previews for new files and add to existing previews
    const newPreviews: string[] = [];
    let processed = 0;

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        processed++;

        if (processed === newFiles.length) {
          // Add new files to files array
          const updatedFiles = [...thumbnailFiles, ...newFiles];
          setThumbnailFiles(updatedFiles);

          // Add new previews to existing ones (server thumbnails + new previews)
          setPreviews((prev) => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset the input to allow selecting the same files again
    e.target.value = "";
  };

  const onSubmit = async (data: IBlogFormData) => {
    if (!data.content || data.content.trim() === "<p></p>") {
      toast.error("Content is required");
      return;
    }

    const toastId = toast.loading("Updating blog...");
    setIsSubmitting(true);

    try {
      const tagsArray = data.tags
        ? data.tags.split(",").map((t) => t.trim())
        : [];

      const payload = {
        ...data,
        previousUploadedImg: serverThumbnails, // Send remaining server thumbnails
        tags: tagsArray,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));

      // Append new thumbnail files if any
      thumbnailFiles.forEach((file) => formData.append("files", file));

      const response = await updateBlog(blogData._id, formData);

      if (response.success) {
        toast.success("Blog updated successfully!", { id: toastId });
        router.push(`/blogs/${blogData._id}`);
      } else if (response?.errorSources && response.errorSources.length > 0) {
        // Show all validation error messages
        response.errorSources.forEach((err: any) => {
          toast.error(`${err.path}: ${err.message}`, { id: toastId });
        });
      } else {
        toast.error("Failed to update blog", { id: toastId });
        console.log(response);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveThumbnail = (index: number) => {
    // Create new arrays for updates
    const updatedPreviews = [...thumbnailPreviews];
    const removedPreview = updatedPreviews[index];

    // Remove the preview
    updatedPreviews.splice(index, 1);

    // Check if the removed preview is from server or new upload
    const isServerThumbnail = serverThumbnails.includes(removedPreview);

    if (isServerThumbnail) {
      // Remove from server thumbnails
      const updatedServerThumbnails = serverThumbnails.filter(
        (thumb) => thumb !== removedPreview
      );
      setServerThumbnails(updatedServerThumbnails);
    } else {
      // Remove from files array - find the corresponding file
      // Since new files are added after server thumbnails, we need to find the correct file index
      const serverThumbnailsCount = serverThumbnails.length;
      const newFilesStartIndex = serverThumbnailsCount;

      if (index >= newFilesStartIndex) {
        const fileIndex = index - newFilesStartIndex;
        if (fileIndex >= 0 && fileIndex < thumbnailFiles.length) {
          const updatedFiles = [...thumbnailFiles];
          updatedFiles.splice(fileIndex, 1);
          setThumbnailFiles(updatedFiles);
        }
      }
    }

    // Update previews
    setPreviews(updatedPreviews);
  };

  // Helper function to check if a preview is from server
  const isServerPreview = (previewUrl: string) => {
    return serverThumbnails.includes(previewUrl);
  };

  // Calculate counts for display
  const serverThumbnailsCount = thumbnailPreviews.filter((preview) =>
    isServerPreview(preview)
  ).length;
  const newFilesCount = thumbnailFiles.length;

  return (
    <div className="min-h-screen bg-gradient-to-br md:p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl md:p-10"
      >
        <SectionHead
          title="Update Blog"
          titleColor="text-[#04d1a1] dark:text-[#04d1a1] pb-4"
          para={`Update your blog content and images. Turn On PC mode on your browser to access all features.`}
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
                {...register("title", { required: "Title is required" })}
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
                {...register("category", { required: "Category is required" })}
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
              {...register("tags", { required: "Tags are required" })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#04d1a1] bg-gray-50 dark:bg-gray-800 dark:border-[#04d1a1]"
            />
            {errors.tags && (
              <p className="text-red-500 mt-1">{errors.tags.message}</p>
            )}
          </div>

          {/* Blog Content */}
          <div className="flex flex-col w-full">
            <label className="font-medium mb-2 h-6">
              <Typewriter
                words={[
                  "Update your blog content...",
                  "Modify your content here...",
                  "Revise your thoughts...",
                  "Update your ideas...",
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
              rules={{ required: "Content is required" }}
              render={({ field }) => (
                <SimpleEditor value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.content && (
              <p className="text-red-500 mt-1">{errors.content.message}</p>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex flex-col w-full">
            <label className="font-medium mb-2 text-lg text-gray-700 dark:text-gray-200">
              Update Thumbnails
            </label>

            {/* Upload Box */}
            <label
              className="border-2 border-dashed border-[#04d1a1] dark:border-[#04d1a1]/60 
               rounded-2xl p-6 flex flex-col items-center justify-center gap-3
               cursor-pointer bg-gray-50 dark:bg-gray-800/40 
               hover:bg-[#04d1a1]/5 dark:hover:bg-[#04d1a1]/10 
               transition-all duration-300"
            >
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Click to upload new images
              </span>

              <span className="text-xs text-gray-500 dark:text-gray-400">
                You can add max 5 photos.
              </span>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleNewThumbnailChange}
                className="hidden"
              />
            </label>

            {/* Loading */}
            {thumbnailLoading && (
              <p className="text-sm text-[#04d1a1] mt-2">Loading previews...</p>
            )}

            {/* Preview Grid */}
            {thumbnailPreviews.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Thumbnails:{" "}
                  {`(${serverThumbnailsCount} existing, ${newFilesCount} new)`}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {thumbnailPreviews.map((src, idx) => (
                    <div
                      key={`${src}-${idx}`}
                      className="relative group w-full aspect-square rounded-xl overflow-hidden
                       border border-[#04d1a1]/40 dark:border-[#04d1a1]/60 
                       shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {/* Zoomable Image */}
                      <Zoom>
                        <Image
                          src={src}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-cover cursor-zoom-in group-hover:scale-105 
                           transition-transform duration-500"
                        />
                      </Zoom>

                      {/* Badge for server vs new images */}
                      {isServerPreview(src) && (
                        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
                          Existing
                        </div>
                      )}

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveThumbnail(idx)}
                        className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 
                         text-xs rounded-full flex items-center justify-center
                         opacity-90 hover:bg-red-600 transition-all duration-200 shadow-md"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
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

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-4 font-semibold rounded-xl border-2 border-gray-400 
               text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 
               text-lg transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 py-4 font-semibold rounded-xl text-accent hover:text-fourth 
               dark:text-white text-lg transition-all duration-200 ${
                 isSubmitting
                   ? "bg-gray-400 cursor-not-allowed"
                   : "bg-transparent border-2 border-accent hover:bg-[#04d1a1]"
               }`}
            >
              {isSubmitting ? "Updating..." : "Update Blog"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateBlogClient;
