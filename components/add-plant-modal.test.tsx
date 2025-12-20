import { render, screen, fireEvent } from '@testing-library/react'
import AddPlantModal from './add-plant-modal'
import { describe, it, expect, vi } from 'vitest'

describe('AddPlantModal Component', () => {
    const mockOnAdd = vi.fn()
    const mockOnClose = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the modal title', () => {
        render(<AddPlantModal onAdd={mockOnAdd} onClose={mockOnClose} />)
        expect(screen.getByText('Add New Plant')).toBeInTheDocument()
    })

    it('renders all form fields', () => {
        render(<AddPlantModal onAdd={mockOnAdd} onClose={mockOnClose} />)
        expect(screen.getByText('Plant Name')).toBeInTheDocument()
        expect(screen.getByText('Species')).toBeInTheDocument()
        expect(screen.getByText('Last Watered')).toBeInTheDocument()
        expect(screen.getByText('Next Watering')).toBeInTheDocument()
        expect(screen.getByText('Health Status')).toBeInTheDocument()
    })

    it('renders placeholder text for name input', () => {
        render(<AddPlantModal onAdd={mockOnAdd} onClose={mockOnClose} />)
        expect(screen.getByPlaceholderText('e.g., My Monstera')).toBeInTheDocument()
    })

    it('renders placeholder text for species input', () => {
        render(<AddPlantModal onAdd={mockOnAdd} onClose={mockOnClose} />)
        expect(screen.getByPlaceholderText('e.g., Monstera Deliciosa')).toBeInTheDocument()
    })

    it('renders health status dropdown with all options', () => {
        render(<AddPlantModal onAdd={mockOnAdd} onClose={mockOnClose} />)
        expect(screen.getByRole('option', { name: 'Healthy' })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'Needs Attention' })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'Critical' })).toBeInTheDocument()
    })

    it('calls onClose when Cancel button is clicked', () => {
        render(<AddPlantModal onAdd={mockOnAdd} onClose={mockOnClose} />)
        const cancelButton = screen.getByRole('button', { name: 'Cancel' })
        fireEvent.click(cancelButton)
        expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('calls onClose when X button is clicked', () => {
        render(<AddPlantModal onAdd={mockOnAdd} onClose={mockOnClose} />)
        // The X button is identified by its position in the header
        const closeButtons = screen.getAllByRole('button')
        // First button should be the X close button
        fireEvent.click(closeButtons[0])
        expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('calls onAdd with form data when submitted with valid data', () => {
        render(<AddPlantModal onAdd={mockOnAdd} onClose={mockOnClose} />)
        
        const nameInput = screen.getByPlaceholderText('e.g., My Monstera')
        const speciesInput = screen.getByPlaceholderText('e.g., Monstera Deliciosa')
        
        fireEvent.change(nameInput, { target: { value: 'Test Plant' } })
        fireEvent.change(speciesInput, { target: { value: 'Test Species' } })
        
        const submitButton = screen.getByRole('button', { name: 'Add Plant' })
        fireEvent.click(submitButton)
        
        expect(mockOnAdd).toHaveBeenCalledTimes(1)
        expect(mockOnAdd).toHaveBeenCalledWith(expect.objectContaining({
            name: 'Test Plant',
            species: 'Test Species',
            healthStatus: 'healthy',
        }))
    })

    it('does not call onAdd when name is empty', () => {
        render(<AddPlantModal onAdd={mockOnAdd} onClose={mockOnClose} />)
        
        const speciesInput = screen.getByPlaceholderText('e.g., Monstera Deliciosa')
        fireEvent.change(speciesInput, { target: { value: 'Test Species' } })
        
        const submitButton = screen.getByRole('button', { name: 'Add Plant' })
        fireEvent.click(submitButton)
        
        // Form validation should prevent submission (HTML5 required attribute)
        expect(mockOnAdd).not.toHaveBeenCalled()
    })

    it('updates health status when changed', () => {
        render(<AddPlantModal onAdd={mockOnAdd} onClose={mockOnClose} />)
        
        const nameInput = screen.getByPlaceholderText('e.g., My Monstera')
        const speciesInput = screen.getByPlaceholderText('e.g., Monstera Deliciosa')
        const healthSelect = screen.getByRole('combobox')
        
        fireEvent.change(nameInput, { target: { value: 'Test' } })
        fireEvent.change(speciesInput, { target: { value: 'Species' } })
        fireEvent.change(healthSelect, { target: { value: 'warning' } })
        
        const submitButton = screen.getByRole('button', { name: 'Add Plant' })
        fireEvent.click(submitButton)
        
        expect(mockOnAdd).toHaveBeenCalledWith(expect.objectContaining({
            healthStatus: 'warning',
        }))
    })
})
