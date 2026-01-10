import { ExternalLink, Github } from "lucide-react";
// import { Project } from "@/lib/projects";
import { Project } from "@/lib/project-types";
import { getAllProjects, categories } from "@/lib/projects";
interface ProjectCardProps {
    project: Project;
    onClick: () => void;
    index: number;
}

const ProjectCard = ({ project, onClick, index }: ProjectCardProps) => {
    return (
        <div
            className="project-card group cursor-pointer opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${index * 150}ms` }}
            onClick={onClick}
        >
            {/* Image */}
            <div className="relative aspect-video overflow-hidden rounded-xl">
                <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Year badge */}
                <div className="absolute right-4 top-4">
          <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {project.year}
          </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="mb-2 text-xs font-medium uppercase tracking-wider text-primary">
                    {project.category}
                </div>

                <h3 className="mb-2 text-xl font-bold">
                    {project.title}
                </h3>

                <p className="mb-4 text-sm text-muted-foreground">
                    {project.description}
                </p>

                {/* Tech tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="tech-tag">
              {tech}
            </span>
                    ))}
                    {project.technologies.length > 4 && (
                        <span className="tech-tag">
              +{project.technologies.length - 4}
            </span>
                    )}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                        >
                            <ExternalLink className="h-4 w-4" />
                            Live
                        </a>
                    )}

                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                        >
                            <Github className="h-4 w-4" />
                            Code
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
