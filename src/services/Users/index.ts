/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${config().Backend_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    revalidateTag("USERS");
    const result = await res.json();
    console.log(result);
    if (result.success) {
      (await cookies()).set("accessToken", result.data.accessToken);
      (await cookies()).set("refreshToken", result?.data?.refreshToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// get users
export const getUsers = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  try {
    const res = await fetch(
      `${config().Backend_URL}/users?limit=${limit}&page=${page}&${query}`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["USERS"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get a user
export const getMyProfileByEmail = async (email: string) => {
  try {
    const res = await fetch(
      `${config().Backend_URL}/users/meByEmail/${email}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get My Profile
export const getMyProfile = async () => {
  try {
    const res = await fetch(`${config().Backend_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const updateUser = async (userData: FormData, email: string) => {
  try {
    const res = await fetch(`${config().Backend_URL}/users/${email}`, {
      method: "PATCH",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: userData,
    });
    const result = await res.json();
    console.log(result);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
