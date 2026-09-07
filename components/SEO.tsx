import Head from "next/head";
import {
    absoluteUrl,
    buildArticleJsonLd,
    buildPersonJsonLd,
    buildWebPageJsonLd,
    buildWebsiteJsonLd,
    resolveSEO,
    type SEOConfig,
} from "@/lib/seo";

type SEOProps = SEOConfig & {
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export default function SEO(props: SEOProps) {
    const seo = resolveSEO(props);
    const path = props.path ?? "/";
    const canonical = absoluteUrl(path);

    const defaultJsonLd: Record<string, unknown>[] = [];

    if (path === "/") {
        defaultJsonLd.push(buildWebsiteJsonLd(), buildPersonJsonLd());
    } else if (seo.type === "article" && props.publishedTime) {
        defaultJsonLd.push(
            buildArticleJsonLd({
                title: props.title ?? seo.title,
                description: seo.description,
                path,
                publishedTime: props.publishedTime,
                modifiedTime: props.modifiedTime,
                image: seo.image,
            }),
        );
    } else {
        defaultJsonLd.push(
            buildWebPageJsonLd({
                title: seo.title,
                description: seo.description,
                path,
            }),
        );
    }

    const jsonLdItems = props.jsonLd
        ? Array.isArray(props.jsonLd)
            ? props.jsonLd
            : [props.jsonLd]
        : defaultJsonLd;

    return (
        <Head>
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            {seo.keywords?.length ? (
                <meta name="keywords" content={seo.keywords.join(", ")} />
            ) : null}
            <meta
                name="robots"
                content={seo.noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large"}
            />
            <meta name="author" content="Chris Xiong" />
            <link rel="canonical" href={canonical} />

            <meta property="og:type" content={seo.type} />
            <meta property="og:site_name" content="X2X Creative" />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={seo.image} />
            <meta property="og:locale" content="en_AU" />
            {props.publishedTime ? (
                <meta property="article:published_time" content={props.publishedTime} />
            ) : null}
            {props.modifiedTime ? (
                <meta property="article:modified_time" content={props.modifiedTime} />
            ) : null}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />

            {jsonLdItems.map((item, index) => (
                <script
                    key={`json-ld-${index}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
                />
            ))}
        </Head>
    );
}
