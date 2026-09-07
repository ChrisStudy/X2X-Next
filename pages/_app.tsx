import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import Layout from "@/components/layout";
import { PAGE_SEO, type SEOConfig } from "@/lib/seo";
import { useRouter } from "next/router";

export type NextPageWithTitle<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
    pageTitle?: string | ((props: P) => string);
    pageSEO?: SEOConfig | ((props: P) => SEOConfig);
};

type AppPropsWithTitle = AppProps & {
    Component: NextPageWithTitle;
};

function resolvePageValue<T>(
    value: T | ((props: AppProps["pageProps"]) => T) | undefined,
    pageProps: AppProps["pageProps"],
): T | undefined {
    if (typeof value === "function") {
        return (value as (props: AppProps["pageProps"]) => T)(pageProps);
    }
    return value;
}

export default function App({ Component, pageProps }: AppPropsWithTitle) {
    const router = useRouter();
    const pageTitle = resolvePageValue(Component.pageTitle, pageProps);
    const pageSEO = resolvePageValue(Component.pageSEO, pageProps);
    const routeSEO = PAGE_SEO[router.pathname];

    const seo: SEOConfig = {
        ...routeSEO,
        ...pageSEO,
        title: pageSEO?.title ?? pageTitle ?? routeSEO?.title,
        path: pageSEO?.path ?? router.asPath.split("?")[0].split("#")[0],
    };

    if (router.pathname.startsWith("/chats") || router.pathname === "/404") {
        seo.noIndex = true;
    }

    return (
        <Layout title={pageTitle} seo={seo}>
            <Component {...pageProps} />
        </Layout>
    );
}
