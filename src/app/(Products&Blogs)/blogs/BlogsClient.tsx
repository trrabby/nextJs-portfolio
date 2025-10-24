"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

type Blog = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  shortDescription: string;
  createdAt: string;
};

type Props = {
  blogs: Blog[];
  categories: string[];
};

const BlogsClient: React.FC<Props> = ({ blogs, categories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // Filter logic
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchCategory =
        selectedCategory === "All" || blog.category === selectedCategory;
      const matchSearch = blog.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [blogs, searchTerm, selectedCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* --- Header Controls --- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold">Explore Blogs</h1>

        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* --- Blogs Grid --- */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {paginatedBlogs.map((blog) => (
          <motion.div
            key={blog._id}
            className="border rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            <Image
              src={blog.image}
              alt={blog.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-2">
              <h2 className="text-xl font-semibold line-clamp-2">
                {blog.title}
              </h2>
              <p className="text-gray-500 text-sm">
                {blog.author} •{" "}
                {new Date(blog.createdAt).toLocaleDateString("en-BD")}
              </p>
              <p className="text-gray-600 line-clamp-3">
                {blog.shortDescription}
              </p>

              <Link
                href={`/blogs/${blog._id}`}
                className="inline-block mt-2 text-blue-600 hover:underline"
              >
                Read More →
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* --- Empty State --- */}
      {filteredBlogs.length === 0 && (
        <p className="text-center text-gray-500 mt-12">
          No blogs found matching your search or filter.
        </p>
      )}

      {/* --- Pagination --- */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded-lg border ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default BlogsClient;
