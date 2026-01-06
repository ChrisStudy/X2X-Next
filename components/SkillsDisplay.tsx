"use client";

import { useState } from "react";
import { useSprings, animated } from "@react-spring/web";

type SkillCategory = "frontend" | "backend" | "server" | "tools";

const skills = [
    { name: "JavaScript (ES6+)", category: "frontend" },
    { name: "React", category: "frontend" },
    { name: "Next.js", category: "frontend" },
    { name: "Tailwind CSS", category: "frontend" },
    { name: "HTML5", category: "frontend" },
    { name: "CSS3", category: "frontend" },

    { name: "RESTful APIs", category: "backend" },
    { name: "PHP", category: "backend" },
    { name: "Laravel", category: "backend" },
    { name: "MySQL", category: "backend" },
    { name: "WordPress (ACF, CPT)", category: "backend" },
    { name: "Shopify", category: "backend" },
    { name: "Headless CMS", category: "backend" },

    { name: "Cloud Hosting", category: "server" },
    { name: "Cloudflare", category: "server" },
    { name: "Performance Optimization", category: "server" },

    { name: "Git & GitHub", category: "tools" },
    { name: "Mobile App Development (Hybrid/WebView)", category: "tools" },
];

export default function SkillsDisplay() {
    const [hovered, setHovered] = useState<number | null>(null);
    const [activeFilter, setActiveFilter] = useState<SkillCategory | "all">("all");

    const filteredSkills =
        activeFilter === "all"
            ? skills
            : skills.filter(skill => skill.category === activeFilter);

    const [springs, api] = useSprings(filteredSkills.length, idx => ({
        scale: 1,
        config: { mass: 1, tension: 250, friction: 25 },
    }));

    const handleHover = (idx: number | null) => {
        setHovered(idx);
        api.start(i => ({
            scale: i === idx ? 1.6 : 1,
        }));
    };

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex gap-3">
                {["all", "frontend", "backend", "server", "tools"].map(cat => (
                    <button
                        key={cat}
                        onClick={() => {
                            setHovered(null);
                            setActiveFilter(cat as any);
                        }}
                        className={`text-sm px-3 py-1 rounded-full transition
                            ${activeFilter === cat ? "gradient-bg text-white" : "opacity-60 hover:opacity-100"}`}
                    >
                        {cat.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap">
                {springs.map((style, idx) => (
                    <animated.span
                        key={filteredSkills[idx].name}
                        onMouseEnter={() => handleHover(idx)}
                        onMouseLeave={() => handleHover(null)}
                        style={{
                            transform: style.scale.to(s => `scale(${s})`),
                            color: hovered === idx ? "#ffffff" : undefined,
                        }}
                        className={`cursor-pointer select-none px-2 py-1 text-sm rounded-full transition-all duration-300
                            ${hovered === idx ? "text-white gradient-bg shadow-lg z-10" : ""}`}
                    >
                        {filteredSkills[idx].name}
                    </animated.span>
                ))}
            </div>
        </div>
    );
}
