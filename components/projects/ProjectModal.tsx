"use client";

import { X, ExternalLink, Github, ChevronRight } from "lucide-react";
import { Project } from "@/lib/project-types";
import { Dialog, DialogContent, DialogTitle } from '../ui/Dialog';
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}
const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
    if (!project) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] max-w-5xl overflow-hidden bg-popover p-0 glass">
                <VisuallyHidden>
                    <DialogTitle>{project.title}</DialogTitle>
                </VisuallyHidden>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute left-4 top-4 z-50 rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Gradient accent line */}
                <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-accent via-primary to-accent" />

                <div className="flex h-full flex-col max-h-[90vh] overflow-hidden md:flex-row">
                    {/* Left sidebar */}
                    <div className="flex w-full flex-shrink-0 flex-col items-center right-border-dashed bg-sidebar p-8 md:w-80 md:border-b-0 md:border-r">
                        {/* Project image */}
                        <div className="gradient-border mb-6 h-48 w-full overflow-hidden md:h-40">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Project title */}
                        <h3 className="mb-1 text-center text-xl font-bold text-foreground">
                            {project.title}
                        </h3>
                        <p className="mb-6 text-center text-sm text-muted-foreground">
                            {project.subtitle}
                        </p>

                        {/* Project links */}
                        <div className="flex w-full flex-col gap-3">
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="gradient-button flex items-center justify-center gap-2 text-sm"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    View Live Demo
                                </a>
                            )}
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-primary hover:text-primary"
                                >
                                    <Github className="h-4 w-4" />
                                    View Source Code
                                </a>
                            )}
                        </div>

                        {/* Year */}
                        <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="h-2 w-2 rounded-full bg-primary" />
                            Completed in {project.year}
                        </div>
                    </div>

                    {/* Right content */}
                    <div className="flex-1 overflow-y-auto p-8  no-scrollbar scroll-fade-right">
                        {/* About section */}
                        <section className="mb-8">
                            <h4 className="mb-4 text-2xl font-bold">
                                About <span className="gradient-text">Project</span>
                            </h4>
                            <p className="leading-relaxed text-muted-foreground">
                                {project.longDescription}
                            </p>
                        </section>

                        {/* Technologies section */}
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

                        {/* Features section */}
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
                                        <ChevronRight className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectModal;