// pages/index.tsx
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "../styles/Home.module.css";
import { getSortedPostsData } from "../lib/blogs";
import Link from "next/link";
import type { GetStaticProps } from "next";
import Weather from "../components/Weather";
import { getWeather } from "../lib/weather";
import { Button } from 'flowbite-react';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

type PostData = {
    id: string;
    title: string;
    date: string;
};

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
    allPostsData: PostData[];
    weather: WeatherType;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const allPostsData = getSortedPostsData();
    const weather = await getWeather();

    return {
        props: {
            allPostsData,
            weather,
        },
        revalidate: 3600,
    };
};

export default function Home({ allPostsData, weather }: Props) {  // ← 正确接收参数
    return (
            <div className="flex flex-col items-center gap-6 text-left sm:items-start sm:text-left">

                <h1
                    className={`${styles.title} max-w-xs text-left text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50`}
                >
                    To get started, edit the index.tsx file.
                </h1>

                <h2 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                    Learn Next.js
                </h2>

                <p className="max-w-md text-left text-md leading-8 text-zinc-600 dark:text-zinc-400">
                    Looking for a starting point or more instructions? Head over to{" "}
                    <a
                        href="https://vercel.com/templates"
                        className="hover-underline font-medium text-zinc-950 dark:text-zinc-50"
                    >
                        Templates
                    </a>{" "}
                    or the{" "}
                    <a
                        href="https://nextjs.org/learn"
                        className="hover-underline font-medium text-zinc-950 dark:text-zinc-50"
                    >
                        Learning
                    </a>{" "}
                    center.
                </p>
                <Weather current={weather.current} today={weather.today} daily={weather.daily} />

            </div>
    );
}

Home.pageTitle = "X2X Creative - Best";
