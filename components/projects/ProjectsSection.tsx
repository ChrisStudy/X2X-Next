// components/projects/ProjectsSection.tsx
import Link from "next/link";

type Project = {
    id: string;
    title: string;
};

type Props = {
    projects: Project[];
};

export default function ProjectsSection({ projects }: Props) {
    return (
        <section id="projects" className="max-w-5xl mx-auto py-20">
            <h2 className="text-3xl font-bold mb-8">Projects</h2>

            <div className="grid gap-6 sm:grid-cols-2">
                {projects.map((project) => (
                    <Link
                        key={project.id}
                        href={`/projects/${project.id}`}
                        className="block p-6 border rounded-lg hover:shadow"
                    >
                        <h3 className="text-xl font-semibold">
                            {project.title}
                        </h3>
                    </Link>
                ))}
            </div>
        </section>
    );
}
