/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { FaDownload } from "react-icons/fa";
import Link from "next/link";
import profile from "../../../../public/portfolioAssets/profile.png";

export const Banner = () => {
  return (
    <section
      className={`relative flex items-center justify-center h-screen overflow-hidden bg-accent/10 dark:bg-gray-950 pt-20 pb-5 rounded-b-xl`}
    >
      <div
        className={`absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent dark:bg-primary/20 rounded-full blur-[150px] -z-10 opacity-70 animate-pulse-slow`}
      ></div>
      <div
        className={`absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#B19CD9]/15 dark:bg-primary/20 rounded-full blur-[150px] -z-10 opacity-70`}
      ></div>

      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 px-6 md:px-20 text-center md:text-left z-10"
      >
        {/* Profile with Refined Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative flex justify-center items-center w-[300px] h-[300px] md:w-[350px] md:h-[350px] flex-shrink-0 rounded-full"
        >
          {/* Animated Outer Ring */}
          <motion.div
            className={`absolute w-[calc(100%+20px)] h-[calc(100%+20px)] rounded-full border-4 border-[#00C9A7]/30 dark:border-primary/40 blur-[4px]`}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          ></motion.div>

          {/* Floating Profile Image Container */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={`relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden 
              shadow-[0_0_60px_rgba(0,201,167,0.6)] dark:shadow-[0_0_60px_rgba(0,201,167,0.6)] 
              border-4 border-[#00C9A7] p-5 dark:border-third z-10 dark:bg-gray-950`}
          >
            <Image
              src={profile}
              alt="Profile"
              width={280}
              height={280}
              style={{ objectFit: "cover", objectPosition: "top" }}
              priority
              placeholder="blur"
              className="rounded-full object-top "
            />
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-6">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            // Dark Mode: Teal-Aqua, Light Mode: Purple
            className={`text-[#00C9A7] dark:text-fourth text-xl md:text-2xl font-semibold tracking-wider`}
          >
            Hi there, I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            // Dark Mode: White, Light Mode: Dark Gray
            className={`text-gray-600 dark:text-[#8499bb] text-3xl md:text-7xl font-extrabold leading-tight`}
          >
            Towfiqur{" "}
            <span className={`text-[#00C9A7] dark:text-[#00C9A7]`}>Rahman</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            // Dark Mode: White/Gray, Light Mode: Dark Gray
            className={`text-gray-600 dark:text-[#8499bb] text-xl md:text-3xl font-medium pt-1`}
          >
            A{" "}
            <span className={`text-[#00C9A7] dark:text-[#00C9A7] font-bold`}>
              <Typewriter
                words={[
                  "MERN Stack Developer",
                  "Full-Stack Engineer",
                  "Backend Developer",
                  "Database Architect",
                  "Front-End Engineer",
                ]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={80}
                deleteSpeed={40}
                delaySpeed={1500}
              />
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            // Dark Mode: Gray, Light Mode: Slightly Darker Gray
            className={`text-gray-600 dark:text-[#8499bb] max-w-lg mt-4 text-md py-2`}
          >
            I specialize in crafting fast, reliable full-stack applications,
            merging robust backend logic with captivating, modern interfaces.
          </motion.p>

          {/* Buttons - Primary style is now the Dark Mode style */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-wrap justify-center md:justify-start gap-4 mt-8"
          >
            <Link
              href="https://drive.google.com/file/d/1s84dtJ8wvfYFQqmbsgJuCH6zreMCXPO9/view?usp=drive_link"
              target="_blank"
              // Primary Button (Dark Mode style)
              className={`flex items-center gap-2 bg-[#00C9A7] text-[#0B0F1B] dark:bg-[#8499bb] dark:text-white px-7 py-3 rounded-full font-bold shadow-lg shadow-[#00C9A7]/30 dark:shadow-[#8499bb]/30 hover:scale-[1.03] transition-transform duration-300  `}
            >
              <FaDownload className="animate-bounce" /> Download Resume
            </Link>

            <Link
              href="/blogs"
              // Secondary Button (Dark Mode style)
              className={`border border-[#00C9A7] text-[#8499bb] dark:border-[#8499bb] dark:text-[#4B5563] 
                         px-7 py-3 rounded-full font-medium hover:bg-[#00C9A7] hover:text-[#0B0F1B]
                         dark:hover:bg-[#8499bb] dark:hover:text-white transition-all duration-300`}
            >
              Read Blogs
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
