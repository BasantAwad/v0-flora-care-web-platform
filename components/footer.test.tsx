import { render, screen } from '@testing-library/react'
import Footer from './footer'
import { describe, it, expect } from 'vitest'

describe('Footer Component', () => {
    it('renders the FloraCare brand name', () => {
        render(<Footer />)
        expect(screen.getByText('FloraCare')).toBeInTheDocument()
    })

    it('renders the tagline description', () => {
        render(<Footer />)
        expect(screen.getByText(/AI-powered plant care community/i)).toBeInTheDocument()
    })

    it('renders Features section with correct links', () => {
        render(<Footer />)
        expect(screen.getByText('Features')).toBeInTheDocument()
        expect(screen.getByText('Plant Identification')).toBeInTheDocument()
        expect(screen.getByText('Health Diagnosis')).toBeInTheDocument()
        expect(screen.getByText('My Garden')).toBeInTheDocument()
        expect(screen.getByText('Community Forum')).toBeInTheDocument()
    })

    it('renders Resources section with correct links', () => {
        render(<Footer />)
        expect(screen.getByText('Resources')).toBeInTheDocument()
        expect(screen.getByText('Tools & Recommendations')).toBeInTheDocument()
        expect(screen.getByText('Store Finder')).toBeInTheDocument()
        expect(screen.getByText('About Us')).toBeInTheDocument()
    })

    it('renders Legal section with correct links', () => {
        render(<Footer />)
        expect(screen.getByText('Legal')).toBeInTheDocument()
        expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
        expect(screen.getByText('Terms of Service')).toBeInTheDocument()
        expect(screen.getByText('Contact')).toBeInTheDocument()
    })

    it('renders copyright notice', () => {
        render(<Footer />)
        expect(screen.getByText(/© 2025 FloraCare/i)).toBeInTheDocument()
    })

    it('has correct link hrefs for Features section', () => {
        render(<Footer />)
        expect(screen.getByRole('link', { name: 'Plant Identification' })).toHaveAttribute('href', '/identify')
        expect(screen.getByRole('link', { name: 'Health Diagnosis' })).toHaveAttribute('href', '/diagnose')
        expect(screen.getByRole('link', { name: 'My Garden' })).toHaveAttribute('href', '/my-garden')
    })
})
