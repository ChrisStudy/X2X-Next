"use client";

import { useEffect, useState } from "react";
import ButtonLink from "./ButtonLink";

const words = ["Developer", "Programmer", "Freelancer"];
// const words = ["Programmer"];
const ROTATE_DURATION = 800;
const DISPLAY_DURATION = 2000;

export default function HomeHero() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const loop = () => {
            timeout = setTimeout(() => {
                setIndex((prev) => (prev + 1) % words.length);
                loop();
            }, DISPLAY_DURATION);
        };

        loop();

        return () => clearTimeout(timeout);
    }, []);

    return (
        <section className="relative min-h-[100svh] md:min-h-[70vh] bg-zinc-50 font-sans dark:bg-black">
            <div className="flex flex-col items-center text-center gap-10 pt-[20vh] md:pt-[15vh]">
                <h1 className="text-5xl font-medium uppercase text-black dark:text-white">
                    Chris Xiong
                </h1>

                <h2 className="text-2xl font-normal text-white gap-1">
                    Creative{" "}
                    <span
                        className="relative inline-block h-[1.2em] align-top"
                        style={{ perspective: "600px", minWidth: "11ch" }} // ←固定最宽宽度
                    >
                        {/* 所有单词占位，保证最宽撑开 */}
                        <span className="invisible whitespace-nowrap">
                              {words.reduce((a, b) => (a.length > b.length ? a : b))}
                            </span>

                                                {words.map((word, i) => {
                                                    const isActive = i === index;
                                                    const isPrev = i === (index - 1 + words.length) % words.length;

                                                    return (
                                                        <span
                                                            key={word}
                                                            className="absolute left-1/2 top-0 gradient-text whitespace-nowrap"
                                                            style={{
                                                                transform: isActive
                                                                    ? "translateX(-50%) rotateX(0deg)"
                                                                    : isPrev
                                                                        ? "translateX(-50%) rotateX(90deg)"
                                                                        : "translateX(-50%) rotateX(-90deg)",
                                                                opacity: isActive ? 1 : 0,
                                                                transition: `opacity ${ROTATE_DURATION / 2}ms ease-in-out ${ROTATE_DURATION / 2}ms, transform ${ROTATE_DURATION}ms ease-in-out`,
                                                                transformOrigin: "center center",
                                                            }}
                                                        >
                                  {word}
                                </span>
                                                    );
                                                })}
                          </span>
                </h2>


                <div className="cta-group flex justify-center gap-6">
                    <ButtonLink href="/about">Go to About</ButtonLink>
                    <ButtonLink href="https://google.com" variant="secondary">
                        External Link
                    </ButtonLink>
                </div>
            </div>
        </section>
    );

}



