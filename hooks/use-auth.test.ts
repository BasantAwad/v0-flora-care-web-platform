import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAuth } from './use-auth'

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
}

// Mock window.location
const originalLocation = window.location

describe('useAuth Hook', () => {
    beforeEach(() => {
        // Setup mocks
        Object.defineProperty(window, 'localStorage', { value: localStorageMock })
        delete (window as any).location
        window.location = { ...originalLocation, href: '' } as Location
    })

    afterEach(() => {
        vi.clearAllMocks()
        window.location = originalLocation
    })

    it('should initialize with null user when localStorage is empty', () => {
        localStorageMock.getItem.mockReturnValue(null)
        
        const { result } = renderHook(() => useAuth())
        
        expect(result.current.user).toBeNull()
        expect(result.current.isLoading).toBe(false)
    })

    it('should load user from localStorage on mount', async () => {
        const mockUser = { id: 1, email: 'test@example.com', username: 'testuser' }
        localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser))
        
        const { result } = renderHook(() => useAuth())
        
        // Wait for effect to run
        await vi.waitFor(() => {
            expect(result.current.user).toEqual(mockUser)
        })
    })

    it('should handle invalid JSON in localStorage gracefully', () => {
        localStorageMock.getItem.mockReturnValue('invalid-json')
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
        
        const { result } = renderHook(() => useAuth())
        
        expect(result.current.user).toBeNull()
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('user')
        consoleSpy.mockRestore()
    })

    it('should clear user and redirect on logout', () => {
        const mockUser = { id: 1, email: 'test@example.com' }
        localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser))
        
        const { result } = renderHook(() => useAuth())
        
        act(() => {
            result.current.logout()
        })
        
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('user')
        expect(result.current.user).toBeNull()
        expect(window.location.href).toBe('/')
    })

    it('should return isLoading as false after initialization', async () => {
        localStorageMock.getItem.mockReturnValue(null)
        
        const { result } = renderHook(() => useAuth())
        
        await vi.waitFor(() => {
            expect(result.current.isLoading).toBe(false)
        })
    })
})
