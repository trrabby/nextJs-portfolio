/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BlogCard } from "@/app/(CommonLayout)/_homePageComponents/_Cards/BlogCard";
import { getBlogs } from "@/services/Blogs";
import { IBlog } from "@/constants";
import { SectionHead } from "@/components/SectionHead";
import BackButton from "../../../../components/BackButton";

interface BlogsClientProps {
  initialBlogs: IBlog[];
  total: number;
  categories: string[];
}

const BlogsClient = ({ initialBlogs, total, categories }: BlogsClientProps) => {
  const [blogs, setBlogs] = useState<IBlog[]>(initialBlogs);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(Math.ceil(total / limit));
  const [loading, setLoading] = useState(false);

  // Accept values as parameters to always use the latest
  const fetchBlogs = async (
    newPage: number,
    newSearch: string,
    newCategory: string,
    newSort: string
  ) => {
    // Only fetch if any filter or page is applied
    if (!newPage && !newSearch && !newCategory && !newSort) return;

    try {
      setLoading(true);
      const res: any = await getBlogs(String(newPage), String(limit), {
        searchTerm: newSearch,
        category: newCategory,
        sort: newSort,
      });
      const data = res?.data?.result || [];
      const noOfData = res?.data?.meta?.total || 0;
      setBlogs(data);
      setTotalPages(Math.ceil(noOfData / limit));
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-5 lg:px-20">
      <div className="p-2 absolute">
        <BackButton />
      </div>

      <SectionHead
        title="All Blogs"
        titleColor="text-gray-800 dark:text-fourth"
        para="Dive into insights, guides, and ideas on web development, technology, and design. Filter, search, or sort to find what you need."
        paraColor="text-gray-600 dark:text-fourth"
      />

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center mt-10 gap-5">
        <input
          type="text"
          placeholder="Search blogs..."
          className="border px-4 py-2 rounded-md w-full sm:w-1/3 focus:outline-none"
          onKeyUp={async (e: any) => {
            const value = (e.target as HTMLInputElement).value;
            setSearch(value);
            const newPage = 1;
            setPage(newPage);
            await fetchBlogs(newPage, value, category, sort);
          }}
        />

        <div className="flex flex-row gap-4 items-center justify-center">
          <select
            className="border rounded-md px-3 py-2 text-gray-700 dark:text-fourth w-6/12"
            value={category}
            onChange={async (e) => {
              const value = e.target.value;
              setCategory(value);
              const newPage = 1;
              setPage(newPage);
              await fetchBlogs(newPage, search, value, sort);
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
            className="border rounded-md px-3 py-2 text-gray-700 dark:text-fourth w-6/12"
            value={sort}
            onChange={async (e) => {
              const value = e.target.value;
              setSort(value);
              const newPage = 1;
              setPage(newPage);
              await fetchBlogs(newPage, search, category, value);
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

      {/* Loading */}
      {loading && (
        <div className="flex gap-2 items-center justify-center mt-20">
          <p>Please wait, fetching blogs...</p>
          <div className="animate-spin rounded-full h-6 w-6 border-4 border-muted border-t-gray-950" />
        </div>
      )}

      {/* Blog Grid */}
      {!loading && (
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
                  <div className="flex justify-around">
                    <BlogCard blog={blog} />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-12 gap-4">
        <button
          disabled={page <= 1}
          onClick={async () => {
            const newPage = page - 1;
            setPage(newPage);
            await fetchBlogs(newPage, search, category, sort);
          }}
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
          onClick={async () => {
            const newPage = page + 1;
            setPage(newPage);
            await fetchBlogs(newPage, search, category, sort);
          }}
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
