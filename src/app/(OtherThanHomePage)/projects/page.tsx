import { SectionHead } from "@/components/SectionHead";
import { getProjects } from "@/services/Projects";
import { IProject } from "@/constants";
import ProjectCard from "@/app/(CommonLayout)/_homePageComponents/_Cards/ProjectCards";
import BackButton from "../blogs/[id]/_InterectiveSec/BackButton";

export const revalidate = 60; // cache refresh every 1 minute

const Projects = async () => {
  const res = await getProjects();
  const projects = res?.data.result || [];

  return (
    <section>
      <div className="max-w-7xl mx-auto mt-16 px-4 pb-6">
        <div className="p-2 absolute">
          <BackButton />
        </div>
        <SectionHead
          title="All Projects"
          titleColor="text--gray-800 dark:text-fourth"
          para="Explore a collection of innovative projects showcasing my skills in full-stack web development, performance optimization and modern UI design."
          paraColor="text-gray-600 dark:text-fourth"
        />

        <div className="grid md:grid-cols-3 grid-cols-1 gap-8 mt-12">
          {projects.length > 0 ? (
            projects.map((project: IProject) => (
              <ProjectCard key={project._id} project={project} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-400">
              No featured projects found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
