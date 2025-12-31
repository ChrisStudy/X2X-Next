import Header from "./header";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import styles from '../components/layout.module.css';
import Link from 'next/link';
import {Geist, Geist_Mono} from "next/font/google";
type LayoutProps = {
    children: ReactNode;
    title?: string; // optional per-page title
    home?: boolean; // ✅ mark it optiona
};
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});
const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});
export default function Layout({ children, title , home }: LayoutProps) {
    const router = useRouter();
    const isHome = router.pathname === "/";
    return (
        <div className="flex dark flex-col">
            <Header title={title} />
            <main className="flex-col w-full mx-auto p-4">
                <div
                    className={`${geistSans.className} ${geistMono.className} flex min-h-max items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
                >
                    <main className="flex  w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

                {children}
                        {!isHome && (
                            <div className={styles.backToHome}>
                                <Link className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
                                      href="/">← Back to home</Link>
                            </div>
                        )}
                    </main>
                </div>
            </main>
        </div>
    );
}