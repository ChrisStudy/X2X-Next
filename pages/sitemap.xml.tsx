import type { GetServerSideProps } from "next";
import { absoluteUrl } from "@/lib/seo";

const STATIC_PATHS = ["/", "/about", "/myproject", "/contact"];

function generateSiteMap() {
    const lastmod = new Date().toISOString();

    const urls = STATIC_PATHS
        .map((path) => {
            const priority = path === "/" ? "1.0" : "0.8";
            const changefreq = path === "/" ? "weekly" : "monthly";

            return `  <url>
    <loc>${absoluteUrl(path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
        })
        .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    if (!res) {
        return { props: {} };
    }

    res.setHeader("Content-Type", "text/xml; charset=utf-8");
    res.setHeader(
        "Cache-Control",
        `public, s-maxage=${60 * 60 * 24}, stale-while-revalidate=${60 * 60 * 12}`,
    );
    res.write(generateSiteMap());
    res.end();

    return { props: {} };
};

export default function SiteMap() {
    return null;
}
