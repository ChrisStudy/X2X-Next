'use client';

import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { initFlowbite } from 'flowbite';

import layoutStyles from '../components/layout.module.css';

interface HeaderProps {
    title?: string;
}

export default function Header({ title }: HeaderProps) {
    const pathname = usePathname();

    // ✅ IMPORTANT: initialize Flowbite on client
    useEffect(() => {
        initFlowbite();
    }, []);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{title ?? 'X2X Creative - Best'}</title>
                <meta name="description" content="My awesome site" />
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <header className={`${layoutStyles.header} main-header h-* w-full mx-auto p-10`}>
                <nav className="bg-neutral-primary w-full z-20 top-0 start-0  border-default">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">

                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <Image
                                src="/logo.png"
                                alt="X2X Creative Logo"
                                width={300}
                                height={99}
                                priority
                                className="h-30 w-auto"
                            />
                        </Link>

                        {/* Mobile toggle button (Flowbite controlled) */}
                        <button
                            data-collapse-toggle="navbar-default"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
                            aria-controls="navbar-default"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    d="M5 7h14M5 12h14M5 17h14"
                                />
                            </svg>
                        </button>

                        {/* Collapsible menu (Flowbite controlled) */}
                        <div
                            className="hidden w-full md:block md:w-auto"
                            id="navbar-default"
                        >
                            <ul className="no-bullets font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                                {[
                                    { href: '/', label: 'Home' },
                                    { href: '/about', label: 'About Me' },
                                    { href: '/blogs', label: 'Blogs' },
                                    { href: '/contact', label: 'Contact' },
                                ].map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={`block py-2 px-3 rounded md:bg-transparent md:p-0 ${
                                                pathname === link.href
                                                    ? 'text-white font-semibold'
                                                    : 'text-gray-300 hover:text-white'
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </nav>
            </header>
        </>
    );
}

