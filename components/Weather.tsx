// components/Weather.tsx
import {
    ConditionIcon,
    TemperatureIcon,
    WindIcon,
    HighTempIcon,
    LowTempIcon,
} from "./WeatherIcon";
type WeatherProps = {
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



export default function Weather({ current, today, daily }: WeatherProps) {

    const maxTemps = daily.map((d) => d.max).filter((v) => v != null);
    const globalMin = Math.min(...maxTemps);
    const globalMax = Math.max(...maxTemps);
    return (
        <div className="w-full rounded-2xl p-6 bg-zinc-900/70 border border-zinc-700 shadow-xl text-white">
            <h3 className="text-lg font-semibold mb-3">Perth Weather</h3>
            <div className="flex items-center gap-4 mb-6 w-full">
                <ConditionIcon code={current.weathercode} size={56} />
                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-sm font-bold">
                        <TemperatureIcon size={22} />
                        <span>{current.temperature.toFixed(1)}°C</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-zinc-300 mt-1">
                        <WindIcon size={22} />
                        <span>{current.windspeed.toFixed(1)} km/h</span>
                    </div>
                </div>

                <div className="flex-1 px-4">
                    <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-sky-400 via-emerald-300 to-amber-300"
                            style={{
                                width: `${today.max === today.min ? 30 : 100}%`,
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-col items-end text-sm font-medium">
                    <div className="flex items-center gap-1 text-amber-200">
                        <HighTempIcon size={16} />
                        <span>{today.max.toFixed(1)}°</span>
                    </div>
                    <div className="flex items-center gap-1 text-zinc-300">
                        <LowTempIcon size={16} />
                        <span>{today.min.toFixed(1)}°</span>
                    </div>
                </div>
            </div>



            <h3 className="text-lg font-semibold mb-3">Next 7 Days</h3>

            <div className="mt-2 flex gap-2 overflow-x-auto pb-1 sm:flex grid">
                {daily.map((day) => {
                    const d = new Date(day.date);
                    const weekday = d.toLocaleDateString("en-AU", { weekday: "short" }); // Mon
                    const labelDate = d.toLocaleDateString("en-AU", { month: "short", day: "numeric" }); // Dec 3

                    return (
                        <div
                            key={day.date}
                            className="flex sm:flex-col flex-column items-center justify-between rounded-2xl bg-zinc-900/80 px-3 py-2 min-w-[82px]"
                        >
                            <span className="text-xs text-zinc-400">{weekday}</span>
                            <span className="text-[10px] text-zinc-500 mb-1">{labelDate}</span>

                            <ConditionIcon code={day.weathercode} size={28} />

                            <div className="mt-1 text-xs text-center">
                                <div className="flex items-center gap-1 justify-center text-amber-200">
                                    <HighTempIcon size={14} />
                                    <span>{day.max.toFixed(1)}°</span>
                                </div>
                                <div className="flex items-center gap-1 justify-center text-zinc-300">
                                    <LowTempIcon size={14} />
                                    <span>{day.min.toFixed(1)}°</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>


        </div>
    );
}
