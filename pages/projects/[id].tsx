// pages/projects/[id].tsx
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import { getAllProjectIds, getProjectData } from "@/lib/projects";
import Date from "../../components/date";
import Link from "next/link";
import { NextPage } from "next";

type Props = {
    projectData: {
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
    const paths = getAllProjectIds(); // [{ params: { id: 'project-one' } }, ...]
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<{
    projectData: {
        id: string;
        title: string;
        date: string;
        contentHtml: string;
    };
}> = async (context) => {
    const id = context.params?.id as string;

    if (!id) {
        return { notFound: true };
    }

    const projectData = await getProjectData(id);

    return {
        props: {
            projectData,
        },
    };
};

export default function Project({
                                    projectData,
                                }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <article className="prose dark:prose-invert max-w-2xl mx-auto py-10">
            <h1>{projectData.title}</h1>

            <div className="text-sm text-gray-500 mb-6">
                <Date dateString={projectData.date} />
            </div>

            <div dangerouslySetInnerHTML={{ __html: projectData.contentHtml }} />

            <p className="mt-8">
                <Link href="/projects" className="hover-underline">
                    ← Back to projects
                </Link>
            </p>
        </article>
    );
}

(Project as PageWithPageTitle).pageTitle = (props) =>
    props.projectData.title;
