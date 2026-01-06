import Image from "next/image";
import { X, Mail, Phone, MapPin, Globe, Calendar, Briefcase, GraduationCap } from "lucide-react";
import SkillsDisplay from "@/components/SkillsDisplay";

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
    if (!isOpen) return null;

    const skills = [
        { name: "Adobe Photoshop", level: 95 },
        { name: "Illustrator", level: 90 },
        { name: "Figma", level: 85 },
        { name: "HTML/CSS", level: 80 },
        { name: "JavaScript", level: 70 },
    ];

    return (
        <div
            className="resumeme fixed inset-0 z-50 flex items-center justify-center p-4 "
            style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
        >
            <div
                className="relative flex max-w-5xl w-full max-h-[90vh] rounded-2xl overflow-hidden px-[40px] py-[50px]"
                style={{ backgroundColor: '#1e1e1e' }}
            >
                {/* 左侧 Sidebar - 珊瑚色背景 */}
                <div
                    className="w-72 p-8 flex flex-col items-center shrink-0 right-border-dashed"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 left-4 p-2 rounded-full"
                        style={{ color: '#141414' }}
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div
                        className="w-32 h-32 rounded-full overflow-hidden mt-8"
                        style={{ border: '4px solid rgba(20,20,20,0.3)' }}
                    >
                        <Image
                            src="/images/profile-photo.jpg"
                            alt="Chris Xiong"
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <h2 className="mt-6 text-2xl font-bold">Chris Xiong</h2>
                    <p style={{ opacity: 0.8 }}>Creative Developer</p>

                    <div className="mt-8 space-y-4 w-full text-sm">
                        <div className="flex items-center gap-3 bottom-border-dashed pb-4">
                            <Mail className="w-4 h-4" />
                            <span>david@example.com</span>
                        </div>
                        <div className="flex items-center gap-3 bottom-border-dashed pb-4">
                            <Phone className="w-4 h-4" />
                            <span>+1 234 567 890</span>
                        </div>
                        <div className="flex items-center gap-3 bottom-border-dashed pb-4">
                            <MapPin className="w-4 h-4" />
                            <span>New York, USA</span>
                        </div>
                        <div className="flex items-center gap-3 bottom-border-dashed pb-4">
                            <Globe className="w-4 h-4" />
                            <span>www.davidparker.com</span>
                        </div>
                    </div>
                </div>

                {/* 右侧内容 */}
                <div className="flex-1 p-8 overflow-y-auto no-scrollbar scroll-smooth scroll-fade-right" style={{ color: '#f2f2f2' }}>
                    <section className="mb-8">
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 bottom-border-dashed pb-4">
                            About <span className="gradient-text">Me</span>
                        </h3>
                        <p style={{  lineHeight: 1.7 }}>
                            I’m a Web Developer with 6+ years of experience and a strong focus on React and Next.js.
                        </p>
                        <p style={{  lineHeight: 1.7 }}>
                            I build scalable, performance-focused web applications using modern frontend technologies, with experience integrating APIs, handling dynamic content, and optimizing UI/UX. I’m comfortable working in production environments and collaborating with designers and stakeholders to ship reliable features.
                        </p>
                        <p style={{ lineHeight: 1.7 }}>
                            I’m actively seeking opportunities as a Next.js / React Developer where I can contribute to real products and continue growing as an engineer.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 bottom-border-dashed pb-4">
                            Developing <span className="gradient-text">Skills</span>
                        </h3>
                        <div className="space-y-4">
                            <SkillsDisplay />
                        </div>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 bottom-border-dashed pb-4">
                            Working <span className="gradient-text">Experience</span>
                        </h3>
                        <div className="space-y-6 relative timeline mt-10 mb-10">
                            <div className="space-y-10 relative timeline">
                                <div className="timeline-row">
                                    <div className="timeline-time">2021 - Present</div>
                                    <div className="timeline-content">
                                        <h4>Frontend Developer</h4>
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

                        </div>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 bottom-border-dashed pb-4">
                            Education <span className="gradient-text">Timeline</span>
                        </h3>
                        <div className="space-y-6 relative timeline mt-10 mb-10">
                            <div className="space-y-10 relative timeline">
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

                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ResumeModal;
