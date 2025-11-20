import { getABlog } from "@/services/Blogs";
import UpdateBlogClient from "./_clientPage/UpdateBlogClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

const UpdateBlogPage = async ({ params }: PageProps) => {
  const { id } = await params;

  try {
    const { data: blog } = await getABlog(id);
    const blogItem = blog[0];

    if (!blogItem) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center py-20 text-xl text-gray-500 dark:text-gray-400">
            Blog not found.
          </div>
        </div>
      );
    }

    // Prepare the blog data for the client component
    const blogData = {
      _id: blogItem._id,
      title: blogItem.title || "",
      category: blogItem.category || "",
      tags: blogItem.tags?.join(", ") || "",
      featured: blogItem.featured || false,
      content: blogItem.content || "",
      thumbnails: blogItem.thumbnails || [],
    };

    return <UpdateBlogClient blogData={blogData} />;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-20 text-xl text-gray-500 dark:text-gray-400">
          Failed to load blog. Please try again.
        </div>
      </div>
    );
  }
};

export default UpdateBlogPage;
