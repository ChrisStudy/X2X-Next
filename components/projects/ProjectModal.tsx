"use client";

import { X, ExternalLink, Github, ChevronRight } from "lucide-react";
import { Project } from "@/lib/project-types";
import SimpleModal from "@/components/ui/Dialog";

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
    if (!project) return null;

    return (
        <SimpleModal isOpen={isOpen} onClose={onClose}>
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute left-4 top-4 z-50 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
                <X className="h-5 w-5" />
            </button>

            <div className="flex h-full flex-col md:flex-row">
                {/* Left panel */}
                <aside className="w-full border-b p-8 md:w-80 md:border-b-0 md:border-r">
                    <div className="mb-6 aspect-video overflow-hidden rounded-lg">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <h3 className="text-xl font-bold text-center">{project.title}</h3>
                    <p className="mb-6 text-center text-sm text-muted-foreground">
                        {project.subtitle}
                    </p>

                    <div className="flex flex-col gap-3">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="gradient-button text-center text-sm"
                            >
                                <ExternalLink className="mr-2 inline h-4 w-4" />
                                Live Demo
                            </a>
                        )}

                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full border px-6 py-3 text-center text-sm hover:border-primary hover:text-primary"
                            >
                                <Github className="mr-2 inline h-4 w-4" />
                                Source Code
                            </a>
                        )}
                    </div>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Completed in {project.year}
                    </div>
                </aside>

                {/* Right content */}
                <div className="flex-1 overflow-y-auto p-8">
                    {/* About */}
                    <section className="mb-8">
                        <h4 className="mb-4 text-2xl font-bold">
                            About <span className="gradient-text">Project</span>
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">
                            {project.longDescription}
                        </p>
                    </section>

                    {/* Tech */}
                    <section className="mb-8">
                        <h4 className="mb-4 text-2xl font-bold">
                            Tech <span className="gradient-text">Stack</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                                <span key={tech} className="tech-tag">
                  {tech}
                </span>
                            ))}
                        </div>
                    </section>

                    {/* Features */}
                    <section>
                        <h4 className="mb-4 text-2xl font-bold">
                            Key <span className="gradient-text">Features</span>
                        </h4>
                        <ul className="space-y-3">
                            {project.features.map((feature, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3 text-muted-foreground"
                                >
                                    <ChevronRight className="mt-1 h-4 w-4 text-primary" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </SimpleModal>
    );
};

export default ProjectModal;
