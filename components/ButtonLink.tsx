// ButtonLink.tsx
import Link from "next/link";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonLinkProps {
    children: React.ReactNode;
    href: string;
    variant?: "primary" | "secondary";
    className?: string;
    icon?: IconDefinition;
    width?: "auto" | "full";
    radius?: "full" | "rounded" | "none"; // 新增 border-radius
}

export default function ButtonLink({
                                       children,
                                       href,
                                       variant = "primary",
                                       className = "",
                                       icon,
                                       width = "auto",
                                       radius = "full", // 默认 9999px
                                   }: ButtonLinkProps) {
    const baseClasses =
        "button gradient py-2 font-normal text-center border border-solid border-white/[.8] transition-colors flex items-center gap-2 flex justify-center";

    const variantClasses =
        variant === "primary"
            ? "text-white"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300";

    const widthClass = width === "full" ? "w-full" : "w-auto";

    // 根据 radius 参数选择 Tailwind 类
    const radiusClass =
        radius === "full"
            ? "rounded-full"
            : radius === "rounded"
                ? "rounded-[15px]"
                : "rounded-none";

    return (
        <Link
            href={href}
            className={`${baseClasses} ${variantClasses} ${widthClass} ${radiusClass} ${className}`}
        >
            {icon && <FontAwesomeIcon icon={icon} />}
            {children}
        </Link>
    );
}


