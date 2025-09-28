/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import { SlSocialLinkedin } from "react-icons/sl";
import logo1 from "../../../../public/portfolioAssets/SiteLog/t4.png";
import { FaAngleDoubleUp } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export const Footer = ({ sectionRefs }: { sectionRefs: any }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: any) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
      // setLoading(false)
    });
  }, []);

  const social = (
    <ul
      data-aos="fade-up"
      data-aos-duration="1000"
      className="mt-8 flex gap-6 social"
    >
      <a href="https://facebook.com/profile.trrabby" target="_blank">
        <FiFacebook />
      </a>
      <a href="https://linkedin.com/in/towfiqueWeb" target="_blank">
        <SlSocialLinkedin />
      </a>
      <a href="https://github.com/trrabby " target="_blank">
        <FaGithub />
      </a>
      <a href="https://twitter.com/towfique_veer" target="_blank">
        <FiTwitter />
      </a>
    </ul>
  );

  const scrollToSection = (id: string) => {
    const section = sectionRefs[id]?.current;
    if (section) {
      const navbarHeight = 100; // Adjust to your actual navbar height
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const currentScrollY = window.scrollY;

      // Determine scroll direction based on section position
      const isScrollingUp = sectionTop < currentScrollY;

      // Only subtract navbarHeight if scrolling up to the section
      const offset = isScrollingUp ? navbarHeight : 0;
      const top = sectionTop - offset;

      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div>
      {init && (
        <Particles
          id="tsparticles"
          //   particlesLoaded={particlesLoaded}
          options={{
            fpsLimit: 100,
            interactivity: {
              events: {
                onClick: {
                  enable: false,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: { enable: true },
              },
              modes: {
                push: {
                  quantity: 1,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: { value: "#04d1a1" },
              // {value:`${theme = "light" ? "#99ffcc" : "#FFFF00"}`},
              links: {
                color: "",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: {
                direction: "bottom",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: 3,
                straight: true,
              },
              number: {
                density: {
                  enable: true,
                  width: 800,
                  height: 800,
                },
                value: 10,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "triangle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
      )}

      <footer className="bg-accent dark:bg-gray-950 rounded-t-lg text-white py-10">
        <div className="relative mx-auto max-w-screen-xl px-4 md:py-10 lg:px-8 lg:py-10 lg:pt-0 flex flex-col">
          <div className="lg:flex lg:items-center lg:justify-between text-fourth">
            <div data-aos="fade-down" data-aos-duration="1000">
              <div className="flex justify-center lg:justify-start items-center ">
                <Link
                  href={"/"}
                  className="mr-4 ml-2 cursor-pointer py-1.5 flex gap-2 md:text-2xl text-sm items-center font-extrabold"
                >
                  <Image
                    className="md:w-4/12 w-8/12 mx-auto"
                    src={logo1}
                    alt="Towfiq's Portfolio"
                  />{" "}
                  <span className="text-fourth"></span>
                </Link>
              </div>

              <p className="mx-auto mt-6 md:w-8/12 text-center md:text-lg text-base leading-relaxed text-fourth lg:text-center">
                "Passionate about crafting seamless digital experiences, I
                strive to create innovative solutions one line of code at a
                time."
              </p>
            </div>

            <div className="md:hidden">{social}</div>
          </div>

          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="flex gap-4 mt-6 w-full mx-auto text-center justify-center p-4 rounded-lg"
          >
            <a
              href="https://github.com/trrabby"
              target="_blank"
              className=" transition hover:opacity-75 p-0 m-0"
            >
              Colleborate Me
            </a>

            <div
              onClick={() => scrollToSection("contacts")}
              className=" transition hover:cursor-pointer hover:opacity-75 p-0 m-0"
            >
              Contact Me
            </div>

            <a>
              {/* {!user && (
                <a className="hover:text-primary">
                  <Link to={"/login"}>Admin Login</Link>
                </a>
              )}
              {user && (
                <p className="hover:text-primary">
                  <Link to={"/dashboard"} target="_blank">
                    Admin Dashboard
                  </Link>
                </p>
              )} */}
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center w-full ">
          <div className="lg:w-4/12 mx-auto text-center text-sm border-x-2 border-accent text-fourth font-bold pt-5">
            Copyright &copy; {new Date().getFullYear()} All rights reserved.
          </div>

          <div
            className="absolute right-5 text-black bg-white p-4 rounded-full hover:bg-primary hover:text-fourth  dark:hover:bg-accent hover:cursor-pointer duration-500"
            onClick={() => scrollToSection("home")}
          >
            <FaAngleDoubleUp />
          </div>
        </div>
      </footer>
    </div>
  );
};
