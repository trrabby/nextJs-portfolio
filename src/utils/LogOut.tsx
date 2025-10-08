import { logout as serverLogout } from "@/services/AuthService";
import { logout as reduxLogout } from "@/redux/features/auth/authSlice";
import { AppDispatch } from "@/redux/store";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export const logoutUser = async (dispatch: AppDispatch) => {
  try {
    // 1. Call server logout to remove cookies
    await serverLogout();

    // 2. Sign out from NextAuth (without redirect)
    await signOut({ redirect: false });

    // 3. Clear Redux state
    dispatch(reduxLogout());

    // 4. Notify success
    toast.success("Logged out successfully");
  } catch (err) {
    console.error("Logout error:", err);
    toast.error("Something went wrong while logging out");
  }
};
