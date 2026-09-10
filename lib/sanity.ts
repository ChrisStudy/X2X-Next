import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: process.env.NODE_ENV === 'production',
})

const builder = createImageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)

export type PostData = {
    id: string;
    title: string;
    date: string;
    description: string;
    image: string;
    category: string;
    body?: any;
};

const postFields = `
    "id": slug.current,
    title,
    date,
    description,
    category,
    "image": mainImage
`;

export async function getSortedPostsData(): Promise<PostData[]> {
    const posts = await client.fetch(`
        *[_type == "post"] | order(date desc) {
            ${postFields}
        }
    `);

    return posts.map((post: any) => ({
        ...post,
        date: post.date || new Date().toISOString(),
        image: post.image ? urlFor(post.image).width(1200).url() : `/images/blog/${post.id}.png`,
    }));
}

export async function getAllPostIds() {
    const slugs: string[] = await client.fetch(`*[_type == "post"].slug.current`);
    return slugs.map((id) => ({ params: { id } }));
}

export async function getPostData(id: string): Promise<PostData> {
    const post = await client.fetch(
        `*[_type == "post" && slug.current == $id][0] { ${postFields}, body }`,
        { id }
    );

    return {
        ...post,
        date: post.date || new Date().toISOString(),
        image: post.image ? urlFor(post.image).width(1600).url() : `/images/blog/${post.id}.png`,
    };
}