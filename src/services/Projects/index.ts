/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// add project
export const createProject = async (Data: FormData): Promise<any> => {
  try {
    const res = await fetch(`${config().Backend_URL}/projects/create-project`, {
      method: "POST",
      body: Data,
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("PROJECTS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// get projects
export const getProjects = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  try {
    const res = await fetch(
      `${
        config().Backend_URL
      }/projects?limit=${limit}&page=${page}&searchTerm=${query}`,
      {
        next: {
          tags: ["PROJECTS"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get a project
export const getAProject = async (id: string) => {
  try {
    const res = await fetch(`${config().Backend_URL}/projects/${id}`, {
      next: {
        tags: ["PROJECTS"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// update project
export const updateProject = async (
  id: string,
  payload: FormData
): Promise<any> => {
  try {
    const res = await fetch(`${config().Backend_URL}/projects/${id}`, {
      method: "PATCH",
      body: payload,
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("PROJECTS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// delete project
export const deleteProject = async (id: string): Promise<any> => {
  try {
    const res = await fetch(
      `${config().Backend_URL}/projects/delete-project/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("PROJECTS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
