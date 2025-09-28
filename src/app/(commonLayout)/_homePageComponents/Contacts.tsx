/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "react-hook-form";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { Typewriter } from "react-simple-typewriter";
import emailjs from "emailjs-com";
import { config } from "@/config";
import { toast } from "sonner";
import { SectionHead } from "@/components/SectionHead";

export const Contacts = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (formInfo: any) => {
    const templateParams = {
      name: formInfo.name,
      email: formInfo.email,
      number: formInfo.number,
      message: formInfo.message,
    };
    // console.log(templateParams);

    emailjs
      .send(
        config().EmailJS_Service_ID as string, // Replace with your EmailJS service ID
        config().EmailJS_Template_ID as string, // Replace with your EmailJS template ID
        templateParams,
        config().EmailJS_User_ID as string // Replace with your EmailJS user ID
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          toast.success("Email sent successfully!");
          reset();
        },
        (error) => {
          console.error("FAILED...", error);
          toast.error("Failed to send email. Please try again later.");
        }
      );
  };

  return (
    <div
      id="#contact"
      className={`bg-center bg-cover bg-fixed text-white pb-10 `}
    >
      <div>
        <SectionHead
          title={"Get In Touch"}
          titleColor="text-gray-800 dark:text-fourth"
          para={"Please Let Me Know If You Have Any Queries"}
          paraColor="text-gray-600 dark:text-fourth"
        />
      </div>

      <div className="backdrop-blur-lg md:w-8/12 w-10/12 mx-auto p-5 py-10 shadow-sm bg-white  dark:bg-gray-800 shadow-gray-800 rounded-xl">
        <form
          onSubmit={() => handleSubmit(onSubmit)}
          className="mx-auto md:mt-10 flex flex-col gap-5 w-full lg:w-8/12"
        >
          <label
            data-aos="flip-up"
            data-aos-duration="1000"
            className="input input-bordered flex items-center gap-2 text-gray-800 dark:text-fourth  bg-transparent border border-third shadow-md hover:shadow-accent pl-2 rounded-lg"
          >
            <MdDriveFileRenameOutline />
            <input
              className="text-gray-800 dark:text-fourth bg-transparent w-full p-3"
              type="text"
              placeholder="Your Name"
              {...register("name", { required: true })}
            />
          </label>
          {errors.name && (
            <span className="text-red-600 text-xs">This field is required</span>
          )}
          <label
            data-aos="flip-up"
            data-aos-duration="1000"
            className="input input-bordered  flex items-center gap-2 text-gray-800 dark:text-fourth   bg-transparent  border border-third shadow-md hover:shadow-accent pl-2  rounded-lg"
          >
            <MdDriveFileRenameOutline />
            <input
              className="text-gray-800 dark:text-fourth   bg-transparent  w-full p-3"
              type="email"
              placeholder="Your Email"
              {...register("email", { required: true })}
            />
          </label>
          {errors.email && (
            <span className="text-red-600 text-xs">This field is required</span>
          )}
          <label
            data-aos="flip-up"
            data-aos-duration="1000"
            className="input input-bordered flex items-center gap-2 text-gray-800 dark:text-fourth  bg-transparent border border-third shadow-md hover:shadow-accent pl-2 rounded-lg"
          >
            <MdDriveFileRenameOutline />
            <input
              className="text-gray-800 dark:text-fourth bg-transparent  w-full p-3 border-none "
              type="number"
              placeholder="Your Mobile Number"
              {...register("number", { required: true })}
            />
          </label>
          {errors.number && (
            <span className="text-red-600 text-xs">This field is required</span>
          )}
          <div className="text-gray-800 dark:text-fourth">
            <Typewriter
              words={["Write Your Message Here..."]}
              loop={5}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </div>
          <textarea
            data-aos="flip-up"
            data-aos-duration="1000"
            onSelect={blur}
            className="h-52 bg-transparent border border-third text-white font-bold p-5 text-xl rounded-lg shadow-md shover:shadow-accent"
            {...register("message", { required: true })}
          />
          {errors.message && (
            <span className="text-red-600 text-xs">This field is required</span>
          )}
          <button
            className="rounded bg-transparent px-12 py-2 text-base font-medium text-accent drak:text-white shadow hover:bg-accent dark:hover:bg-slate-700 hover:text-fourth border hover:scale-105 duration-700 flex gap-3 justify-center items-center w-3/12 mx-auto"
            type="submit"
          >
            Email
            {/* {loading ? <LoadingSpinner /> : "Email"} */}
          </button>
        </form>
      </div>
    </div>
  );
};
