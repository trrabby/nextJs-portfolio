/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${config().Backend_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (result?.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
      (await cookies()).set("refreshToken", result?.data?.refreshToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const changePassword = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${config().Backend_URL}/auth/change-password`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const forgetPassword = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${config().Backend_URL}/auth/forget-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const resetPassword = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${config().Backend_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("resetToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};

export const reCaptchaTokenVerification = async (token: string) => {
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: config().Recaptcha_Server_Key!,
        response: token,
      }),
    });

    return res.json();
  } catch (err: any) {
    return Error(err);
  }
};

export const logout = async () => {
  const cookieStore = await cookies();

  // Remove your backend JWT tokens
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  // Remove NextAuth session cookies
  cookieStore.delete("next-auth.session-token");
  cookieStore.delete("__Secure-next-auth.session-token");
  cookieStore.delete("next-auth.csrf-token");
  cookieStore.delete("next-auth.callback-url");

  return { success: true };
};

export const refreshToken = async () => {
  try {
    const res = await fetch(`${config().Backend_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("refreshToken")!.value,
      },
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
