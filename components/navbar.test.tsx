import { render, screen } from '@testing-library/react'
import Navbar from './navbar'
import { describe, it, expect, vi } from 'vitest'

// Mock next/navigation
vi.mock('next/navigation', () => ({
    usePathname: () => '/',
}))

// Mock custom hooks
vi.mock('@/hooks/use-auth', () => ({
    useAuth: () => ({
        user: null,
        isLoading: false,
        logout: vi.fn(),
    }),
}))

describe('Navbar Component', () => {
    it('renders logo text', () => {
        render(<Navbar />)
        expect(screen.getByText('FloraCare')).toBeInTheDocument()
    })

    it('renders navigation links', () => {
        render(<Navbar />)
        expect(screen.getByText('Identify')).toBeInTheDocument()
        expect(screen.getByText('Diagnose')).toBeInTheDocument()
        expect(screen.getByText('Community')).toBeInTheDocument()
    })
})
