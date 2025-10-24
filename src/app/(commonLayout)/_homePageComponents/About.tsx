/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

// Framer Motion for animations
import { motion } from "framer-motion";

// Next.js Image component and Icons
import Image, { type StaticImageData } from "next/image";
import { TbCertificate } from "react-icons/tb";
import {
  FiChevronDown,
  FiCode,
  FiServer,
  FiDatabase,
  FiShield,
  FiTool,
  FiBox,
} from "react-icons/fi";

// Local asset imports
import nextImg from "../../../../public/portfolioAssets/skill-icon/next.png";
import reactRouter from "../../../../public/portfolioAssets/skill-icon/react-router.svg";
import expressImg from "../../../../public/portfolioAssets/skill-icon/express.png";
import githubImg from "../../../../public/portfolioAssets/skill-icon/github-logo.png";
import redux from "../../../../public/portfolioAssets/skill-icon/redux-svgrepo-com.svg";
import ts from "../../../../public/portfolioAssets/skill-icon/typescript-official-svgrepo-com.svg";
import mongoose from "../../../../public/portfolioAssets/skill-icon/mongoose.png";
import nextAuth from "../../../../public/portfolioAssets/skill-icon/nextAuth.png";
import daisi from "../../../../public/portfolioAssets/skill-icon/daisi.png";
import shadcn from "../../../../public/portfolioAssets/skill-icon/shadcn.png";
import antd from "../../../../public/portfolioAssets/skill-icon/antdesign.png";

// --- Types ---
interface Skill {
  name: string;
  src: string | StaticImageData;
  proficiency?: "Advanced" | "Intermediate" | "Beginner";
}

interface SkillsData {
  [key: string]: Skill[] | { [subCategory: string]: Skill[] };
}

// Category Icons Mapping
const CATEGORY_ICONS = {
  "Programming Languages": FiCode,
  "Frontend Frameworks": FiBox,
  "UI Libraries": FiTool,
  "Backend & Runtime": FiServer,
  "Database & ORM": FiDatabase,
  "Authentication & Security": FiShield,
  "Development Tools": FiTool,
};

