/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "react-hook-form";
import { MdDriveFileRenameOutline } from "react-icons/md";
import emailjs from "emailjs-com";
import { config } from "@/config";
import { toast } from "sonner";
import { SectionHead } from "@/components/SectionHead";
import styles from "../styles.module.css";
import { Typewriter } from "react-simple-typewriter";

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
    console.log(templateParams);

    emailjs
      .send(
        config().EmailJS_Service_ID as string, // Replace with your EmailJS service ID
        config().EmailJS_Template_ID as string, // Replace with your EmailJS template ID
        templateParams,
        config().EmailJS_User_ID as string // Replace with your EmailJS user ID | Public key
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
      className={`${styles.contact_bg} bg-center h-screen bg-cover bg-fixed text-white flex flex-col items-center justify-center`}
    >
      <div className="w-full">
        <SectionHead
          title={"Get In Touch"}
          para={"Please Let Me Know If You Have Any Queries"}
        />
      </div>

      <div className="backdrop-blur-lg w-8/12 mx-auto p-5 shadow-sm shadow-accent rounded-xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto md:mt-10 flex flex-col gap-5 w-full lg:w-8/12"
        >
          <label
            data-aos="flip-up"
            data-aos-duration="1000"
            className="input input-bordered flex items-center gap-2 text-white bg-transparent border border-third shadow-md hover:shadow-accent pl-2 rounded-lg"
          >
            <MdDriveFileRenameOutline />
            <input
              className="text-white  bg-transparent w-full p-3"
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
            className="input input-bordered  flex items-center gap-2 text-white bg-transparent  border border-third shadow-md hover:shadow-accent pl-2  rounded-lg"
          >
            <MdDriveFileRenameOutline />
            <input
              className="text-white bg-transparent  w-full p-3"
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
            className="input input-bordered flex items-center gap-2 text-white bg-transparent border border-third shadow-md hover:shadow-accent pl-2 rounded-lg"
          >
            <MdDriveFileRenameOutline />
            <input
              className="text-white bg-transparent  w-full p-3 border-none "
              type="number"
              placeholder="Your Mobile Number"
              {...register("number", { required: true })}
            />
          </label>
          {errors.number && (
            <span className="text-red-600 text-xs">This field is required</span>
          )}
          <div className="text-white">
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
            className="h-52 bg-transparent border border-third text-white font-bold p-5 text-base rounded-lg shadow-md shover:shadow-accent"
            {...register("message", { required: true })}
          />
          {errors.message && (
            <span className="text-red-600 text-xs">This field is required</span>
          )}
          <button
            className="rounded bg-accent px-12 py-2 text-base font-medium text-white shadow hover:bg-transparent border hover:scale-105 duration-700 flex gap-3 justify-center items-center w-3/12 mx-auto"
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
