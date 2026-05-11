"use client";

import { useState } from "react";
import { X, ExternalLink, Github, ChevronDown } from "lucide-react";
import { Project } from "@/lib/project-types";
import { Dialog, DialogContent, DialogTitle } from "../ui/Dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
    const [openFeatureIndex, setOpenFeatureIndex] = useState<number | null>(0);

    if (!project) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="
          h-[92dvh] w-[calc(100vw-1.5rem)] max-w-5xl
          overflow-hidden rounded-2xl bg-popover p-0 glass
          sm:w-[calc(100vw-2rem)]
          md:h-[90vh]
        "
            >
                <VisuallyHidden>
                    <DialogTitle>{project.title}</DialogTitle>
                </VisuallyHidden>

                {/* Close button */}
                <button
                    onClick={onClose}
                    aria-label="Close project modal"
                    className="
            absolute right-3 top-3 z-50 rounded-full border border-border/60
            bg-background/80 p-2 text-muted-foreground backdrop-blur
            transition-colors hover:bg-secondary hover:text-foreground
            md:left-4 md:right-auto md:top-4
          "
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Desktop accent line */}
                <div className="absolute right-0 top-0 hidden h-full w-1 bg-gradient-to-b from-accent via-primary to-accent md:block" />

                {/*
          Mobile: whole modal scrolls together
          Desktop: modal stays fixed, right content scrolls
        */}
                <div className="project-modal-scroll h-full overflow-y-auto md:overflow-hidden">
                    <div className="flex min-h-full flex-col md:h-full md:min-h-0 md:flex-row">
                        {/* Mobile top / Desktop left */}
                        <aside
                            className="
                flex shrink-0 flex-col bg-sidebar
                border-b border-border/60 p-4
                md:w-80 md:border-b-0 md:border-r md:p-8
              "
                        >
                            {/* Project image */}
                            <div
                                className="
                  gradient-border mb-4 h-36 w-full overflow-hidden rounded-xl
                  sm:h-44
                  md:mb-6 md:h-40
                "
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <div className="text-center">
                                <h3 className="mb-1 text-lg font-bold text-foreground md:text-xl">
                                    {project.title}
                                </h3>

                                <p className="mb-4 text-sm text-muted-foreground md:mb-6">
                                    {project.subtitle}
                                </p>
                            </div>

                            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1">
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                      gradient-button flex items-center justify-center gap-2
                      px-4 py-2.5 text-sm
                      md:px-6 md:py-3
                    "
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        <span className="truncate">View Live Demo</span>
                                    </a>
                                )}

                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                      flex items-center justify-center gap-2 rounded-full
                      border border-border px-4 py-2.5 text-sm font-medium
                      text-foreground transition-all hover:border-primary hover:text-primary
                      md:px-6 md:py-3
                    "
                                    >
                                        <Github className="h-4 w-4" />
                                        <span className="truncate">View Source Code</span>
                                    </a>
                                )}
                            </div>

                            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground md:mt-6">
                                <span className="h-2 w-2 rounded-full bg-primary" />
                                <span>Completed in {project.year}</span>
                            </div>
                        </aside>

                        {/* Mobile: normal content, no independent scroll */}
                        {/* Desktop: independent right scroll */}
                        <main
                            className="
                flex-1 p-4
                sm:p-6
                md:min-h-0 md:overflow-y-auto md:p-8 md:project-modal-scroll md:scroll-fade-right
              "
                        >
                            {/* About section */}
                            <section className="mb-7 md:mb-8">
                                <h4 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                                    About <span className="gradient-text">Project</span>
                                </h4>

                                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                                    {project.longDescription}
                                </p>
                            </section>

                            {/* Technologies section */}
                            <section className="mb-7 md:mb-8">
                                <h4 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                                    Tech <span className="gradient-text">Stack</span>
                                </h4>

                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <span key={tech} className="tech-tag text-xs md:text-sm">
                      {tech}
                    </span>
                                    ))}
                                </div>
                            </section>

                            {/* Features accordion */}
                            <section>
                                <h4 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                                    Key <span className="gradient-text">Features</span>
                                </h4>

                                <div className="space-y-3">
                                    {project.features.map((feature, index) => {
                                        const isOpen = openFeatureIndex === index;

                                        return (
                                            <div
                                                key={`${feature.title}-${index}`}
                                                className="
                          overflow-hidden rounded-xl  border-border/60
                          bg-background/40 transition-all
                          hover:border-primary/50
                        "
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setOpenFeatureIndex(isOpen ? null : index)
                                                    }
                                                    className="
                            flex w-full items-center justify-between gap-4
                            px-4 py-3 text-left
                          "
                                                >
                          <span className="text-sm font-medium text-foreground md:text-base">
                            {feature.title}
                          </span>

                                                    <ChevronDown
                                                        className={`
                              h-4 w-4 shrink-0 text-primary transition-transform duration-200
                              ${isOpen ? "rotate-180" : ""}
                            `}
                                                    />
                                                </button>

                                                {isOpen && feature.content && (
                                                    <div className="border-border/50 px-4 pb-4 pt-3">
                                                        <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground md:text-base">
                                                            {feature.content}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        </main>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectModal;