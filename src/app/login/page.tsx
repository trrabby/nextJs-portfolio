"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { SectionHead } from "@/components/SectionHead";
import styles from "./styles.module.css";

const AdiminLogin = () => {
  const [toggle, setToggle] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = async (formInfo: any) => {
    const email = formInfo.email;
    const password = formInfo.pass;
  };

  return (
    <div
      className={`${styles.loginImgBg} bg-center bg-cover flex flex-col min-h-screen items-center justify-center AdminLogin`}
    >
      <SectionHead
        title={"Your IP is in danger!"}
        special={"You are getting tracked. Leave this page soon."}
      ></SectionHead>
      <div className="flex flex-col lg:flex-row items-center justify-center text-center w-full">
        <div className="lg:w-6/12 rounded-lg mb-5 lg:mt-5 flex flex-col items-center justify-center text-center  ">
          <div className="w-full rounded-lg mb-5 mt-5 flex flex-col items-center justify-center text-center">
            <div className="w-full mx-auto flex flex-col items-center justify-center  text-white backdrop-blur-lg p-5 min-h-[calc(100vh-270px)] rounded-xl space-y-2 font-extrabold md:my-5 shadow-lg shadow-accent ">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-auto mt-10 flex flex-col gap-5 w-full lg:w-8/12"
              >
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
                  <span className="text-red-600 text-xs">
                    This field is required
                  </span>
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
                  <span className="text-red-600 text-xs">
                    This field is required
                  </span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdiminLogin;
