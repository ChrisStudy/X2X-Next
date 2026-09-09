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
                    <section className="mt-14" aria-labelledby="featured-heading">
                        <div className="mb-6 flex items-end justify-between gap-6"><div><p className="blog-eyebrow">Start here</p><h2 id="featured-heading" className="mt-3 text-2xl font-semibold text-white">Featured insight</h2></div><span className="hidden text-sm text-zinc-500 sm:block">{allPostsData.length} articles</span></div>
                        <article className="blog-feature grid overflow-hidden lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
                            <Link href={`/blogs/${featuredPost.id}`} className="relative block min-h-48 overflow-hidden bg-zinc-900 lg:min-h-64">
                                <Image src={featuredPost.image} alt={featuredPost.title} fill priority className="object-cover transition-transform duration-700 hover:scale-105" sizes="(max-width: 1024px) 100vw, 35vw" />
                            </Link>
                            <div className="flex flex-col justify-center p-7 sm:p-9">
                                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-cyan-300"><span>{featuredPost.category}</span><span className="text-zinc-600">·</span><Date dateString={featuredPost.date} /></div>
                                <h3 className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-3xl">{featuredPost.title}</h3>
                                <p className="mt-4 max-w-2xl leading-7 text-zinc-400">{featuredPost.description}</p>
                                <Link href={`/blogs/${featuredPost.id}`} className="mt-6 inline-flex w-fit text-sm font-medium text-white">Read insight <span className="ml-2 text-cyan-300" aria-hidden="true">→</span></Link>
                            </div>
                        </article>
                    </section>
                ) : null}

                <section className="mt-16" aria-labelledby="more-insights-heading">
                    <div className="mb-6"><p className="blog-eyebrow">Explore the archive</p><h2 id="more-insights-heading" className="mt-3 text-2xl font-semibold text-white">More insights</h2></div>
                    <div className="grid gap-5 md:grid-cols-2">
                        {otherPosts.map((post) => (
                            <article key={post.id} className="blog-card grid overflow-hidden sm:grid-cols-[10rem_minmax(0,1fr)]">
                                <Link href={`/blogs/${post.id}`} className="relative block min-h-44 overflow-hidden bg-zinc-900 sm:min-h-full"><Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-700 hover:scale-105" sizes="(max-width: 640px) 100vw, 10rem" /></Link>
                                <div className="p-5"><div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.14em] text-cyan-300"><span>{post.category}</span><span className="text-zinc-600">·</span><Date dateString={post.date} /></div><h3 className="mt-3 text-xl font-semibold leading-tight text-white"><Link href={`/blogs/${post.id}`}>{post.title}</Link></h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400">{post.description}</p><Link href={`/blogs/${post.id}`} className="mt-4 inline-flex text-sm font-medium text-white">Read article <span className="ml-2 text-cyan-300" aria-hidden="true">→</span></Link></div>
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
