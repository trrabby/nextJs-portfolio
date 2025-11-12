/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBlogs } from "@/services/Blogs";
import BlogsClient from "./_blogClient/BlogClient";

export const revalidate = 60; // cache refresh every 1 minute

const BlogsPage = async () => {
  const res = await getBlogs("1", "8");
  const blogs = res?.data?.result || [];
  const total = res?.data?.meta?.total || 0;

  // Fetch all categories once (server-side)
  const catRes = await getBlogs();
  const catData = catRes?.data?.result || [];
  const categories = Array.from(
    new Set(catData.map((b: any) => b.category).filter(Boolean))
  );

  return (
    <BlogsClient
      initialBlogs={blogs}
      total={total}
      categories={categories as string[]}
    />
  );
};

export default BlogsPage;
