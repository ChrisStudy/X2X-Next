// pages/index.tsx
import type { GetStaticProps } from "next";
import Weather from "../components/Weather";
import { getWeather } from "../lib/weather";
import HomeHero from "../components/HomeHero";
import AboutSection from "@/components/AboutSection";
import { getAllProjects, Project, buildCategories  } from "@/lib/projects";
import ProjectsSection from "@/components/projects/ProjectsSection";
type CategoryItem = { value: string; label: string };
type WeatherType = {
    current: {
        temperature: number;
        windspeed: number;
        weathercode: number;
    };
    today: {
        max: number;
        min: number;
        weathercode: number;
    };
    daily: {
        date: string;
        max: number;
        min: number;
        weathercode: number;
    }[];
};

type Props = {
    weather: WeatherType;
    projects: Project[];
    categories: CategoryItem[] ; // ✅ 新增 categories 类型
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const weather = await getWeather();
    const projects = await getAllProjects();
    const categories = buildCategories(projects);
    return {
        props: {
            weather,
            projects,
            categories , // ✅ 传 categories
        },
        revalidate: 3600,
    };
};

export default function Home({ weather, projects, categories }: Props) {
    return (
        <div className="grid w-full h-full items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <HomeHero />
            <AboutSection />
            <ProjectsSection projects={projects} categories={categories} />
            <Weather current={weather.current} today={weather.today} daily={weather.daily} />
        </div>
    );
}

Home.pageTitle = "X2X Creative - Best";

