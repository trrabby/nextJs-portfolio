"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useCallback } from "react";
import { BlogCard } from "@/app/(CommonLayout)/_homePageComponents/_Cards/BlogCard";
import { getBlogs } from "@/services/Blogs";
import { IBlog } from "@/constants";
import { SectionHead } from "@/components/SectionHead";
import { motion } from "framer-motion";

const BlogsClient = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState(""); // alphabetical | date
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const res: any = await getBlogs(String(page), String(limit), {
        searchTerm: search,
        category,
        sort,
      });
      const data = res?.data?.result || [];
      setBlogs(data);
      const noOfData = res?.data?.meta?.total;
      const totalPageCount = noOfData ? Math.ceil(noOfData / limit) : 1;
      setTotalPages(totalPageCount || 1);

      // Extract unique categories dynamically from blogs

      const extractCategory: any = await getBlogs();
      const catagoryData = extractCategory?.data?.result || [];
      const allCategories: string[] = Array.from(
        new Set(catagoryData?.map((b: IBlog) => b.category).filter(Boolean))
      );
      if (allCategories.length > 0) setCategories(allCategories);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, category, sort]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <section className="py-16 px-5 lg:px-20">
      <SectionHead
        title="All Blogs"
        titleColor="text-gray-800 dark:text-fourth"
        para="Dive into insights, guides, and ideas on web development, technology, and design. Filter, search, or sort to find what you need."
        paraColor="text-gray-600 dark:text-fourth"
      />

      {/* --- Filters --- */}
      <div className="flex flex-wrap justify-between items-center mt-10 gap-5 ">
        <input
          type="text"
          placeholder="Search blogs..."
          className="border px-4 py-2 rounded-md w-full sm:w-1/3 focus:outline-none"
          onKeyUp={(e: any) => {
            setSearch((e.target as HTMLInputElement).value);
            setPage(1);
          }}
        />

        <div className="flex flex-row md:flex-row gap-4 items-center justify-center">
          <select
            className="border rounded-md px-3 py-2 text-gray-700 dark:text-fourth"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            className="border rounded-md px-3 py-2 text-gray-700 dark:text-fourth"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Sort By</option>
            <option value="title">Alphabetical (A–Z)</option>
            <option value="-title">Alphabetical (Z–A)</option>
            <option value="createdAt">Oldest First</option>
            <option value="-createdAt">Newest First</option>
          </select>
        </div>
      </div>
      {loading && (
        <div className="flex gap-2 items-center justify-center mt-20 ">
          <p>Please wait, fetching blogs...</p>
          <div className="animate-spin rounded-full h-6 w-6 border-4 border-muted border-t-gray-950" />
        </div>
      )}

      {/* --- Blog Grid --- */}
      {!loading && (
        <div>
          <div>
            {blogs.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">
                No blogs found.
              </p>
            ) : (
              <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-between mt-12 w-full mx-auto gap-8">
                {blogs.map((blog) => (
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex justify-around ">
                      <BlogCard blog={blog} />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {/* --- Pagination --- */}
      <div className="flex justify-center items-center mt-12 gap-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
          className={`px-4 py-2 border rounded-md ${
            page <= 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-accent hover:text-white transition"
          }`}
        >
          Prev
        </button>

        <span className="text-gray-700 dark:text-fourth">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className={`px-4 py-2 border rounded-md ${
            page >= totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-accent hover:text-white transition"
          }`}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default BlogsClient;
