/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { deleteblog, getBlogs } from "@/services/Blogs";
import { formatDate } from "@/utils/DateFormat";
import { IBlog, IUser } from "@/constants";
import BlogsTable, { DataType } from "./_manageTable/ManageTable";
import { toast } from "sonner";
import Swal from "sweetalert2";

const Page = () => {
  const user = useAppSelector(selectCurrentUser) as IUser;
  const [blogs, setBlogs] = useState<DataType[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchBlogs = async () => {
      setIsLoading(true);

      try {
        const query = user.role === "admin" ? {} : { author: user._id };
        const res = await getBlogs(String(page), String(limit), query);

        const mapped = (res?.data?.result || []).map((b: IBlog) => ({
          key: b._id!,
          title: b.title,
          category: b.category,
          author: typeof b.author === "string" ? b.author : b.author?.name,
          createdAt: formatDate(b.createdAt),
        }));

        setBlogs(mapped);
        setTotal(res?.data?.meta?.total || 0);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [user, page, limit]);

  const handlePageChange = (newPage: number, newPageSize?: number) => {
    setPage(newPage);
    if (newPageSize) {
      setLimit(newPageSize);
    }
  };

  const handleSearchChange = (
    newSearchText: string,
    newSearchedColumn: string
  ) => {
    setSearchText(newSearchText);
    setSearchedColumn(newSearchedColumn);
  };

  // Delete
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This blog will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "white",
      color: "black",
      customClass: {
        popup: "dark:bg-gray-800 dark:text-white",
      },
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        const deleteToast = toast.loading("Deleting...");
        try {
          // console.log(id);
          await deleteblog(id);

          // Refetch blogs after deletion
          const query = user.role === "admin" ? {} : { author: user._id };
          const res = await getBlogs(String(page), String(limit), query);
          const mapped = (res?.data?.result || []).map((b: IBlog) => ({
            key: b._id!,
            title: b.title,
            category: b.category,
            author: typeof b.author === "string" ? b.author : b.author?.name,
            createdAt: formatDate(b.createdAt),
          }));
          setBlogs(mapped);
          setTotal(res?.data?.meta?.total || 0);

          toast.success("Blog deleted successfully!", { id: deleteToast });
        } catch {
          toast.error("Failed to delete blog", { id: deleteToast });
        }
      }
    });
  };

  // Show loader while fetching data
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="animate-pulse">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center mb-6">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            </div>

            {/* Table Skeleton */}
            <div className="space-y-4">
              {/* Table Header Skeleton */}
              <div className="grid grid-cols-12 gap-4 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="col-span-2 h-6 bg-gray-200 dark:bg-gray-700 rounded"
                  ></div>
                ))}
                <div className="col-span-2 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>

              {/* Table Rows Skeleton */}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((row) => (
                <div key={row} className="grid grid-cols-12 gap-4 py-3">
                  <div className="col-span-3 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="col-span-2 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="col-span-2 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="col-span-2 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="col-span-3 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((page) => (
                  <div
                    key={page}
                    className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <BlogsTable
      blogs={blogs}
      total={total}
      page={page}
      limit={limit}
      searchText={searchText}
      searchedColumn={searchedColumn}
      onPageChange={handlePageChange}
      onSearchChange={handleSearchChange}
      onDelete={handleDelete}
    />
  );
};

export default Page;
