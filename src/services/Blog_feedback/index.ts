/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// create feedback
export const createFeedback = async (Data: FormData): Promise<any> => {
  try {
    const res = await fetch(
      `${config().Backend_URL}/feedbacks/create-feedback`,
      {
        method: "POST",
        body: Data,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("FEEDBACKS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// get feedbacks author wise
export const getFeedbacksAuthorWise = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  try {
    // Build dynamic query params
    const params = new URLSearchParams();

    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => v && params.append(key, v));
        } else if (value) {
          params.append(key, value);
        }
      });
    }

    // Construct the final URL with only valid params
    const url = `${config().Backend_URL}/feedbacks${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    // console.log(url);
    const res = await fetch(url, {
      method: "GET",
      next: { tags: ["FEEDBACKS"] },
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get feedbacks Blog Wise
export const getFeedbacksBlogWise = async (id: string) => {
  try {
    const res = await fetch(
      `${config().Backend_URL}/feedbacks/blog-wise-feedback/${id}`,
      {
        next: {
          tags: ["FEEDBACKS"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get a feedback
export const getAFeedback = async (id: string) => {
  try {
    const res = await fetch(`${config().Backend_URL}/feedbacks/${id}`, {
      next: {
        tags: ["FEEDBACKS"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// update feedback
export const updateFeedback = async (
  id: string,
  payload: FormData
): Promise<any> => {
  try {
    const res = await fetch(`${config().Backend_URL}/feedbacks/${id}`, {
      method: "PATCH",
      body: payload,
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("FEEDBACKS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// delete feedback
export const deleteFeedback = async (id: string): Promise<any> => {
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
