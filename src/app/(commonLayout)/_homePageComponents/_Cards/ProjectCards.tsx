/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { IProject } from "@/constants";
import imo from "@/utils/getSkillIcons";
import styles from "../../styles.module.css";

interface ProjectCardProps {
  project: IProject;
  className?: string;
}

const ProjectCard = ({ project, className = "" }: ProjectCardProps) => {
  const thumbnail =
    project.thumbnails?.[0] ||
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80";

  return (
    <article
      className={`group flex flex-col rounded-2xl overflow-hidden border bg-gray-100 dark:bg-gray-800 shadow-lg transition-all duration-500 hover:shadow-xl text-gray-600 dark:text-fourth border-accent/20 dark:border-gray-700 ${className}`}
    >
      {/* IMAGE SECTION */}
      <div className="w-full h-48 sm:h-56 lg:h-64 relative overflow-hidden bg-white">
        <Image
          fill
          src={thumbnail}
          alt={project.projTitle}
          className="object-cover transition-all duration-700 group-hover:scale-105"
        />

        {/* FEATURED BADGE OVERLAY */}
        {project.featured && (
          <div className="absolute top-3 right-3 bg-accent/90 dark:bg-slate-700 text-white text-xs px-3 py-1 rounded-full font-medium z-10">
            Featured
          </div>
        )}
      </div>

      {/* CONTENT SECTION */}
      <div className="relative">
        <div className="flex-1 p-5 sm:p-6 flex flex-col">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4 ">
            <div className="flex-1 mt-2">
              <h3 className="font-bold text-lg sm:text-xl lg:text-2xl tracking-tight text-gray-800 dark:text-white line-clamp-2 text-nowrap">
                {project.projTitle}
              </h3>
              <div className="flex items-center gap-3 mt-2">
                {project.createdAt && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(project.createdAt).getFullYear()}
                  </span>
                )}
              </div>
            </div>

            <div className="absolute right-0 top-0 ">
              {/* SPECIAL REMARKS */}
              {project.specialRemarks && (
                <div className="w-full sm:w-32 lg:w-56 h-6 overflow-hidden rounded-l-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-semibold flex-shrink-0 ">
                  <div
                    className={`${styles.animate_marquee} whitespace-nowrap px-3 py-1 `}
                  >
                    {project.specialRemarks}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="flex-1 mb-4">
            <div className="max-h-32 lg:max-h-40 overflow-y-auto pr-2 custom-scrollbar">
              <p className="text-sm leading-relaxed mb-3">
                <span className="font-semibold text-accent dark:text-yellow-400">
                  Idea:
                </span>{" "}
                {project.shortDescription}
              </p>

              {project.descriptionOfProject && (
                <p className="text-sm leading-relaxed text-justify">
                  <span className="font-semibold text-accent dark:text-yellow-400 ">
                    Description:
                  </span>{" "}
                  {project.descriptionOfProject}
                </p>
              )}
            </div>
          </div>

          {/* TECH STACK */}
          {project.stackUsed?.length > 0 && (
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-2">
                {project.stackUsed.slice(0, 8).map((tech) => (
                  <span
                    key={tech}
                    className="flex items-center gap-1 px-2 py-1 rounded-md bg-white dark:bg-gray-700/50 text-xs font-medium transition-all duration-300 hover:bg-white/80 hover:scale-105 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 "
                  >
                    <Image
                      src={imo(tech)}
                      alt={`${tech} icon`}
                      width={14}
                      height={14}
                      className="flex-shrink-0"
                    />
                    <span className="truncate max-w-20">{tech}</span>
                  </span>
                ))}
                {project.stackUsed.length > 8 && (
                  <span className="px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 text-center">
                    +{project.stackUsed.length - 8}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-300 dark:border-gray-600">
            {project.liveLInk && (
              <a
                href={project.liveLInk}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-accent dark:bg-slate-700 hover:bg-accent/90 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 flex-1 text-center"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}

            <div className="flex gap-2">
              {project.clientLink && (
                <a
                  href={project.clientLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 text-sm px-3 py-2 rounded-lg transition-all duration-300 hover:text-accent hover:border-accent dark:hover:border-slate-400 hover:scale-105 flex-1 text-center"
                >
                  <Github size={14} />
                  Client
                </a>
              )}

              {project.serverLink && (
                <a
                  href={project.serverLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 text-sm px-3 py-2 rounded-lg transition-all duration-300 hover:text-accent hover:border-accent dark:hover:border-slate-400 hover:scale-105 flex-1 text-center"
                >
                  <Github size={14} />
                  Server
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
