import React from "react";
import { ProjectCards } from "./_Cards/ProjectCards";
import styles from "../styles.module.css";
import Link from "next/link";
import { SectionHead } from "@/components/SectionHead";

const projects = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Projects = () => {
  return (
    <div>
      <SectionHead
        title="Projects"
        para="A collection of my featured projects showcasing skills in full-stack development, modern frameworks, and real-world problem solving."
      />
      <div className="grid grid-cols-2 justify-center items-center">
        {projects.slice(0, 2).map((project) => (
          <div key={project}>
            <ProjectCards />
          </div>
        ))}
      </div>
      <div className="flex justify-end items-center pl-40 pb-10">
        <Link
          className={`${styles.styled_button1} border border-blue-200`}
          href={"/projects"}
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default Projects;
