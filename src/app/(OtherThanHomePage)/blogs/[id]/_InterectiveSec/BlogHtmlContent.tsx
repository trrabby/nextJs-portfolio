/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import parse from "html-react-parser";

export default function BlogHtmlContent({ blogData }: any) {
  return (
    <div className="px-4 py-8 text-gray-900 dark:text-gray-200">
      {parse(blogData.content)}
    </div>
  );
}