// --- Skills Data Structure ---
const SKILLS_DATA: SkillsData = {
  All: {
    "Programming Languages": [
      {
        name: "JavaScript",
        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
      },
      {
        name: "TypeScript",
        src: ts,
      },
    ],
    "Frontend Frameworks": [
      {
        name: "React",
        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg",
      },
      {
        name: "Next.js",
        src: nextImg,
      },
      {
        name: "Redux/RTK Query",
        src: redux,
      },
      {
        name: "React Router DOM",
        src: reactRouter,
      },
    ],
    "UI Libraries & Styling": [
      {
        name: "HTML",
        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg",
      },
      {
        name: "CSS",
        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg",
      },
      {
        name: "Tailwind CSS",
        src: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
      },
      {
        name: "Material UI",
        src: "https://mui.com/static/logo.png",
      },
      {
        name: "Ant Design",
        src: antd,
      },
      {
        name: "DaisyUI",
        src: daisi,
      },
      {
        name: "shadcn/ui",
        src: shadcn,
      },
    ],
    "Backend & Runtime": [
      {
        name: "Node.js",
        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg",
      },
      {
        name: "Express.js",
        src: expressImg,
      },
    ],
    "Database & ORM": [
      {
        name: "MongoDB",
        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg",
      },
      {
        name: "Mongoose",
        src: mongoose,
      },
      {
        name: "PostgreSQL",
        src: "https://www.postgresql.org/media/img/about/press/elephant.png",
      },
      {
        name: "Prisma",
        src: "https://avatars.githubusercontent.com/u/17219288?s=200&v=4",
      },
    ],
    "Authentication & Security": [
      {
        name: "Firebase",
        src: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
      },
      {
        name: "NextAuth.js",
        src: nextAuth,
      },
      {
        name: "JWT",
        src: "https://jwt.io/img/pic_logo.svg",
      },
      {
        name: "OAuth",
        src: "https://oauth.net/images/oauth-logo-square.png",
      },
    ],
    "Development Tools": [
      {
        name: "Git",
        src: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",
      },
      {
        name: "GitHub",
        src: githubImg,
      },
      {
        name: "Figma",
        src: "https://www.vectorlogo.zone/logos/figma/figma-icon.svg",
      },
    ],
  },
  "Programming Languages": [
    {
      name: "JavaScript",
      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    },
    {
      name: "TypeScript",
      src: ts,
    },
  ],
  "Frontend Frameworks": [
    {
      name: "React",
      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg",
    },
    {
      name: "Next.js",
      src: nextImg,
    },
    {
      name: "Redux/RTK Query",
      src: redux,
    },
    {
      name: "React Router DOM",
      src: reactRouter,
    },
  ],
  "UI Libraries & Styling": [
    {
      name: "HTML",
      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg",
    },
    {
      name: "CSS",
      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg",
    },
    {
      name: "Tailwind CSS",
      src: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
    },
    {
      name: "Material UI",
      src: "https://mui.com/static/logo.png",
    },
    {
      name: "Ant Design",
      src: antd,
    },
    {
      name: "DaisyUI",
      src: daisi,
    },
    {
      name: "shadcn/ui",
      src: shadcn,
    },
  ],
  "Backend & Runtime": [
    {
      name: "Node.js",
      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg",
    },
    {
      name: "Express.js",
      src: expressImg,
    },
  ],
  "Database & ORM": [
    {
      name: "MongoDB",
      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg",
    },
    {
      name: "Mongoose",
      src: mongoose,
    },
    {
      name: "PostgreSQL",
      src: "https://www.postgresql.org/media/img/about/press/elephant.png",
    },
    {
      name: "Prisma",
      src: "https://avatars.githubusercontent.com/u/17219288?s=200&v=4",
    },
  ],
  "Authentication & Security": [
    {
      name: "Firebase",
      src: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
    },
    {
      name: "NextAuth.js",
      src: nextAuth,
    },
    {
      name: "JWT",
      src: "https://jwt.io/img/pic_logo.svg",
    },
    {
      name: "OAuth",
      src: "https://oauth.net/images/oauth-logo-square.png",
    },
  ],
  "Development Tools": [
    {
      name: "Git",
      src: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",
    },
    {
      name: "GitHub",
      src: githubImg,
    },
    {
      name: "Figma",
      src: "https://www.vectorlogo.zone/logos/figma/figma-icon.svg",
    },
  ],
};

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

interface SkillCardProps {
  name: string;
  src: string | StaticImageData;
  proficiency?: "Advanced" | "Intermediate" | "Beginner";
}

