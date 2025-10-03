/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// create blog
export const createBlog = async (Data: FormData): Promise<any> => {
  try {
    const res = await fetch(`${config().Backend_URL}/blogs/create-blog`, {
      method: "POST",
      body: Data,
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("BLOGS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// get blogs
export const getBlogs = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  try {
    const res = await fetch(
      `${
        config().Backend_URL
      }/blogs?limit=${limit}&page=${page}&searchTerm=${query}`,
      {
        next: {
          tags: ["BLOGS"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get a blog
export const getABlog = async (id: string) => {
  try {
    const res = await fetch(`${config().Backend_URL}/blogs/${id}`, {
      next: {
        tags: ["BLOGS"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// update blog
export const updateBlog = async (
  id: string,
  payload: FormData
): Promise<any> => {
  try {
    const res = await fetch(`${config().Backend_URL}/blogs/${id}`, {
      method: "PATCH",
      body: payload,
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("BLOGS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// update cover photo
export const updateCoverPhoto = async (
  id: string,
  payload: FieldValues
): Promise<any> => {
  try {
    const res = await fetch(`${config().Backend_URL}/blogs/${id}`, {
      method: "PUT",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    revalidateTag("BLOGS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// delete blog
export const deleteblog = async (id: string): Promise<any> => {
  try {
    const res = await fetch(`${config().Backend_URL}/blogs/delete-blog/${id}`, {
      method: "PUT",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("BLOGS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
