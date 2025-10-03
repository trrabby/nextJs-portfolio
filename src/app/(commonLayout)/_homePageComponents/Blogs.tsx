import { SectionHead } from "@/components/SectionHead";
import React from "react";
import { BlogCard } from "./_Cards/BlogCard";
import Link from "next/link";
const MyBlogs = [1, 2, 3, 4, 5];

const Blogs = () => {
  return (
    <div>
      <SectionHead
        title="Blogs"
        titleColor="text--gray-800 dark:text-fourth"
        para="Insights, tutorials and thoughts on web development, programming and technology trends."
        paraColor="text-gray-600 dark:text-fourth"
      />
      <div className="flex justify-center items-center mt-10">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center items-center gap-5">
          {MyBlogs.slice(0, 3).map((blog) => (
            <div key={blog}>
              <BlogCard />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end items-center pl-40 pb-10">
        <Link
          className={`className="rounded bg-transparent px-8 py-3 text-base font-medium text-accent dark:text-fourth shadow hover:bg-accent dark:hover:bg-slate-700 hover:scale-105 hover:text-white hover:border-white duration-700 border border-blue-200 mt-5 hover:duration-500 rounded-md mr-5`}
          href={"/blogs"}
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default Blogs;
