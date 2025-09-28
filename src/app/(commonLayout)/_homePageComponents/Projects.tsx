import React from "react";
import { ProjectCards } from "./_Cards/ProjectCards";
import Link from "next/link";
import { SectionHead } from "@/components/SectionHead";

const projects = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Projects = () => {
  return (
    <div>
      <SectionHead
        title="Projects"
        titleColor="text-gary-800 dark:text-fourth"
        para="A collection of my featured projects showcasing skills in full-stack development, modern frameworks, and real-world problem solving."
        paraColor="text-gray-600 dark:text-fourth"
      />
      <div className="flex justify-center items-center w-10/12 mx-auto">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 justify-center items-center">
          {projects.slice(0, 2).map((project) => (
            <div key={project}>
              <ProjectCards />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end items-center pl-40 pb-10">
        <Link
          className={`className="rounded bg-transparent px-8 py-3 text-base font-medium text-accent dark:text-fourth shadow hover:bg-accent dark:hover:bg-slate-700  hover:scale-105 hover:text-white hover:border-white duration-700 border border-blue-200 mt-5 hover:duration-500 rounded-md mr-5`}
          href={"/projects"}
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default Projects;
