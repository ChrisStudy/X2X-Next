import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export type PostData = {
    id: string;
    title: string;
    date: string;
    description: string;
    image: string;
    category: string;
    contentHtml: string;
};

const postsDirectory = path.join(process.cwd(), 'posts');

function normalizePostData(id: string, data: Record<string, unknown>): Omit<PostData, 'contentHtml'> {
    return {
        id,
        title: String(data.title ?? 'Untitled article'),
        date: String(data.date ?? ''),
        description: String(data.description ?? 'Practical notes on building better digital experiences.'),
        image: String(data.image ?? `/images/blog/${id}.png`),
        category: String(data.category ?? 'Web development'),
    };
}

export function getSortedPostsData(): PostData[] {
    const fileNames = fs.readdirSync(postsDirectory).filter((fileName) => fileName.endsWith('.md'));

    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        return { ...normalizePostData(id, data as Record<string, unknown>), contentHtml: '' };
    });

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
    return fs.readdirSync(postsDirectory)
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => ({ params: { id: fileName.replace(/\.md$/, '') } }));
}

export async function getPostData(id: string): Promise<PostData> {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const processedContent = await remark().use(html).process(matterResult.content);

    return {
        ...normalizePostData(id, matterResult.data as Record<string, unknown>),
        contentHtml: processedContent.toString(),
    };
}
