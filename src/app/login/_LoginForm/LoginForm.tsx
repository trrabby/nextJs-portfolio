/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Suspense, useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { loginUser } from "@/services/AuthService";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";
import { setUser } from "@/redux/features/auth/authSlice";
import { getMyProfile } from "@/services/Users";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

function SearchParamsHandler({
  onRedirect,
}: {
  onRedirect: (path: string | null) => void;
}) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  if (redirect) toast.info("Please Login");

  useEffect(() => {
    onRedirect(redirect);
  }, [redirect, onRedirect]);

  return null;
}

const LoginForm = () => {
  const [toggle, setToggle] = useState(false);
  const [redirect, setRedirect] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  type LoginFormData = {
    email: string;
    pass: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  // ✅ Existing Email+Password Login
  const onSubmit = async (formInfo: LoginFormData) => {
    const loginToastId = toast.loading("Signing in...");
    try {
      const res = await loginUser({
        email: formInfo.email,
        password: formInfo.pass,
      });
      if (res.success) {
        toast.success(res.message || "Signed in successfully", {
          id: loginToastId,
        });
        const user = await getMyProfile();
        dispatch(setUser({ user: user.data, token: res.data.accessToken }));
        router.push(redirect || "/");
      } else {
        toast.error(res?.message, { id: loginToastId });
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message, { id: loginToastId });
    }
  };

  // ✅ OAuth Login (Google/Github)
  const handleOAuthLogin = async (provider: "google" | "github") => {
    await signIn(provider, {
      callbackUrl: redirect || "/",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-5 flex flex-col gap-6 w-full lg:w-8/12"
    >
      <Suspense fallback={null}>
        <SearchParamsHandler onRedirect={setRedirect} />
      </Suspense>

      {/* Email */}
      <div className="flex flex-col w-full text-left">
        <label className="text-sm font-semibold text-gray-200 mb-1">
          Email
        </label>
        <input
          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent transition"
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-red-500 text-xs mt-1">
            This field is required
          </span>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col w-full text-left relative">
        <label className="text-sm font-semibold text-gray-200 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent transition"
            type={toggle ? "text" : "password"}
            placeholder="Enter your password"
            {...register("pass", { required: true })}
          />
          <span
            onClick={() => setToggle(!toggle)}
            className="absolute right-3 top-3 text-gray-300 cursor-pointer hover:text-accent transition"
          >
            {toggle ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
          </span>
        </div>
        {errors.pass && (
          <span className="text-red-500 text-xs mt-1">
            This field is required
          </span>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-accent text-white font-semibold text-lg tracking-wide shadow-lg hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98] transition"
      >
        Get In
      </button>

      {/* Divider */}
      <div className="flex items-center justify-center gap-4 my-2 text-gray-400">
        <span className="h-px w-1/3 bg-gray-600"></span>
        <span className="text-sm text-nowrap text-gray-300">OR</span>
        <span className="h-px w-1/3 bg-gray-600"></span>
      </div>

      {/* OAuth Providers */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => handleOAuthLogin("google")}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition hover:text-accent"
        >
          <FaGoogle /> Google
        </button>
        <button
          type="button"
          onClick={() => handleOAuthLogin("github")}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
        >
          <FaGithub /> GitHub
        </button>
      </div>

      {/* Links */}
      <div className="flex justify-between text-sm text-gray-300 mt-4">
        <Link href="/forgot-password" className="hover:text-accent transition">
          Forgot Password?
        </Link>
        <Link href="/register" className="hover:text-accent transition">
          Create Account
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
