// ChatLink.tsx
import Link from "next/link";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ChatLinkProps {
    children: React.ReactNode;
    href: string;
    title: string;
    icon?: IconDefinition;
    className?: string;
}

export default function ChatLink({
                                       children,
                                       href,
                                       icon,
                                       className,
                                       title,
                                   }: ChatLinkProps) {
    const baseClasses =
        "flex items-center justify-start gap-x-2 p-2";

    return (
        <Link
            href={href}
            className={`${baseClasses}  ${className || ""}`}
        >
            {icon && <FontAwesomeIcon icon={icon} />}
            <span title={title} className={'text-ellipsis overflow-hidden whitespace-nowrap line-clamp-1'}>
                {children}
            </span>
        </Link>
    );
}

