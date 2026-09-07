export const SITE_CONFIG = {
    name: "X2X Creative",
    title: "X2X Creative | Web Developer & Creative Agency",
    description:
        "Chris Xiong is a creative web developer with 8+ years of experience building modern websites and applications. Based in Australia — portfolio and projects.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.x2xcreative.com.au",
    locale: "en_AU",
    defaultImage: "/logo.png",
    author: "Chris Xiong",
} as const;

export type SEOConfig = {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
    path?: string;
    noIndex?: boolean;
    type?: "website" | "article";
    publishedTime?: string;
    modifiedTime?: string;
};

export function absoluteUrl(path = "/"): string {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    return `${SITE_CONFIG.url}${normalized}`;
}

export function buildPageTitle(pageTitle?: string): string {
    if (!pageTitle) return SITE_CONFIG.title;
    return `${pageTitle} | ${SITE_CONFIG.name}`;
}

export function resolveSEO(partial: SEOConfig = {}): Required<
    Pick<SEOConfig, "title" | "description" | "image" | "path" | "noIndex" | "type">
> &
    Pick<SEOConfig, "keywords" | "publishedTime" | "modifiedTime"> {
    const path = partial.path ?? "/";
    const title = partial.title ? buildPageTitle(partial.title) : SITE_CONFIG.title;

    return {
        title,
        description: partial.description ?? SITE_CONFIG.description,
        keywords: partial.keywords,
        image: absoluteUrl(partial.image ?? SITE_CONFIG.defaultImage),
        path,
        noIndex: partial.noIndex ?? false,
        type: partial.type ?? "website",
        publishedTime: partial.publishedTime,
        modifiedTime: partial.modifiedTime,
    };
}

export function buildWebsiteJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
        description: SITE_CONFIG.description,
        author: {
            "@type": "Person",
            name: SITE_CONFIG.author,
            url: absoluteUrl("/about"),
        },
    };
}

export function buildPersonJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: SITE_CONFIG.author,
        url: absoluteUrl("/about"),
        jobTitle: "Creative Web Developer",
        worksFor: {
            "@type": "Organization",
            name: SITE_CONFIG.name,
            url: SITE_CONFIG.url,
        },
    };
}

export function buildArticleJsonLd(options: {
    title: string;
    description: string;
    path: string;
    publishedTime: string;
    modifiedTime?: string;
    image?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: options.title,
        description: options.description,
        url: absoluteUrl(options.path),
        datePublished: options.publishedTime,
        dateModified: options.modifiedTime ?? options.publishedTime,
        image: options.image ?? absoluteUrl(SITE_CONFIG.defaultImage),
        author: {
            "@type": "Person",
            name: SITE_CONFIG.author,
            url: absoluteUrl("/about"),
        },
        publisher: {
            "@type": "Organization",
            name: SITE_CONFIG.name,
            logo: {
                "@type": "ImageObject",
                url: absoluteUrl(SITE_CONFIG.defaultImage),
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": absoluteUrl(options.path),
        },
    };
}

export function buildWebPageJsonLd(options: {
    title: string;
    description: string;
    path: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: options.title,
        description: options.description,
        url: absoluteUrl(options.path),
        isPartOf: {
            "@type": "WebSite",
            name: SITE_CONFIG.name,
            url: SITE_CONFIG.url,
        },
    };
}

export function truncateDescription(text: string, maxLength = 160): string {
    const cleaned = text.replace(/\s+/g, " ").trim();
    if (cleaned.length <= maxLength) return cleaned;
    return `${cleaned.slice(0, maxLength - 1).trimEnd()}…`;
}

export const PAGE_SEO: Record<string, SEOConfig> = {
    "/": {
        title: "Home",
        description:
            "Welcome to X2X Creative — Chris Xiong, a creative developer, programmer, and freelancer building modern web experiences in Australia.",
        keywords: [
            "web developer",
            "creative developer",
            "freelancer",
            "Australia",
            "Next.js",
            "React",
        ],
    },
    "/about": {
        title: "About Me",
        description:
            "Learn about Chris Xiong, a web developer with 8+ years of experience creating modern, reliable websites and applications.",
        keywords: ["Chris Xiong", "web developer", "about", "portfolio"],
    },
    "/myproject": {
        title: "My Projects",
        description:
            "Explore web development projects by Chris Xiong — modern apps, creative builds, and production-ready solutions.",
        keywords: ["web projects", "portfolio", "Next.js projects", "React apps"],
    },
    "/contact": {
        title: "Contact",
        description:
            "Get in touch with Chris Xiong for freelance web development, project inquiries, or collaboration opportunities.",
        keywords: ["contact", "hire web developer", "freelance developer Australia"],
    },
};
