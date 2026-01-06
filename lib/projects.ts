import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type ProjectData = {
    id: string;
    title: string;
    date: string;
    contentHtml: string;
};

const projectsDirectory = path.join(process.cwd(), "projects");

export function getSortedProjectsData(): ProjectData[] {
    const fileNames = fs.readdirSync(projectsDirectory);

    const allProjectsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "");
        const fullPath = path.join(projectsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const { data } = matter(fileContents);

        return {
            id,
            ...(data as { date: string; title: string }),
            contentHtml: "",
        };
    });

    return allProjectsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllProjectIds() {
    const fileNames = fs.readdirSync(projectsDirectory);

    return fileNames.map((fileName) => ({
        params: {
            id: fileName.replace(/\.md$/, ""),
        },
    }));
}

export async function getProjectData(id: string): Promise<ProjectData> {
    const fullPath = path.join(projectsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);

    const contentHtml = processedContent.toString();

    return {
        id,
        ...(matterResult.data as { title: string; date: string }),
        contentHtml,
    };
}
