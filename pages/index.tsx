// pages/index.tsx
import type { GetStaticProps } from "next";
import Weather from "../components/Weather";
import { getWeather } from "../lib/weather";
import HomeHero from "../components/HomeHero";
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
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const weather = await getWeather();
    return {
        props: {
            weather,
        },
        revalidate: 3600,
    };
};

export default function Home({ weather }: Props) {
    return (
        <div className="grid w-full h-full items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <HomeHero />
            <Weather current={weather.current} today={weather.today} daily={weather.daily} />
        </div>
    );
}

Home.pageTitle = "X2X Creative - Best";

