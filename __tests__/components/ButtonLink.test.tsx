import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { faArrowRight, faHome } from '@fortawesome/free-solid-svg-icons'
import ButtonLink from '@/components/ButtonLink'

// ─── Mocks ───────────────────────────────────────────────────────────────────

vi.mock('next/router', () => ({
    useRouter: () => ({
        push: vi.fn(),
        pathname: '/',
        query: {},
        asPath: '/',
        events: { on: vi.fn(), off: vi.fn(), emit: vi.fn() },
        isReady: true,
    }),
}))

// next/link 在测试环境里直接渲染成 <a> 就够了
vi.mock('next/link', () => ({
    default: ({ href, className, children }: { href: string; className: string; children: React.ReactNode }) => (
        <a href={href} className={className}>{children}</a>
    ),
}))

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('ButtonLink', () => {

    // ── 基础渲染 ──────────────────────────────────────────────────────────────

    it('renders children correctly', () => {
        render(<ButtonLink href="/about">About Us</ButtonLink>)
        expect(screen.getByText('About Us')).toBeInTheDocument()
    })

    it('renders as an anchor tag with correct href', () => {
        render(<ButtonLink href="/contact">Contact</ButtonLink>)
        const link = screen.getByRole('link', { name: 'Contact' })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', '/contact')
    })

    // ── Variant ───────────────────────────────────────────────────────────────

    it('applies primary variant classes by default', () => {
        render(<ButtonLink href="/">Click</ButtonLink>)
        const link = screen.getByRole('link')
        expect(link).toHaveClass('text-white')
    })

    it('applies secondary variant classes when variant="secondary"', () => {
        render(<ButtonLink href="/" variant="secondary">Click</ButtonLink>)
        const link = screen.getByRole('link')
        expect(link).toHaveClass('bg-gray-200', 'text-gray-800')
    })

    // ── Width ─────────────────────────────────────────────────────────────────

    it('applies w-auto by default', () => {
        render(<ButtonLink href="/">Click</ButtonLink>)
        expect(screen.getByRole('link')).toHaveClass('w-auto')
    })

    it('applies w-full when width="full"', () => {
        render(<ButtonLink href="/" width="full">Click</ButtonLink>)
        expect(screen.getByRole('link')).toHaveClass('w-full')
    })

    // ── Radius ────────────────────────────────────────────────────────────────

    it('applies rounded-full by default', () => {
        render(<ButtonLink href="/">Click</ButtonLink>)
        expect(screen.getByRole('link')).toHaveClass('rounded-full')
    })

    it('applies rounded-[15px] when radius="rounded"', () => {
        render(<ButtonLink href="/" radius="rounded">Click</ButtonLink>)
        expect(screen.getByRole('link')).toHaveClass('rounded-[15px]')
    })

    it('applies rounded-none when radius="none"', () => {
        render(<ButtonLink href="/" radius="none">Click</ButtonLink>)
        expect(screen.getByRole('link')).toHaveClass('rounded-none')
    })

    // ── Icon ──────────────────────────────────────────────────────────────────

    it('renders icon when icon prop is provided', () => {
        render(<ButtonLink href="/" icon={faArrowRight}>Next</ButtonLink>)
        // FontAwesomeIcon 渲染成 svg
        expect(screen.getByRole('link').querySelector('svg')).toBeInTheDocument()
    })

    it('does not render icon when icon prop is omitted', () => {
        render(<ButtonLink href="/">No Icon</ButtonLink>)
        expect(screen.getByRole('link').querySelector('svg')).not.toBeInTheDocument()
    })

    // ── className ─────────────────────────────────────────────────────────────

    it('merges custom className', () => {
        render(<ButtonLink href="/" className="mt-4 px-8">Click</ButtonLink>)
        const link = screen.getByRole('link')
        expect(link).toHaveClass('mt-4', 'px-8')
    })

    // ── Base classes 始终存在 ─────────────────────────────────────────────────

    it('always has base classes', () => {
        render(<ButtonLink href="/">Click</ButtonLink>)
        const link = screen.getByRole('link')
        expect(link).toHaveClass('button', 'gradient', 'transition-colors')
    })
})