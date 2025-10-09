"use client";

import React, { useEffect, useState } from "react";
import { IUser } from "@/constants";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { getBlogs } from "@/services/Blogs";
import Link from "next/link";

const DashboardHome = () => {
  const user = useAppSelector(selectCurrentUser) as IUser | null;
  const [blogCount, setBlogCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user?._id) return;

    const fetchUserBlogs = async () => {
      try {
        const data = await getBlogs("", "", { author: user._id });
        if (Array.isArray(data.data.result)) {
          setBlogCount(data.data.result.length);
        } else {
          setBlogCount(0);
        }
      } catch (error) {
        console.error("Failed to fetch user blogs:", error);
        setBlogCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        <p>Please log in to view your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
        Welcome, <span className="text-accent">{user.name}</span>!
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading your blogs...</p>
      ) : (
        <div className="flex flex-col items-center gap-4 bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm w-full max-w-md text-center transition-all">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            You have <span className="font-bold text-accent">{blogCount}</span>{" "}
            {blogCount === 1 ? "blog" : "blogs"}.
          </p>

          {blogCount === 0 && (
            <Link
              href="/dashboard/blogs/add"
              className="px-6 py-2 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition-colors"
            >
              Add Your First Blog
            </Link>
          )}

          {blogCount > 0 && (
            <p className="text-gray-500 dark:text-gray-400">
              Keep writing to grow your collection!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
