// pages/blogs/[id].tsx
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import { getAllPostIds, getPostData } from "../../lib/blogs";
import Date from '../../components/date';
import Link from "next/link";
import { NextPage } from "next";
type Props = {
    postData: {
        id: string;
        title: string;
        date: string;
        contentHtml: string;
    };
};

type PageWithPageTitle = NextPage<Props> & {
    pageTitle?: (props: Props) => string;
};
export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds(); // [{ params: { id: 'pre-rendering' } }, ...]
    return {
        paths,
        fallback: false, // non-existing id -> 404
    };
};

export const getStaticProps: GetStaticProps<
    { postData: { id: string; title: string; date: string; contentHtml: string } }
> = async (context) => {
    const id = context.params?.id as string;
    if (!id) {
        return { notFound: true };
    }

    const postData = await getPostData(id); // 确保 getPostData 返回 contentHtml 是 string
    return {
        props: {
            postData,
        },
    };
};

export default function Post({
                                 postData,
                             }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
            <article className="prose dark:prose-invert max-w-2xl mx-auto py-10">
                <h1>{postData.title}</h1>
                <div className="text-sm text-gray-500 mb-6">
                    <Date dateString={postData.date} />
                </div>


                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />

                <p className="mt-8">
                    <Link href="/blogs" className="hover-underline">
                        ← Back to blogs
                    </Link>
                </p>
            </article>
    );
}
(Post as PageWithPageTitle).pageTitle = (props) => props.postData.title
