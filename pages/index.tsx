// pages/index.tsx
import ProjectsSection from "@/components/projects/ProjectsSection";
import type { GetStaticProps } from "next";
import Weather from "../components/Weather";
import { getWeather } from "../lib/weather";
import HomeHero from "../components/HomeHero";
import AboutSection from "@/components/AboutSection";
import { getSortedProjectsData, type ProjectData } from "@/lib/projects";;

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
    projects: ProjectData[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const weather = await getWeather();
    const projects = getSortedProjectsData();

    return {
        props: {
            weather,
            projects,
        },
        revalidate: 3600,
    };
};


export default function Home({ weather, projects  }: Props) {  // ← 正确接收参数
    return (
        <div
            className={`grid w-full h-full items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
        >
                <HomeHero />
                <AboutSection />
            <ProjectsSection projects={projects} />
            <Weather current={weather.current} today={weather.today} daily={weather.daily} />

        </div>
    );
}

Home.pageTitle = "X2X Creative - Best";
