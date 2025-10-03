/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// create experience
export const createExperience = async (Data: FormData): Promise<any> => {
  try {
    const res = await fetch(
      `${config().Backend_URL}/experiences/create-experience`,
      {
        method: "POST",
        body: Data,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("EXPERIENCES");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// get experiences
export const getExperiences = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  try {
    const res = await fetch(
      `${
        config().Backend_URL
      }/experiences?limit=${limit}&page=${page}&searchTerm=${query}`,
      {
        next: {
          tags: ["EXPERIENCES"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get a experience
export const getAExperience = async (id: string) => {
  try {
    const res = await fetch(`${config().Backend_URL}/experiences/${id}`, {
      next: {
        tags: ["EXPERIENCES"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// update experience
export const updateExperience = async (
  id: string,
  payload: FormData
): Promise<any> => {
  try {
    const res = await fetch(`${config().Backend_URL}/experiences/${id}`, {
      method: "PATCH",
      body: payload,
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("EXPERIENCES");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// update inst logo
export const updateInstLogo = async (
  id: string,
  payload: FormData
): Promise<any> => {
  try {
    const res = await fetch(
      `${config().Backend_URL}/experiences/update-logo/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: payload,
      }
    );
    revalidateTag("EXPERIENCES");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// delete experience
export const deleteExperience = async (id: string): Promise<any> => {
  try {
    const res = await fetch(
      `${config().Backend_URL}/experiences/delete-experience/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("EXPERIENCES");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
