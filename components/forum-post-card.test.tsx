import { render, screen } from '@testing-library/react'
import ForumPostCard from './forum-post-card'
import { describe, it, expect } from 'vitest'

const mockPost = {
    id: 'post-1',
    title: 'How to care for Monstera?',
    content: 'I just got a new Monstera plant and I am wondering about the best care practices. Can anyone help me with watering schedules and light requirements?',
    author: 'PlantLover123',
    category: 'care-tips',
    createdAt: '2 hours ago',
    replies: 5,
    views: 120,
    likes: 15,
}

describe('ForumPostCard Component', () => {
    it('renders the post title', () => {
        render(<ForumPostCard post={mockPost} />)
        expect(screen.getByText('How to care for Monstera?')).toBeInTheDocument()
    })

    it('renders truncated content (first 100 chars + ...)', () => {
        render(<ForumPostCard post={mockPost} />)
        // Content is truncated to 100 chars
        expect(screen.getByText(/I just got a new Monstera plant/i)).toBeInTheDocument()
    })

    it('renders the author name', () => {
        render(<ForumPostCard post={mockPost} />)
        expect(screen.getByText('By PlantLover123')).toBeInTheDocument()
    })

    it('renders the created date', () => {
        render(<ForumPostCard post={mockPost} />)
        expect(screen.getByText('2 hours ago')).toBeInTheDocument()
    })

    it('renders the reply count', () => {
        render(<ForumPostCard post={mockPost} />)
        expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('renders the view count', () => {
        render(<ForumPostCard post={mockPost} />)
        expect(screen.getByText('120')).toBeInTheDocument()
    })

    it('renders the likes count', () => {
        render(<ForumPostCard post={mockPost} />)
        expect(screen.getByText('15')).toBeInTheDocument()
    })

    it('renders correct category badge for care-tips', () => {
        render(<ForumPostCard post={mockPost} />)
        const badge = screen.getByText('care tips')
        expect(badge.closest('span[data-slot="badge"]')).toHaveClass('bg-green-100')
    })

    it('renders correct category badge for pest-control', () => {
        const pestPost = { ...mockPost, category: 'pest-control' }
        render(<ForumPostCard post={pestPost} />)
        const badge = screen.getByText('pest control')
        expect(badge.closest('span[data-slot="badge"]')).toHaveClass('bg-red-100')
    })

    it('links to the correct post detail page', () => {
        render(<ForumPostCard post={mockPost} />)
        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', '/forum/post-1')
    })
})
