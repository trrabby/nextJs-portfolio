import React from "react";
import Link from "next/link";
import { IBlog } from "@/constants";
import Image from "next/image";
import { IoPricetags } from "react-icons/io5";

interface BlogCardProps {
  blog: IBlog;
}

export const BlogCard = ({ blog }: BlogCardProps) => {
  // Format date
  const formatDate = (date?: string | Date | null) => {
    if (!date) return "";
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Strip HTML tags safely
  const stripHtml = (html: string) => html.replace(/<[^>]+>/g, "");

  // Truncate text
  const truncateText = (text: string, maxLength: number) =>
    text.length <= maxLength ? text : text.slice(0, maxLength) + "...";

  return (
    <div className="flex flex-col bg-fourth dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1 w-full sm:w-[90%] md:w-80 mx-auto md:mx-0 overflow-hidden">
      {/* Image */}
      <div className="relative bg-fourth p-2">
        <div className="h-48">
          <Image
            src={
              blog?.coverImage ||
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            }
            alt={blog?.title}
            fill
            className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        {blog?.featured && (
          <span className="absolute top-3 right-3 bg-accent dark:bg-gray-400 text-white text-xs font-bold px-2 py-1 rounded">
            FEATURED
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 flex-1">
        {/* Category and Tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="bg-accent dark:bg-gray-400 text-fourth text-xs font-semibold px-2 py-1 rounded">
            {blog?.category}
          </span>
          {blog?.tags?.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="flex items-center gap-1 border border-gray-300 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded"
            >
              <IoPricetags />
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-black dark:text-fourth font-bold text-lg sm:text-xl line-clamp-2 mb-2">
          {blog?.title}
        </h3>

        {/* Content excerpt */}
        <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-4 flex-1">
          {truncateText(stripHtml(blog?.content || ""), 120)}
        </p>

        {/* Author & Date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <Image
                src={
                  blog?.author && typeof blog?.author !== "string"
                    ? blog?.author.imgUrl
                    : "https://randomuser.me/api/portraits/men/32.jpg"
                }
                alt={
                  typeof blog?.author === "string"
                    ? blog?.author
                    : blog?.author?.name
                }
                fill
                className="rounded-full border-2 border-accent"
              />
            </div>
            <div>
              <p className="text-gray-900 dark:text-fourth font-medium text-sm">
                {typeof blog?.author === "string"
                  ? blog?.author
                  : blog?.author?.name || "Unknown"}
              </p>
              <p className="flex items-center text-gray-500 dark:text-gray-400 text-xs gap-1">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM5 21V8h14v13H5z"></path>
                </svg>
                {formatDate(blog?.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Read More */}
        <Link
          href={`/blogs/${blog?._id}`}
          className="bg-transparent px-8 py-2 text-base font-medium text-accent dark:text-fourth shadow hover:bg-accent dark:hover:bg-slate-700 hover:scale-105 hover:text-white hover:border-white duration-700 border border-blue-200 mt-5 hover:duration-500 rounded-md mr-5 text-center w-10/12 mx-auto"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};
