// ButtonLink.tsx
import Link from "next/link";

interface ButtonLinkProps {
    children: React.ReactNode;
    href: string;
    variant?: "primary" | "secondary";
    className?: string;
}

export default function ButtonLink({ children, href, variant = "primary", className = "" }: ButtonLinkProps) {
    const baseClasses = "button inline-block gradient px-90 py-2 rounded-full font-normal text-center border border-solid border-white/[.8] px-5 transition-colors";
    const variantClasses =
        variant === "primary"
            ? "text-white"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300";

    return (
        <Link href={href} className={`${baseClasses} ${variantClasses} ${className}`}>
            {children}
        </Link>
    );
}
