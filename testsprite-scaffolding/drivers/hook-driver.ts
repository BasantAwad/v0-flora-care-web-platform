/**
 * React Hook Test Driver
 * 
 * PURPOSE: This driver enables testing React hooks in isolation by providing
 * a wrapper that handles the React rendering context required for hooks.
 * 
 * ROLE IN SCAFFOLDING: Acts as the test executor that:
 * 1. Wraps the hook in a proper React context
 * 2. Provides access to hook return values
 * 3. Enables triggering hook updates and re-renders
 */

import { renderHook, act, RenderHookResult } from '@testing-library/react';
import type { ReactNode } from 'react';

/**
 * Configuration for hook driver
 */
interface HookDriverConfig<TResult, TProps> {
  /** The hook function to test */
  hook: (props: TProps) => TResult;
  /** Initial props to pass to the hook */
  initialProps?: TProps;
  /** Optional wrapper component (for context providers) */
  wrapper?: (props: { children: ReactNode }) => ReactNode;
}

/**
 * Result from hook driver
 */
interface HookDriverResult<TResult, TProps> {
  /** Access to the current hook result */
  result: { current: TResult };
  /** Re-render the hook with new props */
  rerender: (props?: TProps) => void;
  /** Unmount the hook */
  unmount: () => void;
  /** Execute an action that causes state updates */
  act: typeof act;
  /** Wait for async updates */
  waitForNextUpdate: () => Promise<void>;
}

/**
 * Creates a React hook test driver
 * 
 * @example
 * ```typescript
 * import { useAuth } from '@/hooks/use-auth';
 * 
 * const driver = createHookDriver({
 *   hook: useAuth,
 * });
 * 
 * const { result } = driver.render();
 * expect(result.current.user).toBeNull();
 * ```
 */
export function createHookDriver<TResult, TProps = void>(
  config: HookDriverConfig<TResult, TProps>
) {
  const { hook, initialProps, wrapper } = config;

  return {
    /**
     * Renders the hook and returns utilities for interacting with it
     */
    render(props?: TProps): HookDriverResult<TResult, TProps> {
      const renderOptions: { initialProps?: TProps; wrapper?: any } = {};
      
      if (props !== undefined || initialProps !== undefined) {
        renderOptions.initialProps = props ?? initialProps;
      }
      
      if (wrapper) {
        renderOptions.wrapper = wrapper;
      }

      const hookResult: RenderHookResult<TResult, TProps> = renderHook(
        (props) => hook(props as TProps),
        renderOptions
      );

      return {
        result: hookResult.result,
        rerender: hookResult.rerender,
        unmount: hookResult.unmount,
        act,
        waitForNextUpdate: async () => {
          // Wait for microtasks to complete
          await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
          });
        },
      };
    },
  };
}

/**
 * Example usage with useAuth hook:
 * 
 * ```typescript
 * import { useAuth } from '@/hooks/use-auth';
 * import { createLocalStorageMock } from '../mocks/localStorage.mock';
 * 
 * describe('useAuth', () => {
 *   beforeEach(() => {
 *     // Setup localStorage mock
 *     const lsMock = createLocalStorageMock();
 *     Object.defineProperty(window, 'localStorage', {
 *       value: lsMock,
 *       writable: true,
 *     });
 *   });
 * 
 *   it('should return null user when not logged in', async () => {
 *     const driver = createHookDriver({ hook: useAuth });
 *     const { result, waitForNextUpdate } = driver.render();
 *     
 *     await waitForNextUpdate();
 *     
 *     expect(result.current.user).toBeNull();
 *     expect(result.current.isLoading).toBe(false);
 *   });
 * 
 *   it('should return user when logged in', async () => {
 *     localStorage.setItem('user', JSON.stringify({ id: 1, email: 'test@test.com' }));
 *     
 *     const driver = createHookDriver({ hook: useAuth });
 *     const { result, waitForNextUpdate } = driver.render();
 *     
 *     await waitForNextUpdate();
 *     
 *     expect(result.current.user).toEqual({ id: 1, email: 'test@test.com' });
 *   });
 * 
 *   it('should logout user', async () => {
 *     const driver = createHookDriver({ hook: useAuth });
 *     const { result, act } = driver.render();
 *     
 *     act(() => {
 *       result.current.logout();
 *     });
 *     
 *     expect(localStorage.removeItem).toHaveBeenCalledWith('user');
 *   });
 * });
 * ```
 */
