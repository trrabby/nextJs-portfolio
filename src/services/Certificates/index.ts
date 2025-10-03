/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// create certificate
export const createCertificate = async (Data: FormData): Promise<any> => {
  try {
    const res = await fetch(
      `${config().Backend_URL}/certificates/add-certificate`,
      {
        method: "POST",
        body: Data,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("CERTIFICATES");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// get certificates
export const getCertificates = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  try {
    const res = await fetch(
      `${
        config().Backend_URL
      }/certificates?limit=${limit}&page=${page}&searchTerm=${query}`,
      {
        next: {
          tags: ["CERTIFICATES"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get a certificate
export const getACertificate = async (id: string) => {
  try {
    const res = await fetch(`${config().Backend_URL}/certificates/${id}`, {
      next: {
        tags: ["CERTIFICATES"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// update certificate
export const updateCertificate = async (
  id: string,
  payload: FormData
): Promise<any> => {
  try {
    const res = await fetch(`${config().Backend_URL}/certificates/${id}`, {
      method: "PATCH",
      body: payload,
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("CERTIFICATES");
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
      `${config().Backend_URL}/certificates/update-logo/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: payload,
      }
    );
    revalidateTag("CERTIFICATES");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// delete certificate
export const deleteCertificate = async (id: string): Promise<any> => {
  try {
    const res = await fetch(
      `${config().Backend_URL}/certificates/delete-certificate/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("CERTIFICATES");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