const SkillCard: React.FC<SkillCardProps> = ({ name, src, proficiency }) => {
  const getProficiencyColor = (level?: string) => {
    switch (level) {
      case "Advanced":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Beginner":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <motion.li
      variants={itemVariants}
      className="group flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 transform hover:scale-[1.03] cursor-pointer border border-gray-200 dark:border-gray-700"
    >
      <div className="relative">
        <Image
          className="w-12 h-12 object-contain mb-3 group-hover:scale-110 transition-transform duration-300"
          src={src}
          alt={`${name} icon`}
          height={48}
          width={48}
        />
      </div>
      <h4 className="font-semibold text-center text-sm md:text-base mb-2 text-gray-800 dark:text-gray-200">
        {name}
      </h4>
      {proficiency && (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getProficiencyColor(
            proficiency
          )}`}
        >
          {proficiency}
        </span>
      )}
    </motion.li>
  );
};

// --- Component to render the Skills Tab content ---
const SkillsTabPanel: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = Object.keys(SKILLS_DATA).filter((cat) => cat !== "All");

  return (
    <div className="pt-10 max-w-6xl mx-auto">
      {/* Category Select Dropdown - Redesigned */}
      <div className="relative w-full sm:w-96 mx-auto mb-12">
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full appearance-none bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 py-4 px-6 pr-12 rounded-2xl leading-tight focus:outline-none focus:ring-4 focus:ring-accent/20 focus:border-accent text-gray-800 dark:text-white font-semibold cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <option value="All">All Skills</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-600 dark:text-gray-300">
            <FiChevronDown className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Render Skills based on selectedCategory */}
      {selectedCategory === "All" ? (
        // Render All skills grouped by sub-category
        <div className="space-y-12">
          {Object.entries(
            SKILLS_DATA.All as { [subCategory: string]: Skill[] }
          ).map(([subCategory, skills]) => {
            const IconComponent =
              CATEGORY_ICONS[subCategory as keyof typeof CATEGORY_ICONS] ||
              FiBox;
            return (
              <motion.div
                key={subCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-accent/10 rounded-xl">
                    <IconComponent className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {subCategory}
                  </h3>
                </div>
                <motion.ul
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {skills.map((skill) => (
                    <SkillCard key={skill.name} {...skill} />
                  ))}
                </motion.ul>
              </motion.div>
            );
          })}
        </div>
      ) : (
        // Render a single category with enhanced design
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-accent/10 rounded-xl">
              {React.createElement(
                CATEGORY_ICONS[
                  selectedCategory as keyof typeof CATEGORY_ICONS
                ] || FiBox,
                {
                  className: "w-6 h-6 text-accent",
                }
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {selectedCategory}
            </h3>
          </div>
          <motion.ul
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {(SKILLS_DATA[selectedCategory] as Skill[]).map((skill) => (
              <SkillCard key={skill.name} {...skill} />
            ))}
          </motion.ul>
        </motion.div>
      )}

      {/* Skills Proficiency Legend */}
    </div>
  );
};

// --- Main About Component ---
export const About: React.FC = () => {
  // Framer Motion for main sections
  const sectionAnimation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };

  return (
    <div className="py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Glimpse/Intro Section */}
        <motion.div
          {...sectionAnimation}
          className="mx-auto max-w-lg text-center"
        >
          <h2 className="text-4xl font-extrabold sm:text-5xl text-gray-900 dark:text-white">
            Glimpse
          </h2>

          <p className="mt-4 text-gray-800 dark:text-fourth text-justify">
            I was born in a prestigious muslim family back in 1997 in one of the
            most prominent district named Noakhali. I've completed my diploma in
            Secretarial Science from Bangladesh Technical Education Board.
            Currently I'm pursuing BBA in Human Resource Management (HRM).
          </p>
          <p className="mt-4 text-gray-800 dark:text-fourth text-justify">
            I have started my programming journey rigoriously back in 2023.
            Since then I've been constantly learning and improving my skills in
            web development. I have a passion for creating efficient and
            scalable web applications that provide seamless user experiences.
          </p>
        </motion.div>

        {/* Tabs Section */}
        <Tabs>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center mt-10 md:w-4/12 w-10/12 mx-auto bottom-0"
          >
            <TabList className="flex justify-around items-center bg-third dark:bg-gray-950 rounded-2xl p-2 shadow-xl border border-gray-500 dark:border-gray-700">
              <Tab className="flex-1 py-2 text-sm md:text-base font-semibold text-gray-600 dark:text-accent/70 hover:text-accent dark:hover:text-accent focus:outline-none transition-colors duration-300 cursor-pointer">
                Education
              </Tab>
              <Tab className="flex-1 py-2 text-sm md:text-base font-semibold text-gray-600 dark:text-accent/70 hover:text-accent dark:hover:text-accent focus:outline-none transition-colors duration-300 cursor-pointer">
                Skills
              </Tab>
              <Tab className="flex-1 py-2 text-sm md:text-base font-semibold text-gray-600 dark:text-accent/70 hover:text-accent dark:hover:text-accent focus:outline-none transition-colors duration-300 cursor-pointer">
                Courses
              </Tab>
            </TabList>
          </motion.div>

          {/* Tab Panel 1: Education */}
          <TabPanel>
            <motion.div
              {...sectionAnimation}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 pt-10"
            >
              <ul className="md:timeline md:timeline-vertical md:timeline-middle text-gray-800 dark:text-fourth ">
                <motion.li
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="timeline-end mb-10 space-y-2 border-r-4 pr-2 border-accent flex flex-col justify-center items-end">
                    <div className="md:w-6/12">
                      <time className="font-mono italic">2021-2025</time>
                      <div className="md:text-lg text-base font-black">
                        Bangladesh Open University
                      </div>
                      <div className="md:text-lg text-base font-black">
                        BBA in Human Resource Management (HRM)
                      </div>
                      <br />
                      From my trimendous interest in business studies I have
                      chosen Human Resource Management as my major field of
                      study.
                    </div>
                  </div>
                </motion.li>

                <motion.li
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="timeline-start md:text-end mb-10 space-y-2 text-justify border-l-4 pl-2 border-accent flex flex-col justify-end items-end md:w-6/12">
                    <time className="font-mono italic">2019-2021</time>
                    <div className="md:text-lg text-base font-black">
                      Bangladesh Technical Education Board (BTEB)
                    </div>
                    <div className="md:text-lg text-base font-black md:text-right">
                      Diploma in Secretarioal Science
                    </div>
                    <br />
                    <p>
                      I hold a Diploma in Secretarial Science, which has
                      equipped me with essential administrative skills,
                      communication proficiency, and organizational abilities
                      for effective office management roles.
                    </p>
                  </div>
                </motion.li>

                <motion.li
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="timeline-end mb-10 space-y-2 border-r-4 pr-2 border-accent flex flex-col justify-center items-end">
                    <div className="md:w-6/12">
                      <time className="font-mono italic">2016-2018</time>
                      <div className="md:text-lg text-base font-black">
                        Jatiya Kabi Kazi Nazrul Islam University
                      </div>
                      <div className="md:text-lg text-base font-black">
                        BBA in Accounting and Information Systems (AIS)
                      </div>
                      <br />
                      After HSC i got admitted in this university. But Due to
                      some unavoidable circumstances i had to leave study there.
                    </div>
                  </div>
                </motion.li>
              </ul>
            </motion.div>
          </TabPanel>

          {/* Tab Panel 2: Skills (Updated with new design) */}
          <TabPanel>
            <motion.div
              {...sectionAnimation}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <SkillsTabPanel />
            </motion.div>
          </TabPanel>

          {/* Tab Panel 3: Pursued Courses */}
          <TabPanel>
            <motion.div
              {...sectionAnimation}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center items-center space-y-6 pt-10"
            >
              <ul className="md:timeline timeline-vertical timeline-middle text-gray-800 dark:text-fourth">
                <motion.li
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="timeline-end mb-10 space-y-2 border-r-4 pr-2 border-accent flex flex-col justify-end items-end">
                    <div className="md:w-6/12">
                      <time className="font-mono italic">
                        Oct 2024 - May 2025
                      </time>
                      <button className="duration-500 px-2 rounded-sm hover:scale-105">
                        <a
                          target="_blank"
                          href="https://drive.google.com/file/d/1K5ymXU-87k3nnP1oALfyId19-Vqy37tU/view?usp=drive_link"
                        >
                          <TbCertificate className="text-accent w-8 h-8" />
                        </a>
                      </button>
                      <div className="md:text-lg text-base font-black">
                        Programming Hero
                      </div>
                      <div className="md:text-lg text-base font-black md:text-left ">
                        Next Level Developement Course (L2)
                      </div>
                      <br />
                      I am pursuing here the next level technologies of Web
                      Development. Technologies include: TypeScript, Mongoose,
                      Redux, Next.Js, DBMS, PostgreSQL, Prisma, Docker, AWS.
                      <br />
                    </div>
                  </div>
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="timeline-start md:text-end mb-10 space-y-2 text-justify border-l-4 pl-2 border-accent flex flex-col justify-start items-start">
                    <div className="md:w-6/12">
                      <button className="duration-500 px-2 rounded-sm hover:scale-105">
                        <a
                          target="_blank"
                          href="https://drive.google.com/file/d/1W2MhKtHeHBxWfY8neoGG6ZAirtYuV4Cg/view?usp=sharing"
                        >
                          <TbCertificate className="text-accent w-8 h-8" />
                        </a>
                      </button>
                      <time className="font-mono italic">
                        Dec 2023 - Aug 2024
                      </time>
                      <div className="md:text-lg text-base font-black">
                        Programming Hero
                      </div>
                      <div className="md:text-lg text-base font-black md:text-right ">
                        Complete Web Developement Course
                      </div>
                      <br />
                      I've successfully completed this course. My unit of
                      competence include MongoDB, NodeJs, ExpressJs, Javascript,
                      React, DOM, Tailwind, CSS & HTML.
                      <br />
                    </div>
                  </div>
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="timeline-end mb-10 space-y-2 border-r-4 pr-2 border-accent flex flex-col justify-end items-end">
                    <div className="md:w-6/12">
                      <time className="font-mono italic">
                        15 Oct 2017 - 15 Jan 2018
                      </time>
                      <button className="duration-500 px-2 rounded-sm hover:scale-105">
                        <a
                          target="_blank"
                          href="https://drive.google.com/file/d/1Poy9VRJvLnV2vHSGemhcRXwEVLJ5BqKS/view?usp=sharing"
                        >
                          <TbCertificate className="text-accent w-8 h-8" />
                        </a>
                      </button>
                      <div className="md:text-lg text-base font-black">
                        National Institute of Engineering & Technology (NIET){" "}
                      </div>
                      <div className="md:text-lg text-base font-black md:text-left">
                        Professional Freelancing Course
                      </div>
                      <br />
                      This training has been conducted by NIET under a
                      partnership arrangement between Bangladesh Bank & SEIP,
                      Min of Finance. My unit of competence include:
                      <ol className="list-decimal list-inside ml-2">
                        <li>Communicate in the workplace</li>
                        <li>Work in a team environment</li>
                        <li>Parctical occupational health and safety (OHS)</li>
                        <li>Demonastrate work values</li>
                        <li>Perform Search Engine Optimization Technique</li>
                        <li>Use HTML, CSS code and Use Web Hosting</li>
                        <li>Use Javascript Programming</li>
                        <li>Use Mobile Apps Development Technique</li>
                        <li>
                          Perform Online Outsoucing Marketplaces & Earning
                        </li>
                      </ol>
                    </div>
                  </div>
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className="timeline-start md:text-end mb-10 space-y-2 text-justify border-l-4 pl-2 border-accent flex flex-col justify-start items-start">
                    <div className="md:w-6/12">
                      <button className="duration-500 px-2 rounded-sm hover:scale-105">
                        <a
                          target="_blank"
                          href="https://drive.google.com/file/d/1FbeCj0nA90iyw91UZ5j0bPy64MiePhzq/view?usp=drive_link"
                        >
                          <TbCertificate className="text-accent w-8 h-8" />
                        </a>
                      </button>
                      <time className="font-mono italic">
                        30 Jul 2017 - 12 Nov 2017
                      </time>
                      <div className="md:text-lg text-base font-black">
                        Basis Institute Of Technology & Management (BITM)
                      </div>
                      <div className="md:text-lg text-base font-black md:text-right ">
                        IT Support Technical Course
                      </div>
                      <br />
                      I've successfully completed this course from one of the
                      most renound IT training inistitute named BITM. This
                      course was also conducted by SEIP. My learning here
                      include:
                      <ol className="list-decimal list-inside ml-2">
                        <li>Computer Operating Systems</li>
                        <li>Microsoft Applications</li>
                        <li>Basic Input Output Systems (BIOS)</li>
                        <li>Basic hardware introduction</li>
                        <li>Basic networking procedure</li>
                      </ol>
                    </div>
                  </div>
                </motion.li>
              </ul>
            </motion.div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};
