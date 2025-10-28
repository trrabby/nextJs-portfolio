/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import type { ReactNode } from "react";
import { ExternalLink, Github } from "lucide-react";
import { IProject } from "@/constants";
import skillIcons from "@/utils/getSkillIcons";

interface ProjectCardProps {
  project: IProject;
}
const techIcon = (tech: string): ReactNode => {
  const key = tech.toLowerCase();
  let icon: any = undefined;

  if (key.includes("react")) icon = skillIcons["React"];
  if (key.includes("next")) icon = skillIcons["Next.js"];
  if (key.includes("node")) icon = skillIcons["Node.js"];
  if (key.includes("mongo")) icon = skillIcons["MongoDB"];
  if (key.includes("postgres") || key.includes("prisma"))
    icon = skillIcons["PostgreSQL"];
  if (key.includes("tailwind")) icon = skillIcons["Tailwind CSS"];
  if (key.includes("firebase")) icon = skillIcons["Firebase"];
  if (key.includes("express")) icon = skillIcons["Express.js"];
  if (key.includes("jwt") || key.includes("auth"))
    icon = skillIcons["NextAuth.js"];

  if (!icon) return "💡";
  if (typeof icon === "string") return icon;

  return (
    <Image
      src={icon}
      alt={`${tech} icon`}
      width={18}
      height={18}
      className="inline-block"
    />
  );
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const thumbnail =
    project.thumbnails?.[0] ||
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80";

  return (
    <article className="group flex flex-col md:flex-row rounded-3xl overflow-hidden border bg-white dark:bg-gray-800 shadow-xl transition-all duration-500  hover:shadow-2xl text-justify text-gray-600 dark:text-fourth border-accent/20 dark:border-gray-700">
      {/* LEFT IMAGE - Shrinks on hover */}
      <div className="md:w-2/3 group-hover:md:w-1/3 transition-all duration-500 ease-in-out w-full flex-shrink-0 relative overflow-hidden">
        <div className="h-64 md:h-full bg-white p-2 relative">
          <Image
            fill
            src={thumbnail}
            alt={project.projTitle}
            className="object-fill w-full h-full transition-all duration-700 group-hover:scale-105 rounded-lg"
          />
        </div>
      </div>

      {/* RIGHT CONTENT - Expands on hover */}
      <div className="md:w-1/3 group-hover:md:w-2/3 transition-all duration-500 ease-in-out w-full p-6 flex flex-col justify-between group-hover:bg-gray-100 dark:group-hover:bg-gray-700/50 group-hover:text-gray-600 dark:group-hover:text-fourth">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-extrabold text-xl md:text-2xl tracking-tight transition-all duration-300  overflow-hidden flex-wrap text-nowrap group-hover:text-gray-600 dark:group-hover:text-fourth">
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
              <div className="hidden md:inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs px-3 py-1 rounded-full font-semibold animate-fadeIn overflow-hidden text-nowrap group-hover:text-gray-600 dark:group-hover:text-fourth">
                {project.specialRemarks}
              </div>
            )}
          </div>

          {/* Scrollable description container */}
          <div className="mt-4 max-h-[120px] overflow-y-scroll pr-2">
            <p className="text-sm leading-relaxed text-justify transition-all duration-300 group-hover:text-gray-600 dark:group-hover:text-fourth">
              {project.shortDescription}
            </p>

            {project.descriptionOfProject && (
              <p className="mt-3 text-sm transition-all duration-300 group-hover:text-gray-600 dark:group-hover:text-fourth">
                {project.descriptionOfProject}
              </p>
            )}
          </div>
          {/* TECH STACK */}
          {project.stackUsed?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 ">
              {project.stackUsed.map((tech) => (
                <span
                  key={tech}
                  className="flex items-center gap-2 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 text-xs font-medium transition-all duration-300 hover:bg-white/10 hover:scale-105 group-hover:border-accent/80 group-hover:text-accent/80"
                >
                  <span className="dark:text-fourth h-5 w-5">
                    {techIcon(tech)}
                  </span>{" "}
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER ACTIONS */}
        <div className="mt-6 pt-4 border-t border-accent/80 text-accent/80 flex items-center justify-between transition-all duration-300 ">
          <div className="flex items-center gap-3">
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
              className="inline-flex items-center gap-2 border border-accent/10 text-gray-300 text-sm ,px-2 md:px-4 py-2 rounded-lg transition-all duration-300 hover:text-accent hover:border-accent hover:scale-105 group-hover:text-accent/80"
            >
              <Github size={16} /> Client
            </a>

            <a
              href={project.serverLink}
              target="_blank"
              className="inline-flex items-center gap-2 border border-white/10 text-gray-300 text-sm px-2 md:px-4 py-2 rounded-lg transition-all duration-300 hover:text-accent hover:border-accent group-hover:text-accent/80  hover:scale-105"
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
