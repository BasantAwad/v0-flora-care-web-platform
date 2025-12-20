/**
 * LocalStorage Stub
 * 
 * PURPOSE: A stub is a simple dependency replacement that returns fixed values.
 * Unlike mocks, stubs don't verify how they were called - they just provide
 * canned responses to allow the MUT to execute.
 * 
 * ROLE IN SCAFFOLDING: Replaces the browser's localStorage with a predictable,
 * in-memory implementation that works in Node.js test environment.
 */

/**
 * Initial data to populate the stub with
 */
type StubData = Record<string, string>;

/**
 * LocalStorage stub interface
 */
interface LocalStorageStub {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
  key: (index: number) => string | null;
  readonly length: number;
}

/**
 * Creates a localStorage stub with optional initial data
 * 
 * This stub provides a simple, in-memory implementation of localStorage.
 * It does NOT track how methods were called - for that, use a mock.
 * 
 * @param initialData - Optional key-value pairs to pre-populate storage
 * @returns A localStorage-compatible stub object
 * 
 * @example
 * ```typescript
 * // Create an empty stub
 * const lsStub = createLocalStorageStub();
 * 
 * // Create with initial data
 * const lsStub = createLocalStorageStub({
 *   user: JSON.stringify({ id: 1, email: 'test@test.com' }),
 *   theme: 'dark'
 * });
 * 
 * // Use in tests
 * Object.defineProperty(window, 'localStorage', { value: lsStub });
 * ```
 */
export function createLocalStorageStub(initialData: StubData = {}): LocalStorageStub {
  // Internal storage - using a closure for data encapsulation
  let store: StubData = { ...initialData };

  return {
    /**
     * Returns the value for the given key, or null if not found
     */
    getItem(key: string): string | null {
      return store[key] ?? null;
    },

    /**
     * Sets a value for the given key
     */
    setItem(key: string, value: string): void {
      store[key] = value;
    },

    /**
     * Removes the value for the given key
     */
    removeItem(key: string): void {
      delete store[key];
    },

    /**
     * Clears all stored data
     */
    clear(): void {
      store = {};
    },

    /**
     * Returns the key at the given index
     */
    key(index: number): string | null {
      const keys = Object.keys(store);
      return keys[index] ?? null;
    },

    /**
     * Returns the number of items in storage
     */
    get length(): number {
      return Object.keys(store).length;
    },
  };
}

/**
 * Example usage in a test for useAuth hook:
 * 
 * ```typescript
 * import { createLocalStorageStub } from '../stubs/localStorage.stub';
 * import { useAuth } from '@/hooks/use-auth';
 * 
 * describe('useAuth with localStorage stub', () => {
 *   beforeEach(() => {
 *     // Stub returns a logged-in user
 *     const stub = createLocalStorageStub({
 *       user: JSON.stringify({ id: 1, email: 'user@example.com' })
 *     });
 *     Object.defineProperty(window, 'localStorage', { value: stub });
 *   });
 * 
 *   it('should load user from localStorage', () => {
 *     // Test implementation...
 *     // The stub ensures localStorage.getItem('user') returns our test data
 *   });
 * });
 * ```
 */
