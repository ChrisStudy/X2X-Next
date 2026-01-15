// lib/projects.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { Project, ProjectCategory } from "./project-types";

// ✅ 导出类型
export type { Project, ProjectCategory };

// 定义允许的分类
// const validCategories: ProjectCategory[] = [
//     "all",
//     "frontend",
//     "fullstack",
//     "mobile",
//     "design",
// ];

// Markdown 项目存放目录
const projectsDirectory = path.join(process.cwd(), "projects");

/**
 * 读取所有 Markdown 项目文件并返回 Project[]
 */
export async function getAllProjects(): Promise<Project[]> {
    const fileNames = fs.readdirSync(projectsDirectory);

    const projects: Project[] = await Promise.all(
        fileNames.map(async (fileName) => {
            const id = fileName.replace(/\.md$/, "");
            const fullPath = path.join(projectsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");

            const { data, content } = matter(fileContents);

            // 转换 Markdown 内容为 HTML
            const processedContent = await remark().use(html).process(content);

            // 校验 category 是否有效，否则默认 "all"
            // category 当 tag，默认 "all"
            const category: ProjectCategory = (typeof data.category === "string" && data.category)
                ? (data.category as ProjectCategory)
                : "all";


            return {
                id,
                title: data.title ?? "Untitled Project",
                subtitle: data.subtitle ?? null, // undefined -> null
                description: data.description ?? "",
                longDescription: data.longDescription ?? null,
                category,
                technologies: Array.isArray(data.technologies) ? data.technologies : [],
                image: data.image ?? "",
                year: data.year ?? "",
                features: Array.isArray(data.features) ? data.features : [],
                liveUrl: data.liveUrl ?? null,   // undefined -> null
                githubUrl: data.githubUrl ?? null, // undefined -> null
            } as Project;
        })
    );

    return projects;
}

/**
 * label 格式化：把 tag 转成可读形式
 */
function formatLabel(value: string) {
    return value
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * 根据项目动态生成分类（tags），all 固定在最前
 */
export function buildCategories(projects: Project[]): { value: ProjectCategory; label: string }[] {
    const tags = Array.from(
        new Set(
            projects
                .map((p) => p.category)
                .filter((c) => c && c !== "all") // 排除空和 "all"
        )
    ).sort((a, b) => a.localeCompare(b));

    return [
        { value: "all", label: "All" },
        ...tags.map((tag) => ({
            value: tag,
            label: formatLabel(tag),
        })),
    ];
}