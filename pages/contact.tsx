import Weather from "../components/Weather";
import { getWeather } from "../lib/weather";
import type { GetStaticProps } from "next";
import ContactForm from "../components/ContactForm";

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

const Contact = ({ weather }: Props) => {
    return (
        <div className="rid w-full h-full items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            {/* Geometric background pattern (similar to your other pages) */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-20">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        Get In{" "}
                        <span className="gradient-text bg-clip-text text-transparent">
                            Touch
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Have a project in mind or just want to say hello? Feel free to reach out.
                        I'll get back to you as soon as possible.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Left Side - Contact Form */}
                    <div className="order-2 lg:order-1">
                        <ContactForm />
                    </div>

                    {/* Right Side - Contact Info & Weather */}
                    <div className="order-1 lg:order-2 space-y-8">
                        {/* Contact Information */}
                        {/* Weather Widget */}
                        <Weather
                            current={weather.current}
                            today={weather.today}
                            daily={weather.daily}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

Contact.pageTitle = "Contact";

export default Contact;