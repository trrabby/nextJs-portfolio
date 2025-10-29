import Link from "next/link";
import { SectionHead } from "@/components/SectionHead";
import { getProjects } from "@/services/Projects";
import { IProject } from "@/constants";
import ProjectCard from "./_Cards/ProjectCards";

export const revalidate = 60; // cache refresh every 1 minute

const FeaturedProjects = async () => {
  const res = await getProjects("", "", { featured: "true" });
  const projects = res?.data.result || [];

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4">
        <SectionHead
          title="Featured Projects"
          titleColor="text--gray-800 dark:text-fourth"
          para="A showcase of my top projects featuring full-stack development, performance optimization, and design precision."
          paraColor="text-gray-600 dark:text-fourth"
        />

        <div className="grid md:grid-cols-2 grid-cols-1 gap-8 mt-12">
          {projects.length > 0 ? (
            projects
              .slice(0, 5)
              .map((project: IProject) => (
                <ProjectCard key={project._id} project={project} />
              ))
          ) : (
            <p className="text-center col-span-full text-gray-400">
              No featured projects found.
            </p>
          )}
        </div>

        <div className="flex justify-end items-center mt-10">
          <Link
            href="/projects"
            className="rounded bg-transparent px-8 py-3 text-base font-medium text-accent shadow hover:bg-accent hover:text-white hover:scale-105 duration-500 border border-blue-200"
          >
            See More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
