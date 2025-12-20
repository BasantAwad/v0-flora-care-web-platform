/**
 * Router Stub
 * 
 * PURPOSE: Stubs the Next.js router to provide fixed navigation behavior
 * without actually performing navigation. This allows testing components
 * that use router hooks like useRouter, usePathname, etc.
 * 
 * ROLE IN SCAFFOLDING: Replaces the Next.js App Router with a predictable
 * stub that doesn't require the full Next.js context.
 */

/**
 * Router stub configuration
 */
interface RouterStubConfig {
  /** Current pathname */
  pathname?: string;
  /** URL search params as object */
  searchParams?: Record<string, string>;
  /** Query params (for pages router compatibility) */
  query?: Record<string, string>;
  /** Base path */
  basePath?: string;
  /** Locale */
  locale?: string;
}

/**
 * App Router stub interface
 */
interface AppRouterStub {
  push: (href: string) => void;
  replace: (href: string) => void;
  refresh: () => void;
  back: () => void;
  forward: () => void;
  prefetch: (href: string) => void;
}

/**
 * Creates a Next.js App Router stub
 * 
 * This stub provides no-op implementations of router methods.
 * For verifying navigation calls, use the router mock instead.
 * 
 * @param config - Optional configuration for the router state
 * @returns An App Router-compatible stub
 * 
 * @example
 * ```typescript
 * const routerStub = createAppRouterStub({ pathname: '/dashboard' });
 * 
 * vi.mock('next/navigation', () => ({
 *   useRouter: () => routerStub,
 *   usePathname: () => '/dashboard',
 * }));
 * ```
 */
export function createAppRouterStub(config: RouterStubConfig = {}): AppRouterStub {
  // These are no-op implementations - stubs don't track calls
  return {
    push: (_href: string) => {},
    replace: (_href: string) => {},
    refresh: () => {},
    back: () => {},
    forward: () => {},
    prefetch: (_href: string) => {},
  };
}

/**
 * Creates pathname and searchParams stubs for use with Next.js navigation hooks
 */
export function createNavigationStubs(config: RouterStubConfig = {}) {
  const { pathname = '/', searchParams = {} } = config;

  return {
    /** Stub for usePathname hook */
    usePathname: () => pathname,

    /** Stub for useSearchParams hook */
    useSearchParams: () => new URLSearchParams(searchParams),

    /** Stub for useRouter hook */
    useRouter: () => createAppRouterStub(config),

    /** Stub for useParams hook */
    useParams: () => config.query ?? {},
  };
}

/**
 * Example usage in tests:
 * 
 * ```typescript
 * import { createNavigationStubs } from '../stubs/router.stub';
 * 
 * // Mock the next/navigation module
 * vi.mock('next/navigation', () => 
 *   createNavigationStubs({
 *     pathname: '/my-garden',
 *     searchParams: { filter: 'healthy' }
 *   })
 * );
 * 
 * describe('MyGarden Page', () => {
 *   it('should display filtered plants', () => {
 *     // The component will receive:
 *     // - usePathname() → '/my-garden'
 *     // - useSearchParams().get('filter') → 'healthy'
 *   });
 * });
 * ```
 */
