// lib/projects.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { Project, ProjectCategory, ProjectFeature } from "./project-types";

// ✅ 导出类型
export type { Project, ProjectCategory, ProjectFeature };

const projectsDirectory = path.join(process.cwd(), "projects");

/**
 * Normalize features from markdown.
 *
 * Supports both:
 *
 * Old format:
 * features:
 *   - Markdown-driven project content
 *
 * New format:
 * features:
 *   - title: Markdown-driven project content
 *     content: Some detail text...
 */
function normalizeFeatures(features: unknown): ProjectFeature[] {
    if (!Array.isArray(features)) return [];

    return features
        .map((feature): ProjectFeature | null => {
            // Backward compatible with old string[] format
            if (typeof feature === "string") {
                return {
                    title: feature,
                    content: "",
                };
            }

            // New accordion object format
            if (
                feature &&
                typeof feature === "object" &&
                "title" in feature &&
                typeof feature.title === "string"
            ) {
                return {
                    title: feature.title,
                    content:
                        "content" in feature && typeof feature.content === "string"
                            ? feature.content
                            : "",
                };
            }

            return null;
        })
        .filter((feature): feature is ProjectFeature => feature !== null);
}

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
            // 目前你没有把 processedContent 放进 Project 里，
            // 但先保留这个逻辑，后面如果要支持 markdown body 内容可以继续用。
            await remark().use(html).process(content);

            const category: ProjectCategory =
                typeof data.category === "string" && data.category
                    ? (data.category as ProjectCategory)
                    : "all";

            return {
                id,
                title: data.title ?? "Untitled Project",
                subtitle: data.subtitle ?? null,
                description: data.description ?? "",
                longDescription: data.longDescription ?? null,
                category,
                technologies: Array.isArray(data.technologies)
                    ? data.technologies
                    : [],
                image: data.image ?? "",
                year: data.year ?? "",
                features: normalizeFeatures(data.features),
                liveUrl: data.liveUrl ?? null,
                githubUrl: data.githubUrl ?? null,
            } as Project;
        })
    );

    return projects.sort((a, b) => {
        return String(b.year).localeCompare(String(a.year));
    });
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
 * 根据项目动态生成分类 tags，all 固定在最前
 */
export function buildCategories(
    projects: Project[]
): { value: ProjectCategory; label: string }[] {
    const tags = Array.from(
        new Set(
            projects
                .map((p) => p.category)
                .filter((c) => c && c !== "all")
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