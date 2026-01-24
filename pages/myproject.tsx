import type { GetStaticProps } from "next";
import { getAllProjects, Project, buildCategories  } from "@/lib/projects";
import ProjectsSection from "@/components/projects/ProjectsSection";
type CategoryItem = { value: string; label: string };
type Props = {
    projects: Project[];
    categories: CategoryItem[] ; // ✅ 新增 categories 类型
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const projects = await getAllProjects();
    const categories = buildCategories(projects);
    return {
        props: {
            projects,
            categories , // ✅ 传 categories
        },
        revalidate: 3600,
    };
};

export default function Myproject({ projects, categories }: Props) {
    return (
        <div className="grid w-full h-full items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <ProjectsSection projects={projects} categories={categories} />
        </div>
    );
}

Myproject.pageTitle = "My Projects";