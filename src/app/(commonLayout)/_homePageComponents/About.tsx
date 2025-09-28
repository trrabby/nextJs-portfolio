/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import bootstrap from "../../../../public/portfolioAssets/skill-icon/bootstrap.png";
import nextImg from "../../../../public/portfolioAssets/skill-icon/next.png";
import reactRouter from "../../../../public/portfolioAssets/skill-icon/react-router.svg";
import expressImg from "../../../../public/portfolioAssets/skill-icon/express.png";
import githubImg from "../../../../public/portfolioAssets/skill-icon/github-logo.png";
import redux from "../../../../public/portfolioAssets/skill-icon/redux-svgrepo-com.svg";
import ts from "../../../../public/portfolioAssets/skill-icon/typescript-official-svgrepo-com.svg";
import mongoose from "../../../../public/portfolioAssets/skill-icon/mongoose.png";
import nextAuth from "../../../../public/portfolioAssets/skill-icon/nextAuth.png";

import Image from "next/image";
import { TbCertificate } from "react-icons/tb";

export const About = () => {
  return (
    <div>
      <div className="mx-auto max-w-screen-xl  px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="mx-auto max-w-lg text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">Glimpse</h2>

          <p className="mt-4 text-gray-800 dark:text-fourth text-justify">
            I was born in a prestigious muslim family back in 1997 in one of the
            most prominent district named Noakhali. I've completed my diploma in
            Secretarial Science from Bangladesh Technical Education Board.
          </p>
          <p className="mt-4 text-gray-800 dark:text-fourth text-justify">
            I have started my programming journey with Programming Hero
            rigoriously back in 2023. Now I am a juniour web developer,
            competent in MERN Stack Technology. I have completed saveral
            projects integreting MERN Stack. Currently, I am pursuing next level
            web development technologies.
          </p>
        </div>

        <Tabs>
          <div className="text-center mt-10 md:w-4/12 w-10/12 mx-auto bottom-0">
            <TabList className="flex justify-around items-center bg-third dark:bg-gray-950 rounded-2xl p-2">
              <Tab data-aos="fade-down" data-aos-duration="1000">
                Education
              </Tab>
              <Tab>Skills</Tab>
              <Tab data-aos="fade-up" data-aos-duration="1000">
                Pursued Courses
              </Tab>
            </TabList>
          </div>

          <TabPanel>
            <div className="space-y-6 pt-10 ">
              {/* <h2 className="text-3xl font-bold sm:text-4xl text-center">Education</h2> */}
              <ul className="md:timeline md:timeline-vertical md:timeline-middle text-gray-800 dark:text-fourth ">
                <li>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    className="timeline-start md:text-end mb-10 space-y-2 text-justify border-l-4 pl-2 border-accent flex flex-col justify-end items-end md:w-6/12"
                  >
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
                </li>

                <li>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    className="timeline-end mb-10 space-y-2 border-r-4 pr-2 border-accent flex flex-col justify-center items-end"
                  >
                    <div className="md:w-6/12">
                      <time className="font-mono italic">2016-2018</time>
                      <div className="md:text-lg text-base     font-black">
                        Jatiya Kabi Kazi Nazrul Islam University
                      </div>
                      <div className="md:text-lg text-base     font-black">
                        BBA in Accounting and Information Systems (AIS)
                      </div>
                      <br />
                      After HSC i got admitted in this university. But Due to
                      some unavoidable circumstances i had to leave study there.
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </TabPanel>
          <TabPanel>
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              className="flex justify-center items-center gap-5"
            >
              <div className="flex flex-col md:flex-row justify-center w-10/12 md:w-8/12 gap-5 md:gap-10 mt-10 text-gray-800 dark:text-fourth">
                <div className="flex justify-between items-start gap-5">
                  <div data-aos="fade-down" data-aos-duration="1000">
                    <h3 className="text-xl font-bold  pb-3">Frontend</h3>
                    <ul className="space-y-1 flex flex-col-reverse">
                      <li className="flex gap-2">
                        <Image
                          className="w-5"
                          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg"
                          alt=""
                          height={20}
                          width={20}
                        />
                        <h4 className="font-semibold">HTML</h4>
                      </li>
                      <li className="flex gap-2">
                        <Image
                          className="w-5"
                          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg"
                          alt=""
                          height={20}
                          width={20}
                        />
                        <h4 className="font-semibold">CSS</h4>
                      </li>
                      <li className="flex gap-2">
                        <Image
                          className="w-5"
                          src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg"
                          alt=""
                          height={20}
                          width={20}
                        />
                        <h4 className="font-semibold">Tailwind CSS</h4>
                      </li>
                      <li className="flex gap-2">
                        <Image
                          className="w-5"
                          src={bootstrap}
                          height={20}
                          width={20}
                          alt=""
                        />
                        <h4 className="font-semibold">Bootstrap</h4>
                      </li>
                      <li className="flex gap-2">
                        <Image
                          className="w-5"
                          src="https://daisyui.com/favicon.ico"
                          alt=""
                          height={20}
                          width={20}
                        />
                        <h4 className="font-semibold">DaisyUI</h4>
                      </li>
                      <li className="flex gap-2">
                        <Image
                          className="w-5"
                          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
                          alt=""
                          height={20}
                          width={20}
                        />
                        <h4 className="font-semibold">Javascript</h4>
                      </li>
                      <li className="flex gap-2">
                        <Image
                          className="w-5"
                          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg"
                          alt=""
                          height={20}
                          width={20}
                        />
                        <h4 className="font-semibold">React</h4>
                      </li>
                      <li className="flex gap-2">
                        <Image
                          className="w-5"
                          src={reactRouter}
                          height={20}
                          width={20}
                          alt=""
                        />
                        <h4 className="font-semibold">React router dom</h4>
                      </li>
                      <li className="flex gap-2">
                        <Image
                          className="w-5"
                          src={nextImg}
                          alt=""
                          height={20}
                          width={20}
                        />
                        <h4 className="font-semibold">Nextjs</h4>
                      </li>
                      <li className="flex gap-2">
                        <Image
                          className="w-5"
                          src={redux}
                          alt=""
                          height={20}
                          width={20}
                        />
                        <h4 className="font-semibold">Redux/RTK Query</h4>
                      </li>
                      <li className="flex gap-2">
                        <Image
                          className="w-5"
                          src={ts}
                          alt=""
                          height={20}
                          width={20}
                        />
                        <h4 className="font-semibold">TypeScript</h4>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold pb-3">Backend</h3>
                    <ul className="space-y-1">
                      <li className="flex gap-2">
                        <Image
                          className="w-5"
                          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg"
                          alt=""
                          height={20}
                          width={20}
                        />
                        <h4 className="font-semibold">Node.js</h4>
                      </li>
                      <li className="flex gap-2">
                        <Image
                          className="w-5"
                          src={expressImg}
                          alt=""
                          height={20}
                          width={20}
                        />
                        <h4 className="font-semibold">Expressjs</h4>
                      </li>
                      <li className="flex gap-2">
                        <Image
                          className="w-5"
                          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg"
                          alt=""
                          height={20}
                          width={20}
                        />
                        <h4 className="font-semibold">MongoDB</h4>
                      </li>
                      <li className="flex gap-2">
                        <Image
                          className="w-5"
                          src={ts}
                          alt=""
                          height={20}
                          width={20}
                        />
                        <h4 className="font-semibold">TypeScript</h4>
                      </li>
                      <li className="flex gap-2">
                        <Image
                          className="w-5"
                          src={mongoose}
                          alt=""
                          height={20}
                          width={20}
                        />
                        <h4 className="font-semibold">Mongoose</h4>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-between items-start gap-5">
                  <div data-aos="fade-up" data-aos-duration="1000">
                    <h3 className="text-xl font-bold pb-3">Tools</h3>
                    <ul className="space-y-1">
                      <li className="flex gap-2">
                        <Image
                          className="w-5"
                          src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg"
                          alt=""
                          height={20}
                          width={20}
                        />
                        <h4 className="font-semibold">Git</h4>
                      </li>
                      <li className="flex gap-2">
                        <Image
                          className="w-5"
                          src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg"
                          alt=""
                          height={20}
                          width={20}
                        />
                        <h4 className="font-semibold">Figma</h4>
                      </li>
                      <li className="flex gap-2">
                        <Image
                          className="w-5"
                          src={githubImg}
                          alt=""
                          height={20}
                          width={20}
                        />
                        <h4 className="font-semibold">Github</h4>
                      </li>
                    </ul>
                  </div>

                  <div data-aos="fade-up" data-aos-duration="1000">
                    <h3 className="text-xl font-bold pb-3">Authentications</h3>
                    <ul className="space-y-1">
                      <li className="flex gap-2">
                        <Image
                          className="w-5"
                          src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg"
                          alt=""
                          height={20}
                          width={20}
                        />
                        <h4 className="font-semibold">Firebase</h4>
                      </li>
                      <li className="flex gap-2">
                        <Image
                          className="w-5"
                          src={nextAuth}
                          alt=""
                          height={20}
                          width={20}
                        />
                        <h4 className="font-semibold">Next Auth</h4>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex justify-center items-center space-y-6 pt-10">
              <ul className="md:timeline timeline-vertical timeline-middle text-gray-800 dark:text-fourth">
                <li>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    className="timeline-end mb-10 space-y-2 border-r-4 pr-2 border-accent flex flex-col justify-end items-end"
                  >
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
                      Redux, Next.Js, DBMS, SQL, PostgreSQL, Prisma, Docker,
                      AWS, GraphQL, Vitest, Jest.
                      <br />
                    </div>
                  </div>
                </li>
                <li>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    className="timeline-start md:text-end mb-10 space-y-2 text-justify border-l-4 pl-2 border-accent flex flex-col justify-start items-start"
                  >
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
                </li>
                <li>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    className="timeline-end mb-10 space-y-2 border-r-4 pr-2 border-accent flex flex-col justify-end items-end"
                  >
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
                      <ol>
                        <li>1. Communicate in the workplace</li>
                        <li>2. Work in a team environment</li>
                        <li>
                          3. Parctical occupational health and safety (OHS)
                        </li>
                        <li>4. Demonastrate work values</li>
                        <li>5. Perform Search Engine Optimization Technique</li>
                        <li>6. Use HTML, CSS code and Use Web Hosting</li>
                        <li>7. Use Javascript Programming</li>
                        <li>8. Use Mobile Apps Development Technique</li>
                        <li>
                          9. Perform Online Outsoucing Marketplaces & Earning
                        </li>
                      </ol>
                    </div>
                  </div>
                </li>
                <li>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    className="timeline-start md:text-end mb-10 space-y-2 text-justify border-l-4 pl-2 border-accent flex flex-col justify-start items-start"
                  >
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
                      <ol>
                        <li>1. Computer Operating Systems</li>
                        <li>2. Microsoft Applications</li>
                        <li>3. Basic Input Output Systems (BIOS)</li>
                        <li>4. Basic hardware introduction</li>
                        <li>5. Basic networking procedure</li>
                      </ol>
                      <br />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};
