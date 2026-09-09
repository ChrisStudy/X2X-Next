import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import { getAllPostIds, getPostData, getSortedPostsData } from "../../lib/blogs";
import Date from '../../components/date';
import Link from "next/link";
import Image from "next/image";
import SEO from '../../components/SEO';
import { NextPage } from "next";

type PageWithPageTitle = NextPage<InferGetStaticPropsType<typeof getStaticProps>> & { pageTitle?: string | ((props: InferGetStaticPropsType<typeof getStaticProps>) => string) };

export const getStaticPaths: GetStaticPaths = async () => ({ paths: getAllPostIds(), fallback: false });

export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params?.id as string;
    if (!id) return { notFound: true };
    const postData = await getPostData(id);
    return { props: { postData } };
};

function Post({ postData }: InferGetStaticPropsType<typeof getStaticProps>) {
    const description = postData.description;
    return (
        <>
            <SEO title={postData.title} description={description} image={postData.image} path={`/blogs/${postData.id}`} type="article" publishedTime={postData.date} keywords={[postData.category, "web development", "X2X Creative"]} />
            <main className="blog-article mx-auto max-w-5xl px-6 pb-24 pt-16 sm:px-10 lg:pt-24">
                <Link href="/blogs" className="blog-back">← Back to insights</Link>
                <header className="mt-10 max-w-4xl"><p className="blog-eyebrow">{postData.category}</p><h1 className="blog-display mt-5 text-balance">{postData.title}</h1><div className="mt-7 flex items-center gap-3 text-sm text-zinc-500"><Date dateString={postData.date} /><span aria-hidden="true">·</span><span>By Chris Xiong</span></div></header>
                <div className="relative mt-12 aspect-[16/8] overflow-hidden bg-zinc-900"><Image src={postData.image} alt="" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 1024px" /></div>
                <div className="blog-reading mx-auto mt-12 max-w-3xl" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                <section className="blog-cta mx-auto mt-16 flex max-w-3xl flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between"><div><p className="blog-eyebrow">Make your next move</p><h2 className="mt-3 text-2xl font-semibold text-white">Need a website that works harder?</h2></div><Link href="/contact" className="button gradient w-fit shrink-0">Let’s talk <span aria-hidden="true">→</span></Link></section>
            </main>
        </>
    );
}

(Post as PageWithPageTitle).pageTitle = (props) => props.postData.title;
export default Post;
