"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { loginUser } from "@/services/AuthService";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";
import { setUser } from "@/redux/features/auth/authSlice";
import { getMyProfile } from "@/services/Users";
import { useRouter, useSearchParams } from "next/navigation";

function SearchParamsHandler({
  onRedirect,
}: {
  onRedirect: (path: string | null) => void;
}) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  if (redirect) {
    toast.info("Please Login");
  }

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

  const onSubmit = async (formInfo: LoginFormData) => {
    const loginToastId = toast.loading("Signing in...");
    const email = formInfo.email;
    const password = formInfo.pass;

    try {
      const res = await loginUser({ email, password });
      if (res.success) {
        toast.success(
          `${res.message ? res.message : "Signed in successfully"}`,
          {
            id: loginToastId,
          }
        );
        const user = await getMyProfile();
        const payload = {
          user: user.data,
          token: res.data.accessToken,
        };
        dispatch(setUser(payload));
        router.push(redirect || "/");
      } else {
        toast.error(res?.message, {
          id: loginToastId,
        });
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message, {
        id: loginToastId,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-10 flex flex-col gap-5 w-full lg:w-8/12"
    >
      <Suspense fallback={null}>
        <SearchParamsHandler onRedirect={setRedirect} />
      </Suspense>

      <label className="flex items-center gap-2 animate__animated animate__flipInX animate__slow	1s bg-transparent px-2 rounded-lg border">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input
          className="text-white w-full p-3 rounded-lg bg-transparent"
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
      </label>
      {errors.email && (
        <span className="text-red-600 text-xs">This field is required</span>
      )}

      <div>
        <label className=" flex items-center gap-2 animate__animated animate__flipInX animate__slow	1s bg-transparent px-2 rounded-lg border">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>

          <input
            className="text-white w-full p-3 rounded-lg bg-transparent"
            type={toggle ? "text" : "password"}
            placeholder="Password"
            {...register("pass", { required: true })}
          />
          <span
            onClick={() => setToggle(!toggle)}
            className="flex right-0 text-white font-extrabold "
          >
            {toggle ? (
              <FaRegEyeSlash className="text-fourth font-extrabold h-10" />
            ) : (
              <FaRegEye className="text-fourth font-extrabold h-10" />
            )}
          </span>
        </label>
      </div>
      {errors.pass && (
        <span className="text-red-600 text-xs">This field is required</span>
      )}
      {/* {err && (
                  <p className="text-red-500 flex w-full text-xs">{err}</p>
                )} */}

      <button
        className="rounded bg-accent px-12 py-3 text-base font-medium text-white shadow hover:bg-transparent border hover:scale-105 duration-700 flex gap-3 justify-center items-center w-6/12 mx-auto"
        type="submit"
      >
        Get In
        {/* {loading ? <LoadingSpinner></LoadingSpinner> : "Get In"} */}
      </button>
    </form>
  );
};
export default LoginForm;
