// components/WeatherIcons.tsx

type BaseIconProps = {
    size?: number;
};

/** 当前气温图标 */
export function TemperatureIcon({ size = 32 }: BaseIconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-400 animate-pulse"
        >
            <path d="M14 14.76V5a2 2 0 10-4 0v9.76a4 4 0 104 0z" />
            <circle cx="12" cy="18" r="1" fill="currentColor" />
        </svg>
    );
}

/** 风速图标 */
export function WindIcon({ size = 32 }: BaseIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-sky-300 animate-[wind_2s_ease-in-out_infinite]"
        >
            <style>{`
              @keyframes wind {
                0% { transform: translateX(0px); }
                50% { transform: translateX(4px); }
                100% { transform: translateX(0px); }
              }
            `}</style>

            <path d="M3 12h12a3 3 0 110 6" />
            <path d="M3 6h8a3 3 0 110 6" />
        </svg>
    );
}

/** 最高温图标 */
export function HighTempIcon({ size = 24 }: BaseIconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="currentColor"
            className="text-orange-400 animate-pulse"
        >
            <path d="M12 2s4 4 4 8a4 4 0 11-8 0c0-4 4-8 4-8z" />
        </svg>
    );
}

/** 最低温图标 */
export function LowTempIcon({ size = 24 }: BaseIconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="currentColor"
            className="text-blue-300 animate-pulse"
        >
            <text x="4" y="18" fontSize="16">
                ❄️
            </text>
        </svg>
    );
}

/** 通用云朵（你要的话可以在 7 天预报里用） */
export function CloudIcon({ size = 32 }: BaseIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className="text-gray-300 animate-[float_4s_ease-in-out_infinite]"
            fill="currentColor"
        >
            <style>{`
              @keyframes float {
                0% { transform: translateY(0); }
                50% { transform: translateY(-4px); }
                100% { transform: translateY(0); }
              }
            `}</style>
            <path d="M5 19h14a4 4 0 100-8 5 5 0 10-10 0 4 4 0 00-4 4z" />
        </svg>
    );
}

/** 👉 这是你原来的 WeatherIcon，改名叫 ConditionIcon 比较语义化 */
type ConditionIconProps = {
    code: number;
    size?: number;
};

export function ConditionIcon({ code, size = 48 }: ConditionIconProps) {
    const iconStyle = { width: size, height: size };

    const Sun = (
        <svg
            viewBox="0 0 24 24"
            style={iconStyle}
            className="animate-pulse text-yellow-300"
        >
            <circle cx="12" cy="12" r="5" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="1" x2="12" y2="4" />
                <line x1="12" y1="20" x2="12" y2="23" />
                <line x1="1" y1="12" x2="4" y2="12" />
                <line x1="20" y1="12" x2="23" y2="12" />
                <line x1="4" y1="4" x2="6" y2="6" />
                <line x1="18" y1="18" x2="20" y2="20" />
                <line x1="4" y1="20" x2="6" y2="18" />
                <line x1="18" y1="6" x2="20" y2="4" />
            </g>
        </svg>
    );

    const CloudSun = (
        <svg viewBox="0 0 24 24" style={iconStyle} className="text-yellow-300">
            <circle cx="7" cy="8" r="3" fill="currentColor" className="animate-pulse" />
            <path
                fill="currentColor"
                className="text-gray-300 animate-[pulse_3s_ease-in-out_infinite]"
                d="M12 20a4 4 0 110-8c.73 0 1.41.2 2 .54A4.5 4.5 0 1120 16c0 2.48-2.02 4-4.5 4H12z"
            />
        </svg>
    );

    const Cloud = (
        <svg
            viewBox="0 0 24 24"
            style={iconStyle}
            className="text-gray-300 animate-pulse"
        >
            <path
                fill="currentColor"
                d="M5 19h14a4 4 0 100-8 5 5 0 10-10 0 4 4 0 00-4 4z"
            />
        </svg>
    );

    const Rain = (
        <svg viewBox="0 0 24 24" style={iconStyle} className="text-blue-400">
            <path
                fill="currentColor"
                className="text-gray-300"
                d="M5 16h14a4 4 0 000-8 5 5 0 00-10 0 4 4 0 00-4 4z"
            />
            <g fill="currentColor">
                <circle cx="8" cy="20" r="1" className="animate-bounce" />
                <circle cx="12" cy="22" r="1" className="animate-bounce delay-200" />
                <circle cx="16" cy="20" r="1" className="animate-bounce delay-300" />
            </g>
        </svg>
    );

    const Thunder = (
        <svg viewBox="0 0 24 24" style={iconStyle} className="text-yellow-300">
            <path
                fill="currentColor"
                className="text-gray-300"
                d="M5 16h14a4 4 0 000-8 5 5 0 00-10 0 4 4 0 00-4 4z"
            />
            <polygon
                fill="currentColor"
                className="animate-pulse"
                points="12,13 10,19 14,15 12,21"
            />
        </svg>
    );

    const Fog = (
        <svg viewBox="0 0 24 24" style={iconStyle} className="text-gray-400">
            <line
                x1="4"
                y1="12"
                x2="20"
                y2="12"
                stroke="currentColor"
                strokeWidth="2"
            />
            <line
                x1="2"
                y1="16"
                x2="18"
                y2="16"
                stroke="currentColor"
                strokeWidth="2"
            />
            <line
                x1="6"
                y1="20"
                x2="22"
                y2="20"
                stroke="currentColor"
                strokeWidth="2"
            />
        </svg>
    );

    const Snow = (
        <svg
            viewBox="0 0 24 24"
            style={iconStyle}
            className="text-blue-200 animate-pulse"
        >
            <text x="5" y="17" fontSize="14">
                ❄️
            </text>
        </svg>
    );

    if (code === 0) return Sun;
    if (code === 1 || code === 2) return CloudSun;
    if (code === 3) return Cloud;
    if ([61, 63, 65, 80].includes(code)) return Rain;
    if (code === 95) return Thunder;
    if (code === 45 || code === 48) return Fog;
    if (code === 71) return Snow;

    return Cloud;
}

