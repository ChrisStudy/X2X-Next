export type ProjectCategory = string;

export interface ProjectFeature {
    title: string;
    content: string;
}

export interface Project {
    id: string;
    title: string;
    subtitle: string | null;
    description: string;
    longDescription: string | null;
    category: ProjectCategory;
    technologies: string[];
    image: string;
    year: string;
    features: ProjectFeature[];
    liveUrl: string | null;
    githubUrl: string | null;
}