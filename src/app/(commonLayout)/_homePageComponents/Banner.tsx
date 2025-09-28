import Image from "next/image";
import profile from "../../../../public/portfolioAssets/profile.png";
import { Typewriter } from "react-simple-typewriter";
import { FaDownload } from "react-icons/fa";
import Link from "next/link";
import styles from "../styles.module.css";

export const Banner = () => {
  return (
    <div
      className={`relative ${styles.banner} bg-fixed bg-center bg-cover h-screen flex items-center justify-center overflow-hidden`}
    >
      {/* Main Content */}
      <div className="relative content-container flex items-center md:pt-0 pt-3">
        <div className="backdrop-blur-sm text-left flex md:flex-row flex-col justify-center md:justify-start items-center md:gap-16 md:py-32 p-5">
          {/* Profile Image (Desktop) */}
          <div className="md:flex hidden w-4/12 items-end justify-end">
            <Image
              className="rounded-2xl mt-24"
              src={profile}
              alt="Profile"
              height={500}
              width={500}
            />
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="space-y-8  md:pl-20 p-2 rounded-lg flex flex-col md:items-start justify-center">
              {/* Heading */}
              <div className="text-4xl font-extrabold sm:text-5xl space-y-6">
                {/* Profile Image (Mobile) */}
                <div className="md:hidden block items-end justify-start">
                  <Image
                    className="w-44 rounded-2xl border-accent shadow-xl"
                    src={profile}
                    alt="Profile"
                    height={500}
                    width={500}
                  />
                </div>
                <p className="text-[#5bfcdc] dark:text-gray-700  drop-shadow-2xl  animate-pulse">
                  Hi,{" "}
                </p>
                <p className="text-white">I am</p>
                <strong className="font-extrabold text-white sm:block mt-3 text-nowrap">
                  Towfiqur Rahman
                </strong>
              </div>

              {/* Typewriter Effect */}
              <p className="mt-4 md:text-2xl text-xl text-white font-extrabold">
                A &nbsp;
                <Typewriter
                  words={[
                    "Web Developer",
                    "MERN Stack Developer",
                    "Front End Web Developer",
                    "React Developer",
                    "UI Developer",
                    "Web Developer",
                  ]}
                  loop={5}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </p>
            </div>
            {/* Buttons Section */}
            <div className="md:w-auto w-8/12 mt-8 flex md:justify-start justify-center items-center gap-4">
              {/* Download Resume */}
              <Link
                className="rounded bg-accent dark:bg-slate-700 px-6 md:px-12 py-3 text-base font-medium text-white shadow hover:bg-transparent border hover:scale-105 duration-700 flex gap-3 justify-center items-center"
                href="https://drive.google.com/file/d/1OUsLkQwZTCdwPm5hca7qvK-ozsuN4ygl/view"
                target="_blank"
              >
                <FaDownload className="animate-bounce" /> Resume
              </Link>

              {/* Read Blogs */}
              <Link
                className="rounded px-6 md:px-12 py-3 text-base font-medium text-white shadow hover:bg-accent dark:hover:bg-slate-700  hover:scale-105 duration-700  border text-center cursor-pointer text-nowrap"
                href={"/blogs"}
              >
                Read Blogs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
