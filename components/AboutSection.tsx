import { useState } from "react";
import ResumeModal from "@/components/ResumeModal";

const AboutSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="about min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
                {/* Particle effect at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30">
                        <svg className="w-full h-full" viewBox="0 0 1920 200" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                                    <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                                </linearGradient>
                            </defs>
                            <path
                                d="M0,100 Q480,50 960,100 T1920,100 V200 H0 Z"
                                fill="url(#waveGradient)"
                            />
                        </svg>
                    </div>
                    {/* Dot particles */}
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-primary/40"
                            style={{
                                left: `${Math.random() * 100}%`,
                                bottom: `${Math.random() * 100}px`,
                                opacity: Math.random() * 0.5 + 0.2,
                            }}
                        />
                    ))}
                </div>

                <div className="container max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        {/* Profile Image */}
                        <div className="relative flex-shrink-0 animate-fade-in">
                            <div className="w-72 h-80 lg:w-80 lg:h-96 rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/10">
                                <img
                                    src='images/profile-photo.jpg'
                                    alt="Chris Xiong"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                            {/* Decorative corner */}
                            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-r-2 border-b-2 border-primary/30 rounded-br-2xl" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-center lg:text-left animate-slide-up">
                            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-4">
                                <span className="text-foreground primary-font-color ">Chris </span>
                                <span className="gradient-text text-primary">XIONG</span>
                            </h1>

                            <p className="text-xl lg:text-2xl text-foreground/90 mb-8">
                                Creative <span className="gradient-text font-semibold">Developer</span>
                            </p>

                            <div className="w-16 h-px bg-border mb-8 mx-auto lg:mx-0" />

                            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mb-10">
                                My name is <span className="text-foreground font-medium gradient-text">Chris Xiong</span>. I am a web developer with over 6 years of professional experience. I focus on building modern, reliable websites and applications using current web technologies.
                            </p>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg transition-all duration-300 hover:bg-coral-glow hover:shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95 button inline-block gradient px-90 py-2 rounded-full font-normal text-center border border-solid border-white/[.8] px-5 transition-colors text-white "
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <ResumeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default AboutSection;


