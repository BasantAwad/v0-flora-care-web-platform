/**
 * API Route Test Driver
 * 
 * PURPOSE: This driver calls API route handlers (the MUT - Module Under Test),
 * simulating HTTP requests and capturing responses. It provides a clean way
 * to test Next.js API routes in isolation.
 * 
 * ROLE IN SCAFFOLDING: Acts as the test executor that:
 * 1. Constructs mock Request objects with test data
 * 2. Calls the API route handler function
 * 3. Captures and parses the Response for verification
 */

/**
 * Configuration for API route handler type
 */
type ApiRouteHandler = (request: Request) => Promise<Response>;

/**
 * Options for creating API requests
 */
interface ApiRequestOptions {
  /** HTTP method (GET, POST, PUT, DELETE) */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  /** Request body (will be JSON stringified) */
  body?: Record<string, unknown>;
  /** Request headers */
  headers?: Record<string, string>;
  /** URL search parameters */
  searchParams?: Record<string, string>;
}

/**
 * Result from an API driver call
 */
interface ApiDriverResult<T = unknown> {
  /** HTTP status code */
  status: number;
  /** Parsed JSON response body */
  data: T;
  /** Whether the request was successful (2xx status) */
  ok: boolean;
  /** Raw Response object */
  response: Response;
}

/**
 * Creates an API route test driver
 * 
 * @param handler - The API route handler function to test
 * @param baseUrl - Base URL for the API route (default: http://localhost:3000)
 * 
 * @example
 * ```typescript
 * import { POST } from '@/app/api/diagnose-plant/route';
 * 
 * const driver = createApiDriver(POST);
 * const result = await driver.call({
 *   method: 'POST',
 *   body: { imageData: 'base64...' }
 * });
 * 
 * expect(result.status).toBe(200);
 * expect(result.data.issue).toBeDefined();
 * ```
 */
export function createApiDriver(
  handler: ApiRouteHandler,
  baseUrl: string = 'http://localhost:3000/api/test'
) {
  return {
    /**
     * Calls the API route with the given options
     */
    async call<T = unknown>(options: ApiRequestOptions = {}): Promise<ApiDriverResult<T>> {
      const { method = 'GET', body, headers = {}, searchParams } = options;

      // Build URL with search params
      let url = baseUrl;
      if (searchParams) {
        const params = new URLSearchParams(searchParams);
        url = `${baseUrl}?${params.toString()}`;
      }

      // Create mock Request
      const requestInit: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      };

      if (body && method !== 'GET') {
        requestInit.body = JSON.stringify(body);
      }

      const request = new Request(url, requestInit);

      // Call the handler (MUT)
      const response = await handler(request);

      // Parse response
      let data: T;
      try {
        data = await response.json() as T;
      } catch {
        data = {} as T;
      }

      return {
        status: response.status,
        data,
        ok: response.ok,
        response,
      };
    },

    /**
     * Shorthand for POST requests
     */
    async post<T = unknown>(body: Record<string, unknown>): Promise<ApiDriverResult<T>> {
      return this.call<T>({ method: 'POST', body });
    },

    /**
     * Shorthand for GET requests
     */
    async get<T = unknown>(searchParams?: Record<string, string>): Promise<ApiDriverResult<T>> {
      return this.call<T>({ method: 'GET', searchParams });
    },
  };
}

/**
 * Example usage with diagnose-plant API:
 * 
 * ```typescript
 * import { POST } from '@/app/api/diagnose-plant/route';
 * import { createGeminiApiMock } from '../mocks/gemini-api.mock';
 * 
 * // Mock the Gemini API dependency
 * vi.mock('@google/generative-ai', () => createGeminiApiMock());
 * 
 * const driver = createApiDriver(POST);
 * 
 * // Test successful diagnosis
 * const result = await driver.post({
 *   imageData: 'data:image/jpeg;base64,/9j/4AAQ...'
 * });
 * 
 * expect(result.status).toBe(200);
 * expect(result.data.isHealthy).toBeDefined();
 * 
 * // Test error case - no image
 * const errorResult = await driver.post({});
 * expect(errorResult.status).toBe(400);
 * ```
 */
