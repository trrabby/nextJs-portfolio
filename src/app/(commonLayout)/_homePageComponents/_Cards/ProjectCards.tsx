/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { IProject } from "@/constants";
import imo from "@/utils/getSkillIcons";
import styles from "../../styles.module.css";

interface ProjectCardProps {
  project: IProject;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const thumbnail =
    project.thumbnails?.[0] ||
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80";

  return (
    <article className="group flex flex-col md:flex-row rounded-3xl overflow-hidden border bg-gray-100 dark:bg-gray-800 shadow-xl transition-all duration-500 hover:shadow-2xl text-justify text-gray-600 dark:text-fourth border-accent/20 dark:border-gray-700">
      {/* LEFT IMAGE */}
      <div className="md:w-2/3 group-hover:md:w-1/3 transition-all duration-500 ease-in-out w-full flex-shrink-0 relative overflow-hidden">
        <div className="h-64 md:h-full bg-white p-2 relative">
          <Image
            fill
            src={thumbnail}
            alt={project.projTitle}
            className="object-fill transition-all duration-700 group-hover:scale-105 rounded-lg"
          />
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="md:w-1/3 group-hover:md:w-2/3 transition-all duration-500 ease-in-out w-full p-6 flex flex-col justify-between group-hover:bg-gray-100 dark:group-hover:bg-gray-700/50 group-hover:text-gray-600 dark:group-hover:text-fourth">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-extrabold text-xl md:text-2xl tracking-tight transition-all duration-300 overflow-hidden flex-wrap text-nowrap group-hover:text-gray-600 dark:group-hover:text-fourth">
                {project.projTitle}
              </h3>
              <div className="mt-2 flex items-center gap-3 text-nowrap group-hover:text-gray-600 dark:group-hover:text-fourth">
                {project.createdAt && (
                  <span className="text-xs">
                    {new Date(project.createdAt).getFullYear()}
                  </span>
                )}
                {project.featured && (
                  <span className="bg-accent/80 text-white text-xs px-3 py-1 rounded-full font-medium">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {project.specialRemarks && (
              <div className="relative inline-block w-32 md:w-40 h-6 overflow-hidden rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-semibold">
                <div
                  className={`${styles.animate_marquee} whitespace-nowrap px-3 py-1`}
                >
                  {project.specialRemarks}
                </div>
              </div>
            )}
          </div>

          {/* SCROLLABLE DESCRIPTION */}
          <div className="mt-4 max-h-[200px] lg:max-h-[500px] overflow-y-scroll pr-2 group-hover:text-lg">
            <p className="text-sm leading-relaxed text-justify transition-all duration-300 group-hover:text-gray-600 dark:group-hover:text-fourth">
              <span className="font-bold text-yellow-500"> Idea:</span>{" "}
              {project.shortDescription}
            </p>

            {project.descriptionOfProject && (
              <p className="mt-3 text-sm transition-all duration-300 group-hover:text-gray-600 dark:group-hover:text-fourth">
                <span className="font-bold text-yellow-500"> Description:</span>{" "}
                {project.descriptionOfProject}
              </p>
            )}
          </div>

          {/* TECH STACK */}
          {project.stackUsed?.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-1 lg:gap-2 ">
              {project.stackUsed.map((tech) => (
                <span
                  key={tech}
                  className="flex items-center gap-2 px-2 py-1 rounded-md bg-white/5 text-xs font-medium transition-all duration-300 hover:bg-white/10 hover:scale-105 border border-accent/10 text-gray-600 dark:text-gray-100 overflow-hidden flexwrap text-nowrap"
                >
                  {/* ✅ Uses imo utility */}
                  <Image
                    src={imo(tech)}
                    alt={`${tech} icon`}
                    width={18}
                    height={18}
                    className="inline-block"
                  />
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER ACTIONS */}
        <div className="mt-6 pt-4 border-t border-accent/80 text-accent/80 flex items-center justify-between transition-all duration-300 w-full">
          <div className="flex items-center justify-between gap-3 w-full">
            <a
              href={project.liveLInk}
              target="_blank"
              className="inline-flex items-center gap-2 bg-accent/80 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:bg-accent hover:scale-105 text-nowrap"
            >
              <ExternalLink size={16} /> Live Demo
            </a>

            <a
              href={project.clientLink}
              target="_blank"
              className="inline-flex items-center gap-2 border border-accent/10 text-gray-600 dark:text-gray-100 text-sm px-2 md:px-4 py-2 rounded-lg transition-all duration-300 hover:text-accent hover:border-accent hover:scale-105"
            >
              <Github size={16} /> Client
            </a>

            <a
              href={project.serverLink}
              target="_blank"
              className="inline-flex items-center gap-2 border border-accent/10 text-gray-600 dark:text-gray-100 text-sm px-2 md:px-4 py-2 rounded-lg transition-all duration-300 hover:text-accent hover:border-accent hover:scale-105"
            >
              <Github size={16} /> Server
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
