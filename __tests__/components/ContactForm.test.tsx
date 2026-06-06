// ContactForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ContactForm from '@/components/ContactForm'

describe('ContactForm', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    it('renders all fields and submit button', () => {
        render(<ContactForm />)

        expect(screen.getByLabelText('Name')).toBeInTheDocument()
        expect(screen.getByLabelText('Email')).toBeInTheDocument()
        expect(screen.getByLabelText('Message')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
    })

    it('shows sending state while submitting', async () => {
        // fetch 永远 pending，模拟慢网络
        // 改成这样
        global.fetch = vi.fn(() => new Promise<Response>(() => {})) as typeof fetch

        render(<ContactForm />)
        const user = userEvent.setup()

        await user.type(screen.getByLabelText('Name'), 'Chris')
        await user.type(screen.getByLabelText('Email'), 'chris@test.com')
        await user.type(screen.getByLabelText('Message'), 'Hello!')
        await user.click(screen.getByRole('button', { name: /send message/i }))

        expect(screen.getByText(/sending/i)).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('shows success message when API returns ok', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({ ok: true } as Response)
        )

        render(<ContactForm />)
        const user = userEvent.setup()

        await user.type(screen.getByLabelText('Name'), 'Chris')
        await user.type(screen.getByLabelText('Email'), 'chris@test.com')
        await user.type(screen.getByLabelText('Message'), 'Hello!')
        await user.click(screen.getByRole('button', { name: /send message/i }))

        await waitFor(() => {
            expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument()
        })

        // 表单被清空
        expect(screen.getByLabelText('Name')).toHaveValue('')
        expect(screen.getByLabelText('Email')).toHaveValue('')
    })

    it('shows error message when API returns not ok', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({ ok: false } as Response)
        )

        render(<ContactForm />)
        const user = userEvent.setup()

        await user.type(screen.getByLabelText('Name'), 'Chris')
        await user.type(screen.getByLabelText('Email'), 'chris@test.com')
        await user.type(screen.getByLabelText('Message'), 'Hello!')
        await user.click(screen.getByRole('button', { name: /send message/i }))

        await waitFor(() => {
            expect(screen.getByText(/failed to send/i)).toBeInTheDocument()
        })
    })

    it('shows error message when fetch throws (network error)', async () => {
        global.fetch = vi.fn(() => Promise.reject(new Error('Network error')))

        render(<ContactForm />)
        const user = userEvent.setup()

        await user.type(screen.getByLabelText('Name'), 'Chris')
        await user.type(screen.getByLabelText('Email'), 'chris@test.com')
        await user.type(screen.getByLabelText('Message'), 'Hello!')
        await user.click(screen.getByRole('button', { name: /send message/i }))

        await waitFor(() => {
            expect(screen.getByText(/failed to send/i)).toBeInTheDocument()
        })
    })
})