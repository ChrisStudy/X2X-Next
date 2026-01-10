"use client";

import { useState } from "react";
import type { Project, ProjectCategory } from "@/lib/project-types";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

interface ProjectsSectionProps {
    projects: Project[];
    categories: { value: ProjectCategory; label: string }[];
}

const ProjectsSection = ({ projects, categories }: ProjectsSectionProps) => {
    const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredProjects =
        activeCategory === "all"
            ? projects
            : projects.filter((project) => project.category === activeCategory);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProject(null), 300);
    };

    return (
        <section id="projects" className="relative min-h-screen py-20">
            <div className="container mx-auto px-4">
                {/* Section header */}
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-4xl font-bold md:text-5xl">
                        My <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-muted-foreground">
                        A showcase of my recent work, featuring web applications,
                        mobile apps, and design projects built with modern technologies.
                    </p>
                </div>

                {/* Filter buttons */}
                <div className="mb-12 flex flex-wrap justify-center gap-3">
                    {categories.map((category) => (
                        <button
                            key={category.value}
                            onClick={() => setActiveCategory(category.value as ProjectCategory)}
                            className={`filter-button button gradient  ${activeCategory === category.value ? "active" : ""}`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* Projects grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            onClick={() => handleProjectClick(project)}
                        />
                    ))}
                </div>

                {/* Empty state */}
                {filteredProjects.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-muted-foreground">No projects found in this category.</p>
                    </div>
                )}
            </div>

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </section>
    );
};

export default ProjectsSection;
