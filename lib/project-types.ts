export type ProjectCategory =
    | "all"
    | "frontend"
    | "fullstack"
    | "mobile"
    | "design";

export interface Project {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    longDescription: string;
    category: ProjectCategory;
    technologies: string[];
    image: string;
    liveUrl?: string;
    githubUrl?: string;
    features: string[];
    year: string;
}
