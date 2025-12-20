import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('utils', () => {
    describe('cn', () => {
        it('should merge class names correctly', () => {
            expect(cn('class1', 'class2')).toBe('class1 class2')
        })

        it('should handle conditional classes', () => {
            expect(cn('class1', { 'class2': true, 'class3': false })).toBe('class1 class2')
        })

        it('should merge tailwind classes properly', () => {
            expect(cn('p-4 p-2')).toBe('p-2') // p-2 should override p-4
        })

        it('should handle undefined and null inputs', () => {
             expect(cn(undefined, null, 'class1')).toBe('class1')
        })
    })
})
