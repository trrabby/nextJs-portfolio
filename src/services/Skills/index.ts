/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// create skill
export const createskill = async (Data: FormData): Promise<any> => {
  try {
    const res = await fetch(`${config().Backend_URL}/skills/add-skill`, {
      method: "POST",
      body: Data,
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("SKILLS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// get skills
export const getSkills = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  try {
    const res = await fetch(
      `${
        config().Backend_URL
      }/skills?limit=${limit}&page=${page}&searchTerm=${query}`,
      {
        next: {
          tags: ["SKILLS"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get a skill
export const getASkill = async (id: string) => {
  try {
    const res = await fetch(`${config().Backend_URL}/skills/${id}`, {
      next: {
        tags: ["SKILLS"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// update skill
export const updateSkill = async (
  id: string,
  payload: FormData
): Promise<any> => {
  try {
    const res = await fetch(`${config().Backend_URL}/skills/${id}`, {
      method: "PATCH",
      body: payload,
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("SKILLS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// delete skill
export const deleteSkill = async (id: string): Promise<any> => {
  try {
    const res = await fetch(
      `${config().Backend_URL}/skills/delete-skill/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("SKILLS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
