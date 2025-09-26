import { SectionHead } from "@/components/SectionHead";
import React from "react";
import { BlogCard } from "./_Cards/BlogCard";
import Link from "next/link";
import styles from "../styles.module.css";
const MyBlogs = [1, 2, 3, 4, 5];

const Blogs = () => {
  return (
    <div>
      <SectionHead
        title="Blogs"
        para="Insights, tutorials and thoughts on web development, programming and technology trends."
      />
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-3 justify-center items-center gap-5">
          {MyBlogs.slice(0, 3).map((blog) => (
            <div key={blog}>
              <BlogCard />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end items-center pl-40 pb-10">
        <Link
          className={`${styles.styled_button1} border border-blue-200 mt-5`}
          href={"/blogs"}
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default Blogs;
