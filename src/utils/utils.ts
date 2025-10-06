/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx"; // keep this — MUI already provides it via dependency
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes intelligently with conditional support.
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
