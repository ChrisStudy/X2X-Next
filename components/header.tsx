'use client';

import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import layoutStyles from '../components/layout.module.css';

interface HeaderProps {
    title?: string;
}

export default function Header({ title }: HeaderProps) {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Sticky on scroll
    useEffect(() => {
        const header = document.querySelector('.main-header');

        const onScroll = () => {
            if (window.scrollY > 80) {
                header?.classList.add('is-sticky');
            } else {
                header?.classList.remove('is-sticky');
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [mobileMenuOpen]);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Me' },
        { href: '/myproject', label: 'My Projects' },
        { href: '/chats', label: 'X2X' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{title ?? 'X2X Creative - Best'}</title>
                <meta name="description" content="My awesome site" />
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <header className={`${layoutStyles.header} main-header w-full mx-auto px-10`}>
                <nav className="w-full z-20">
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

                        {/* Mobile toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-300 rounded-lg md:hidden hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors z-50"
                            aria-controls="navbar-mobile"
                            aria-expanded={mobileMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {mobileMenuOpen ? (
                                // Close icon
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                // Hamburger icon
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>

                        {/* Desktop Menu */}
                        <div className="hidden w-full md:block md:w-auto" id="navbar-desktop">
                            <ul className="no-bullets font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">
                                {navLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={`block py-2 px-3 md:p-0 transition-colors ${
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

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu Drawer */}
            <div
                id="navbar-mobile"
                className={`fixed top-0 right-0 h-screen w-64 bg-zinc-900/95 backdrop-blur-lg border-l border-zinc-800 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
                    mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full pt-20 px-6">
                    <ul className="no-bullets flex flex-col space-y-6">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block text-lg ${
                                        pathname === link.href
                                            ? 'gradient-text font-bold'
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
        </>
    );
}