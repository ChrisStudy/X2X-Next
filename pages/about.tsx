import AboutSection from "@/components/AboutSection";


const About = () => {
    return (
        <div className="grid w-full h-full items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <AboutSection />
        </div>
    );
};

// ✅ Add this static property for the Layout/Header to use
About.pageTitle = "About Me";

export default About;