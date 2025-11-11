/* eslint-disable react/no-unescaped-entities */
"use client";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import Link from "next/link";
import React from "react";
import { SiUpwork } from "react-icons/si";
import { SiFiverr } from "react-icons/si";

const HireMeContacts = () => {
  const { scrollToSection } = useScrollToSection();
  return (
    <div className="text-center bg-gradient-to-r from-accent to-accent/20 dark:from-gray-800 dark:to-gray-950 rounded-2xl p-8 text-white">
      <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
      <p className="text-xl mb-6 opacity-90">
        Let's discuss your requirements and create something amazing together.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <div className="flex gap-4 lg:flex-row justify-center">
          <Link
            href="https://www.fiverr.com/towfiqueomar"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-accent/20 to-accent border border-white hover:bg-gray-100 font-bold py-2 px-2 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex gap-2 items-center justify-center"
          >
            Order at <SiFiverr className="h-8 w-8" />
          </Link>
          <Link
            href="https://www.upwork.com/freelancers/towfiqurrahman19"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-accent/20 to-accent border border-white hover:bg-gray-100 font-bold py-2 px-2 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex gap-2 items-center justify-center"
          >
            Order at <SiUpwork className="h-8 w-8" />
          </Link>
        </div>
        <div
          onClick={() => scrollToSection("contacts")}
          className="bg-transparent border border-white hover:bg-gradient-to-r from-accent/20 to-accent font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
        >
          Contact Directly
        </div>
      </div>
    </div>
  );
};

export default HireMeContacts;
