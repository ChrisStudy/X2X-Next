import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import Layout from "@/components/layout";

// 允许 pageTitle 是 string 或 function
export type NextPageWithTitle<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
    pageTitle?: string | ((props: P) => string);
};

type AppPropsWithTitle = AppProps & {
    Component: NextPageWithTitle;
};

export default function App({ Component, pageProps }: AppPropsWithTitle) {
    let pageTitle: string;

    if (typeof Component.pageTitle === "function") {
        pageTitle = Component.pageTitle(pageProps);
    } else {
        pageTitle = Component.pageTitle ?? "Default Site Title";
    }

    return (
        <Layout title={pageTitle}>
            <Component {...pageProps} />
        </Layout>
    );
}

