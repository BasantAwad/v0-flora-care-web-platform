/**
 * Fetch API Mock
 * 
 * PURPOSE: Mocks the global fetch API to intercept HTTP requests during
 * testing. This allows testing code that makes API calls without actually
 * hitting external services.
 * 
 * ROLE IN SCAFFOLDING: Intercepts all fetch() calls, returns configured
 * responses, and enables verification of what requests were made.
 */

import { vi, type Mock } from 'vitest';

/**
 * Configuration for a mock response
 */
interface MockResponseConfig {
  /** HTTP status code */
  status?: number;
  /** Response body (will be JSON stringified if object) */
  body?: unknown;
  /** Response headers */
  headers?: Record<string, string>;
  /** Delay in milliseconds before responding */
  delay?: number;
  /** Whether to simulate a network error */
  networkError?: boolean;
  /** Error message for network errors */
  errorMessage?: string;
}

/**
 * Route matcher for conditional responses
 */
interface RouteConfig {
  /** URL pattern to match (can be string or regex) */
  url: string | RegExp;
  /** HTTP method to match */
  method?: string;
  /** Response configuration */
  response: MockResponseConfig;
}

/**
 * Fetch mock interface
 */
interface FetchMock {
  /** The mock function to assign to global.fetch */
  mockFetch: Mock;
  /** Add a route-specific response */
  mockRoute: (config: RouteConfig) => void;
  /** Set a default response for unmatched routes */
  mockDefault: (config: MockResponseConfig) => void;
  /** Get all calls made to fetch */
  getCalls: () => Array<{ url: string; options?: RequestInit }>;
  /** Reset the mock */
  reset: () => void;
}

/**
 * Creates a mock Response object
 */
function createMockResponse(config: MockResponseConfig): Response {
  const { status = 200, body = {}, headers = {} } = config;

  const responseHeaders = new Headers({
    'Content-Type': 'application/json',
    ...headers,
  });

  const responseBody = typeof body === 'string' ? body : JSON.stringify(body);

  return new Response(responseBody, {
    status,
    headers: responseHeaders,
  });
}

/**
 * Creates a fetch API mock
 * 
 * @returns A fetch mock with route configuration capabilities
 * 
 * @example
 * ```typescript
 * const fetchMock = createFetchMock();
 * 
 * // Mock a specific route
 * fetchMock.mockRoute({
 *   url: '/api/diagnose-plant',
 *   method: 'POST',
 *   response: {
 *     status: 200,
 *     body: { isHealthy: true, issue: 'Healthy Plant' }
 *   }
 * });
 * 
 * // Replace global fetch
 * global.fetch = fetchMock.mockFetch;
 * ```
 */
export function createFetchMock(): FetchMock {
  const routes: RouteConfig[] = [];
  let defaultResponse: MockResponseConfig = { status: 404, body: { error: 'Not found' } };
  const calls: Array<{ url: string; options?: RequestInit }> = [];

  const mockFetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = typeof input === 'string' ? input : input.toString();
    const method = init?.method ?? 'GET';

    // Track the call
    calls.push({ url, options: init });

    // Find matching route
    for (const route of routes) {
      const urlMatches = typeof route.url === 'string'
        ? url.includes(route.url)
        : route.url.test(url);

      const methodMatches = !route.method || route.method.toUpperCase() === method.toUpperCase();

      if (urlMatches && methodMatches) {
        const config = route.response;

        // Simulate network error
        if (config.networkError) {
          throw new Error(config.errorMessage ?? 'Network error');
        }

        // Simulate delay
        if (config.delay) {
          await new Promise((resolve) => setTimeout(resolve, config.delay));
        }

        return createMockResponse(config);
      }
    }

    // Return default response
    return createMockResponse(defaultResponse);
  });

  return {
    mockFetch,

    mockRoute(config: RouteConfig): void {
      routes.push(config);
    },

    mockDefault(config: MockResponseConfig): void {
      defaultResponse = config;
    },

    getCalls() {
      return [...calls];
    },

    reset(): void {
      routes.length = 0;
      calls.length = 0;
      defaultResponse = { status: 404, body: { error: 'Not found' } };
      mockFetch.mockClear();
    },
  };
}

/**
 * Example usage in component tests:
 * 
 * ```typescript
 * import { createFetchMock } from '../mocks/fetch.mock';
 * 
 * describe('PlantDiagnosis component', () => {
 *   let fetchMock: ReturnType<typeof createFetchMock>;
 * 
 *   beforeEach(() => {
 *     fetchMock = createFetchMock();
 *     
 *     // Mock the diagnosis API
 *     fetchMock.mockRoute({
 *       url: '/api/diagnose-plant',
 *       method: 'POST',
 *       response: {
 *         status: 200,
 *         body: {
 *           isHealthy: true,
 *           issue: 'Healthy Plant',
 *           description: 'Your plant looks healthy!'
 *         }
 *       }
 *     });
 *     
 *     global.fetch = fetchMock.mockFetch;
 *   });
 * 
 *   afterEach(() => {
 *     fetchMock.reset();
 *   });
 * 
 *   it('should call the diagnosis API with image data', async () => {
 *     // ... trigger diagnosis ...
 *     
 *     // Verify the API was called
 *     expect(fetchMock.mockFetch).toHaveBeenCalled();
 *     
 *     const calls = fetchMock.getCalls();
 *     expect(calls[0].url).toContain('/api/diagnose-plant');
 *     expect(JSON.parse(calls[0].options?.body as string)).toHaveProperty('imageData');
 *   });
 * });
 * ```
 */
