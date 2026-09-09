import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { getSortedPostsData, PostData } from "../../lib/blogs";
import Date from '../../components/date';
import SEO from '../../components/SEO';

type Props = { allPostsData: PostData[] };

export const getStaticProps: GetStaticProps<Props> = async () => ({
    props: { allPostsData: getSortedPostsData() },
});

export default function BlogList({ allPostsData }: Props) {
    const [featuredPost, ...otherPosts] = allPostsData;

    return (
        <>
            <SEO title="Insights & ideas" description="Practical insights on web development, performance, and building better digital experiences from X2X Creative." path="/blogs" keywords={["web development insights", "website performance", "Next.js blog", "creative developer"]} />
            <div className="blog-page mx-auto max-w-6xl px-6 pb-24 pt-16 sm:px-10 lg:pt-24">
                <header className="max-w-3xl">
                    <p className="blog-eyebrow">Insights & ideas</p>
                    <h1 className="blog-display mt-5 text-balance">Thoughtful work for the web.</h1>
                    <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">Notes on performance, technology, and the decisions that make digital products feel effortless.</p>
                </header>

                {featuredPost ? (
                    <section className="blog-feature mt-14 grid overflow-hidden lg:grid-cols-[1.1fr_0.9fr]" aria-labelledby="featured-heading">
                        <div className="relative min-h-72 overflow-hidden bg-zinc-900 lg:min-h-[27rem]">
                            <Image src={featuredPost.image} alt="" fill priority className="object-cover transition-transform duration-700 hover:scale-105" sizes="(max-width: 1024px) 100vw, 55vw" />
                        </div>
                        <div className="flex flex-col justify-center p-8 sm:p-12">
                            <p className="blog-eyebrow">Featured insight</p>
                            <h2 id="featured-heading" className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-4xl">{featuredPost.title}</h2>
                            <p className="mt-5 leading-7 text-zinc-400">{featuredPost.description}</p>
                            <div className="mt-7 flex items-center gap-3 text-sm text-zinc-500"><span>{featuredPost.category}</span><span aria-hidden="true">·</span><Date dateString={featuredPost.date} /></div>
                            <Link href={`/blogs/${featuredPost.id}`} className="button gradient mt-8 w-fit">Read the insight <span aria-hidden="true">→</span></Link>
                        </div>
                    </section>
                ) : null}

                <section className="mt-20" aria-labelledby="more-insights-heading">
                    <div className="flex items-end justify-between gap-6"><div><p className="blog-eyebrow">Explore the archive</p><h2 id="more-insights-heading" className="mt-3 text-2xl font-semibold text-white">More insights</h2></div><span className="hidden text-sm text-zinc-500 sm:block">{allPostsData.length} articles</span></div>
                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                        {otherPosts.map((post) => (
                            <article key={post.id} className="blog-card overflow-hidden">
                                <Link href={`/blogs/${post.id}`} className="block"><div className="relative aspect-[16/9] overflow-hidden bg-zinc-900"><Image src={post.image} alt="" fill className="object-cover transition-transform duration-700 hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" /></div><div className="p-6"><div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-cyan-300"><span>{post.category}</span><span className="text-zinc-600">·</span><Date dateString={post.date} /></div><h3 className="mt-4 text-2xl font-semibold leading-tight text-white">{post.title}</h3><p className="mt-3 leading-7 text-zinc-400">{post.description}</p><span className="mt-6 inline-flex text-sm font-medium text-white">Read article <span className="ml-2 text-cyan-300" aria-hidden="true">→</span></span></div></Link>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="blog-cta mt-20 flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12"><div><p className="blog-eyebrow">Have a project in mind?</p><h2 className="mt-3 max-w-xl text-3xl font-semibold text-white">Let’s turn a good idea into a useful experience.</h2></div><Link href="/contact" className="button gradient w-fit shrink-0">Start a conversation <span aria-hidden="true">→</span></Link></section>
            </div>
        </>
    );
}

BlogList.pageTitle = "Insights & ideas";
