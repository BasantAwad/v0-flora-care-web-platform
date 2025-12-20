/**
 * LocalStorage Mock
 * 
 * PURPOSE: A mock is a dependency replacement that not only provides canned
 * responses (like a stub) but also tracks how it was called. This allows
 * tests to verify that the MUT interacted with the dependency correctly.
 * 
 * ROLE IN SCAFFOLDING: Replaces localStorage while enabling assertions like
 * "was getItem called with 'user'?" or "how many times was setItem called?"
 * 
 * KEY DIFFERENCE FROM STUB: Mocks track calls for verification (behavioral testing)
 */

import { vi, type Mock } from 'vitest';

/**
 * Mock localStorage interface with Vitest mock functions
 */
interface LocalStorageMock {
  getItem: Mock<(key: string) => string | null>;
  setItem: Mock<(key: string, value: string) => void>;
  removeItem: Mock<(key: string) => void>;
  clear: Mock<() => void>;
  key: Mock<(index: number) => string | null>;
  readonly length: number;
  /** Helper to reset all mock call history */
  resetAllMocks: () => void;
  /** Helper to get the internal store state */
  getStore: () => Record<string, string>;
}

/**
 * Creates a localStorage mock with call tracking
 * 
 * Unlike a stub, this mock uses Vitest's `vi.fn()` to track all method calls,
 * enabling you to make assertions about how localStorage was used.
 * 
 * @param initialData - Optional initial data to populate the mock
 * @returns A localStorage mock with verification capabilities
 * 
 * @example
 * ```typescript
 * const lsMock = createLocalStorageMock();
 * 
 * // After running code that uses localStorage:
 * expect(lsMock.getItem).toHaveBeenCalledWith('user');
 * expect(lsMock.setItem).toHaveBeenCalledTimes(2);
 * expect(lsMock.removeItem).not.toHaveBeenCalled();
 * ```
 */
export function createLocalStorageMock(
  initialData: Record<string, string> = {}
): LocalStorageMock {
  // Internal store for data
  let store: Record<string, string> = { ...initialData };

  // Create mock functions that also maintain the store
  const getItemMock = vi.fn((key: string): string | null => {
    return store[key] ?? null;
  });

  const setItemMock = vi.fn((key: string, value: string): void => {
    store[key] = value;
  });

  const removeItemMock = vi.fn((key: string): void => {
    delete store[key];
  });

  const clearMock = vi.fn((): void => {
    store = {};
  });

  const keyMock = vi.fn((index: number): string | null => {
    const keys = Object.keys(store);
    return keys[index] ?? null;
  });

  return {
    getItem: getItemMock,
    setItem: setItemMock,
    removeItem: removeItemMock,
    clear: clearMock,
    key: keyMock,

    get length(): number {
      return Object.keys(store).length;
    },

    /**
     * Resets all mock function call history
     */
    resetAllMocks(): void {
      getItemMock.mockClear();
      setItemMock.mockClear();
      removeItemMock.mockClear();
      clearMock.mockClear();
      keyMock.mockClear();
    },

    /**
     * Returns the current state of the internal store
     */
    getStore(): Record<string, string> {
      return { ...store };
    },
  };
}

/**
 * Example usage showing the difference between stub and mock:
 * 
 * ```typescript
 * import { createLocalStorageStub } from '../stubs/localStorage.stub';
 * import { createLocalStorageMock } from '../mocks/localStorage.mock';
 * 
 * // STUB: Only provides data, no verification
 * const stub = createLocalStorageStub({ user: '{"id":1}' });
 * stub.getItem('user'); // Returns '{"id":1}'
 * // Cannot verify: "was getItem called with 'user'?" ❌
 * 
 * // MOCK: Provides data AND allows verification
 * const mock = createLocalStorageMock({ user: '{"id":1}' });
 * mock.getItem('user'); // Returns '{"id":1}'
 * expect(mock.getItem).toHaveBeenCalledWith('user'); // ✅
 * expect(mock.getItem).toHaveBeenCalledTimes(1); // ✅
 * ```
 * 
 * Full test example with useAuth hook:
 * 
 * ```typescript
 * describe('useAuth logout', () => {
 *   it('should remove user from localStorage on logout', async () => {
 *     const lsMock = createLocalStorageMock({
 *       user: JSON.stringify({ id: 1, email: 'test@test.com' })
 *     });
 *     Object.defineProperty(window, 'localStorage', { value: lsMock });
 *     
 *     const { result } = renderHook(() => useAuth());
 *     
 *     act(() => {
 *       result.current.logout();
 *     });
 *     
 *     // VERIFICATION: Assert localStorage.removeItem was called correctly
 *     expect(lsMock.removeItem).toHaveBeenCalledWith('user');
 *     expect(lsMock.removeItem).toHaveBeenCalledTimes(1);
 *   });
 * });
 * ```
 */
