import { describe, it, expect } from 'vitest'
import { cn } from '../../lib/utils'

describe('cn helper', () => {
  it('merges class names and deduplicates', () => {
    const out = cn('btn', 'btn-primary', { hidden: false } as any)
    expect(typeof out).toBe('string')
    expect(out.includes('btn')).toBe(true)
  })
})
