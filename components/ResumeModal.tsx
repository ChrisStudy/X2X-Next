import Image from "next/image";
import { X, Mail, Phone, MapPin, Globe } from "lucide-react";
import SkillsDisplay from "@/components/SkillsDisplay";

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 overflow-hidden"
            style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                className="relative flex flex-col md:flex-row w-full max-w-5xl
                            h-[92vh] sm:h-auto sm:max-h-[90vh]
                            rounded-t-3xl sm:rounded-2xl overflow-hidden"
                style={{ backgroundColor: '#1e1e1e' }}
            >
                {/* Mobile drag handle */}
                <div className="flex justify-center pt-3 pb-1 md:hidden shrink-0">
                    <div className="w-10 h-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                </div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full md:top-4 md:left-4 md:right-auto"
                    style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#f2f2f2' }}
                >
                    <X className="w-4 h-4" />
                </button>

                {/* ── MOBILE HEADER (hidden on md+) ── */}
                <div className="md:hidden flex items-center gap-4 px-5 pt-2 pb-4 shrink-0"
                     style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0"
                         style={{ border: '2px solid rgba(255,255,255,0.15)' }}>
                        <Image
                            src="/images/about/profile-photo.JPG"
                            alt="Chris Xiong"
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h2 className="text-lg font-bold leading-tight" style={{ color: '#f2f2f2' }}>Chris Xiong</h2>
                        <p className="text-xs" style={{ opacity: 0.6, color: '#f2f2f2' }}>Creative Developer</p>
                        {/* Icon row */}
                        <div className="flex items-center gap-3 mt-2">
                            <a href="mailto:x2xcreative@gmail.com" className="p-1.5 rounded-md" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                                <Mail className="w-3.5 h-3.5" style={{ color: '#a78bfa' }} />
                            </a>
                            <a href="tel:+61666666666" className="p-1.5 rounded-md" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                                <Phone className="w-3.5 h-3.5" style={{ color: '#a78bfa' }} />
                            </a>
                            <span className="p-1.5 rounded-md" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                                <MapPin className="w-3.5 h-3.5" style={{ color: '#a78bfa' }} />
                            </span>
                            <a href="https://www.x2xcreative.com.au" target="_blank" rel="noreferrer" className="p-1.5 rounded-md" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                                <Globe className="w-3.5 h-3.5" style={{ color: '#a78bfa' }} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* ── DESKTOP SIDEBAR (hidden on mobile) ── */}
                <div className="hidden md:flex flex-col items-center shrink-0 right-border-dashed w-72 p-8">
                    <div
                        className="w-32 h-32 rounded-full overflow-hidden mt-8"
                        style={{ border: '4px solid rgba(255,255,255,0.15)' }}
                    >
                        <Image
                            src="/images/about/profile-photo.jpg"
                            alt="Chris Xiong"
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="mt-6 text-2xl font-bold" style={{ color: '#f2f2f2' }}>Chris Xiong</h2>
                    <p style={{ opacity: 0.7, color: '#f2f2f2' }}>Creative Developer</p>
                    <div className="mt-8 space-y-4 w-full text-sm" style={{ color: '#f2f2f2' }}>
                        <div className="flex items-center gap-3 bottom-border-dashed pb-4">
                            <Mail className="w-4 h-4 shrink-0" />
                            <span className="truncate">x2xcreative@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-3 bottom-border-dashed pb-4">
                            <Phone className="w-4 h-4 shrink-0" />
                            <span>+61 666 666 666</span>
                        </div>
                        <div className="flex items-center gap-3 bottom-border-dashed pb-4">
                            <MapPin className="w-4 h-4 shrink-0" />
                            <span>Perth, WA, Australia</span>
                        </div>
                        <div className="flex items-center gap-3 bottom-border-dashed pb-4">
                            <Globe className="w-4 h-4 shrink-0" />
                            <span>www.x2xcreative.com.au</span>
                        </div>
                    </div>
                </div>

                {/* ── MAIN CONTENT ── */}
                <div
                    className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar px-5 py-5 md:p-8"
                    style={{ color: '#f2f2f2' }}
                >
                    <section className="mb-6 md:mb-8">
                        <h3 className="text-lg md:text-2xl font-bold mb-3 flex items-center gap-2 bottom-border-dashed pb-3">
                            About <span className="gradient-text">Me</span>
                        </h3>
                        <div className="text-sm md:text-base space-y-2" style={{ lineHeight: 1.7, opacity: 0.85 }}>
                            <p>I'm a Web Developer with 6+ years of experience and a strong focus on React and Next.js.</p>
                            <p>I build scalable, performance-focused web applications using modern frontend technologies, with experience integrating APIs, handling dynamic content, and optimizing UI/UX.</p>
                            <p>I'm actively seeking opportunities as a Next.js / React Developer where I can contribute to real products and continue growing as an engineer.</p>
                        </div>
                    </section>

                    <section className="mb-6 md:mb-8">
                        <h3 className="text-lg md:text-2xl font-bold mb-3 flex items-center gap-2 bottom-border-dashed pb-3">
                            Developing <span className="gradient-text">Skills</span>
                        </h3>
                        <SkillsDisplay />
                    </section>

                    <section className="mb-6 md:mb-8">
                        <h3 className="text-lg md:text-2xl font-bold mb-3 flex items-center gap-2 bottom-border-dashed pb-3">
                            Working <span className="gradient-text">Experience</span>
                        </h3>
                        <div className="space-y-8 relative timeline mt-6 mb-6">
                            <div className="timeline-row">
                                <div className="timeline-time">2021 – Present</div>
                                <div className="timeline-content">
                                    <h4>Fullstack Developer</h4>
                                    <span>Signifi Media</span>
                                </div>
                            </div>
                            <div className="timeline-row">
                                <div className="timeline-time">2018 – 2021</div>
                                <div className="timeline-content">
                                    <h4>Fullstack Developer</h4>
                                    <span>Ad Impact</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-6 md:mb-8">
                        <h3 className="text-lg md:text-2xl font-bold mb-3 flex items-center gap-2 bottom-border-dashed pb-3">
                            Education <span className="gradient-text">Timeline</span>
                        </h3>
                        <div className="space-y-8 relative timeline mt-6 mb-6">
                            <div className="timeline-row">
                                <div className="timeline-time">2009 – 2012</div>
                                <div className="timeline-content">
                                    <h4>Edith Cowan University</h4>
                                    <span>Bachelor of Computer Science – Game Programming</span>
                                </div>
                            </div>
                            <div className="timeline-row">
                                <div className="timeline-time">2006 – 2009</div>
                                <div className="timeline-content">
                                    <h4>China University of Geosciences</h4>
                                    <span>Bachelor of Computer Science – Software Engineering</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ResumeModal;