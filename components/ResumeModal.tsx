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
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                className="relative flex flex-col md:flex-row w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] rounded-2xl overflow-hidden"
                style={{ backgroundColor: '#1e1e1e' }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full"
                    style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#f2f2f2' }}
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Sidebar - horizontal on mobile, vertical on desktop */}
                <div className="flex flex-col items-center shrink-0 right-border-dashed md:w-72 px-6 pt-8 pb-6 md:p-8">
                    <div
                        className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden mt-2 md:mt-8"
                        style={{ border: '4px solid rgba(255,255,255,0.15)' }}
                    >
                        <Image
                            src="/images/about/profile-photo.JPG"
                            alt="Chris Xiong"
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <h2 className="mt-4 text-xl md:text-2xl font-bold" style={{ color: '#f2f2f2' }}>Chris Xiong</h2>
                    <p className="text-sm md:text-base" style={{ opacity: 0.7, color: '#f2f2f2' }}>Creative Developer</p>

                    {/* Contact info - horizontal on mobile */}
                    <div className="mt-5 w-full text-xs md:text-sm space-y-3" style={{ color: '#f2f2f2' }}>
                        <div className="flex items-center gap-2 bottom-border-dashed pb-3">
                            <Mail className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                            <span className="truncate">x2xcreative@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2 bottom-border-dashed pb-3">
                            <Phone className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                            <span>+61 666 666 666</span>
                        </div>
                        <div className="flex items-center gap-2 bottom-border-dashed pb-3">
                            <MapPin className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                            <span>Perth, WA, Australia</span>
                        </div>
                        <div className="flex items-center gap-2 bottom-border-dashed pb-3">
                            <Globe className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                            <span>www.x2xcreative.com.au</span>
                        </div>
                    </div>
                </div>

                {/* Main content - scrollable */}
                <div
                    className="flex-1 overflow-y-auto no-scrollbar px-5 py-6 md:p-8"
                    style={{ color: '#f2f2f2' }}
                >
                    <section className="mb-7">
                        <h3 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2 bottom-border-dashed pb-3">
                            About <span className="gradient-text">Me</span>
                        </h3>
                        <p className="text-sm md:text-base" style={{ lineHeight: 1.7 }}>
                            I'm a Web Developer with 6+ years of experience and a strong focus on React and Next.js.
                        </p>
                        <p className="text-sm md:text-base" style={{ lineHeight: 1.7 }}>
                            I build scalable, performance-focused web applications using modern frontend technologies, with experience integrating APIs, handling dynamic content, and optimizing UI/UX. I'm comfortable working in production environments and collaborating with designers and stakeholders to ship reliable features.
                        </p>
                        <p className="text-sm md:text-base" style={{ lineHeight: 1.7 }}>
                            I'm actively seeking opportunities as a Next.js / React Developer where I can contribute to real products and continue growing as an engineer.
                        </p>
                    </section>

                    <section className="mb-7">
                        <h3 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2 bottom-border-dashed pb-3">
                            Developing <span className="gradient-text">Skills</span>
                        </h3>
                        <div className="space-y-4">
                            <SkillsDisplay />
                        </div>
                    </section>

                    <section className="mb-7">
                        <h3 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2 bottom-border-dashed pb-3">
                            Working <span className="gradient-text">Experience</span>
                        </h3>
                        <div className="space-y-10 relative timeline mt-8 mb-8">
                            <div className="timeline-row">
                                <div className="timeline-time">2021 - Present</div>
                                <div className="timeline-content">
                                    <h4>Fullstack Developer</h4>
                                    <span>Signifi Media</span>
                                </div>
                            </div>
                            <div className="timeline-row">
                                <div className="timeline-time">2018 - 2021</div>
                                <div className="timeline-content">
                                    <h4>Fullstack Developer</h4>
                                    <span>Ad Impact</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-7">
                        <h3 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2 bottom-border-dashed pb-3">
                            Education <span className="gradient-text">Timeline</span>
                        </h3>
                        <div className="space-y-10 relative timeline mt-8 mb-8">
                            <div className="timeline-row">
                                <div className="timeline-time">2009 - 2012</div>
                                <div className="timeline-content">
                                    <h4>Edith Cowan University</h4>
                                    <span>Bachelor of Computer Science - Game Programming</span>
                                </div>
                            </div>
                            <div className="timeline-row">
                                <div className="timeline-time">2006 - 2009</div>
                                <div className="timeline-content">
                                    <h4>China University of Geosciences</h4>
                                    <span>Bachelor of Computer Science - Software Engineering</span>
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