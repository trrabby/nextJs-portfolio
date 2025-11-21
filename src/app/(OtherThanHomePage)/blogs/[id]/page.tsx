import Image from "next/image";
import { getABlog } from "@/services/Blogs";
import BlogInteractions from "./_InterectiveSec/BlogInteractions";
import { formatDate } from "@/utils/DateFormat";
import BackButton from "../../../../components/BackButton";
import BlogCarousel from "./_InterectiveSec/BlogCarousel";
import UpdateButton from "./_InterectiveSec/UpdateButton";

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: blog } = await getABlog(id);
  const blogData = blog[0];

  // console.log(blogData);

  if (!blogData) {
    return (
      <div className="py-20 text-center text-xl text-gray-500 dark:text-gray-400">
        Blog not found.
      </div>
    );
  }

  return (
    <article className="group flex flex-col md:rounded-2xl overflow-hidden border bg-gray-100 dark:bg-gray-900 shadow-lg transition-all duration-500 hover:shadow-xl text-gray-700 dark:text-gray-300 border-accent/20 dark:border-gray-800 py-16 px-5 lg:px-20 space-y-10">
      {/* COVER IMAGE */}
      <div className="relative w-full h-80 lg:h-[500px] rounded-2xl overflow-hidden shadow-md">
        <div className="p-2 absolute z-10">
          <BackButton />
        </div>

        <BlogCarousel thumbnails={blogData.thumbnails} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white">
          <h1 className="text-xl lg:text-5xl font-bold drop-shadow-lg">
            {blogData.title}
          </h1>
          <p className="text-sm mt-2 opacity-90">
            Category:{" "}
            <span className="font-medium text-accent dark:text-yellow-400">
              {blogData.category}
            </span>
          </p>
        </div>
      </div>

      {/* AUTHOR SECTION */}
      <div>
        <div className="flex items-center gap-4 border-b border-gray-300 dark:border-gray-700 pb-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700">
              <Image
                src={
                  typeof blogData.author === "object"
                    ? blogData.author.imgUrl
                    : "/default-user.png"
                }
                alt="Author"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                {typeof blogData.author === "object"
                  ? blogData.author.name
                  : blogData.author}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {typeof blogData.author === "object" && blogData.author.email}
              </p>
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs gap-1 mt-1">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM5 21V8h14v13H5z"></path>
                </svg>
                {formatDate(blogData?.createdAt)}
              </div>
            </div>
          </div>
          <UpdateButton id={blogData._id} />
        </div>
      </div>

      {/* BLOG CONTENT */}
      <div
        className="prose max-w-none text-gray-800 dark:text-gray-200 leading-relaxed prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-accent dark:prose-a:text-yellow-400"
        dangerouslySetInnerHTML={{ __html: blogData.content }}
      />

      {/* CLIENT INTERACTIONS */}
      <div className="border-t border-gray-300 dark:border-gray-700 pt-8">
        <BlogInteractions />
      </div>
    </article>
  );
};

export default BlogDetailsPage;
