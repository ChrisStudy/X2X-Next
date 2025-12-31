import { GetStaticProps } from "next";
import Link from "next/link";
import { getSortedPostsData, PostData } from "../../lib/blogs";
import Date from '../../components/date';
import styles from "@/styles/Home.module.css";

type Props = {
    allPostsData: PostData[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const allPostsData = getSortedPostsData();

    return {
        props: {
            allPostsData,
        },
    };
};

export default function BlogList({ allPostsData }: Props) {
    return (
        <div>

        <div className="flex flex-col items-center gap-6 text-left sm:items-start sm:text-left">
            <h1
                className={`${styles.title} max-w-xs text-left text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50`}
            >
                My Blog Posts
            </h1>

            <ul className="no-bullets text-left">
                {allPostsData.map(({ id, title, date }) => (
                    <li key={id} className="py-2">
                        <Link
                            href={`/blogs/${id}`}
                            className="hover-underline"
                        >
                            {title}
                        </Link>
                        <br />
                        <small className="text-gray-500 dark:text-gray-400"><Date dateString={date} /></small>
                    </li>
                ))}
            </ul>
        </div>
            <p className="mt-8">
                <Link href="/" className="hover-underline">
                    ← Back to Home
                </Link>
            </p>
        </div>
    );
}
BlogList.pageTitle = "Blog Posts";