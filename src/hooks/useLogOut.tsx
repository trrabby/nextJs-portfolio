// useLogout.ts
"use client";

import { logout as serverLogout } from "@/services/AuthService";
import { logout as reduxLogout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = async (redirectTo: string = "/login") => {
    try {
      // 1. Server logout
      await serverLogout();

      // 2. Sign out NextAuth without redirect
      await signOut({ redirect: false });

      // 3. Clear Redux state
      dispatch(reduxLogout());

      // 4. Redirect to desired path
      router.push(redirectTo);

      // 5. Notify success
      toast.success("Logged out successfully");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Something went wrong while logging out");
    }
  };

  return logout;
};
