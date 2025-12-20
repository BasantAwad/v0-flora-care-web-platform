import { render, screen, fireEvent } from '@testing-library/react'
import PlantCard from './plant-card'
import { describe, it, expect, vi } from 'vitest'

// Mock the props
const mockPlant = {
    id: '1',
    name: 'Monstera',
    species: 'Monstera Deliciosa',
    lastWatered: '2 days ago',
    nextWatering: 'in 5 days',
    healthStatus: 'healthy' as const,
    image: 'test-image.jpg'
}

describe('PlantCard Component', () => {
    it('renders plant information correctly', () => {
        render(<PlantCard plant={mockPlant} onDelete={() => {}} />)

        expect(screen.getByText('Monstera')).toBeInTheDocument()
        expect(screen.getByText('Monstera Deliciosa')).toBeInTheDocument()
        expect(screen.getByText('Last Watered')).toBeInTheDocument()
        expect(screen.getByText('2 days ago')).toBeInTheDocument()
    })

    it('renders correct status color for healthy plants', () => {
        render(<PlantCard plant={mockPlant} onDelete={() => {}} />)
        // 'healthy' text is inside a span, which is inside the Badge (also a span)
        const statusText = screen.getByText('healthy')
        const badge = statusText.closest('span[data-slot="badge"]') 
        // Or if data-slot isn't reliably there (it IS in the file I viewed), use that.
        // The file has data-slot="badge" on line 39 of badge.tsx
        expect(badge).toHaveClass('bg-green-100')
    })

     it('renders correct status color for warning plants', () => {
        const warningPlant = { ...mockPlant, healthStatus: 'warning' as const }
        render(<PlantCard plant={warningPlant} onDelete={() => {}} />)
        const statusText = screen.getByText('warning')
        const badge = statusText.closest('span[data-slot="badge"]')
        expect(badge).toHaveClass('bg-yellow-100')
    })

    it('calls onDelete when remove button is clicked', () => {
        const handleDelete = vi.fn()
        render(<PlantCard plant={mockPlant} onDelete={handleDelete} />)

        const deleteButton = screen.getByRole('button', { name: /remove plant/i })
        fireEvent.click(deleteButton)

        expect(handleDelete).toHaveBeenCalledTimes(1)
        expect(handleDelete).toHaveBeenCalledWith('1')
    })

    it('renders image with correct src', () => {
        render(<PlantCard plant={mockPlant} onDelete={() => {}} />)
        const image = screen.getByAltText('Monstera')
        expect(image).toHaveAttribute('src', 'test-image.jpg')
    })
})
