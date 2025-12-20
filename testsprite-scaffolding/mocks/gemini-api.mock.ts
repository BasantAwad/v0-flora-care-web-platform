/**
 * Gemini AI API Mock
 * 
 * PURPOSE: Mocks the Google Generative AI (Gemini) API with full call tracking
 * and verification capabilities. Unlike the stub, this mock allows you to verify
 * exactly how the AI API was called.
 * 
 * ROLE IN SCAFFOLDING: Replaces the AI dependency while enabling assertions about:
 * - Whether generateContent was called
 * - What prompts were sent to the AI
 * - How many times the API was invoked
 */

import { vi, type Mock } from 'vitest';

/**
 * Mock model interface with tracked methods
 */
interface MockGenerativeModel {
  generateContent: Mock;
}

/**
 * Mock GoogleGenerativeAI interface
 */
interface MockGoogleGenerativeAI {
  getGenerativeModel: Mock<(config: { model: string }) => MockGenerativeModel>;
  /** Track all API calls */
  getCalls: () => Array<{
    model: string;
    contents: unknown[];
  }>;
  /** Reset all mock state */
  reset: () => void;
}

/**
 * Configuration for the Gemini mock
 */
interface GeminiMockConfig {
  /** The response text to return */
  responseText?: string;
  /** Parsed response object (will be stringified) */
  responseObject?: Record<string, unknown>;
  /** Whether to throw an error */
  shouldError?: boolean;
  /** Error to throw */
  error?: Error;
}

/**
 * Creates a fully tracked Gemini AI API mock
 * 
 * @param config - Configuration for mock behavior
 * @returns A mock module structure with verification capabilities
 * 
 * @example
 * ```typescript
 * const { module, mock } = createGeminiApiMock({
 *   responseObject: { isHealthy: true, issue: 'Healthy Plant' }
 * });
 * 
 * vi.mock('@google/generative-ai', () => module);
 * 
 * // After test execution:
 * expect(mock.getGenerativeModel).toHaveBeenCalledWith({ model: 'gemini-2.5-flash' });
 * ```
 */
export function createGeminiApiMock(config: GeminiMockConfig = {}) {
  const {
    responseText,
    responseObject = { isHealthy: true, issue: 'Healthy Plant' },
    shouldError = false,
    error = new Error('API Error'),
  } = config;

  // Track all calls
  const calls: Array<{ model: string; contents: unknown[] }> = [];

  // Create the mock generateContent function
  const generateContentMock = vi.fn(async (contents: unknown[]) => {
    // Store the call for later verification
    const lastModelCall = calls[calls.length - 1];
    if (lastModelCall) {
      lastModelCall.contents = contents;
    }

    if (shouldError) {
      throw error;
    }

    const text = responseText ?? JSON.stringify(responseObject);

    return {
      response: {
        text: () => text,
      },
    };
  });

  // Create the mock getGenerativeModel function
  const getGenerativeModelMock = vi.fn((modelConfig: { model: string }) => {
    calls.push({ model: modelConfig.model, contents: [] });
    return {
      generateContent: generateContentMock,
    };
  });

  // The mock object with verification methods
  const mock: MockGoogleGenerativeAI = {
    getGenerativeModel: getGenerativeModelMock,
    getCalls: () => [...calls],
    reset: () => {
      calls.length = 0;
      generateContentMock.mockClear();
      getGenerativeModelMock.mockClear();
    },
  };

  // The module structure for vi.mock()
  const module = {
    GoogleGenerativeAI: class {
      constructor(_apiKey: string) {}
      getGenerativeModel = getGenerativeModelMock;
    },
  };

  return { module, mock, generateContentMock };
}

/**
 * Pre-configured mocks for common scenarios
 */
export const geminiMocks = {
  /**
   * Creates a mock that returns a healthy plant diagnosis
   */
  healthyDiagnosis: () => createGeminiApiMock({
    responseObject: {
      isHealthy: true,
      issue: 'Healthy Plant',
      severity: 'none',
      description: 'This plant appears to be in good health.',
      symptoms: [],
      treatment: { immediate: [], longterm: [] },
      prevention: ['Monitor regularly'],
    },
  }),

  /**
   * Creates a mock that returns a diseased plant diagnosis
   */
  diseasedDiagnosis: () => createGeminiApiMock({
    responseObject: {
      isHealthy: false,
      issue: 'Leaf Spot Disease',
      severity: 'medium',
      description: 'Fungal infection causing brown spots on leaves.',
      symptoms: ['Brown spots', 'Yellow halos'],
      treatment: {
        immediate: ['Remove affected leaves'],
        longterm: ['Apply copper fungicide'],
      },
      prevention: ['Improve air circulation'],
    },
  }),

  /**
   * Creates a mock that simulates an API error
   */
  apiError: (message = 'API quota exceeded') => createGeminiApiMock({
    shouldError: true,
    error: new Error(message),
  }),
};

/**
 * Example usage showing verification capabilities:
 * 
 * ```typescript
 * import { createGeminiApiMock } from '../mocks/gemini-api.mock';
 * 
 * describe('diagnose-plant API', () => {
 *   it('should use the correct model', async () => {
 *     const { module, mock } = createGeminiApiMock({
 *       responseObject: { isHealthy: true }
 *     });
 *     
 *     vi.mock('@google/generative-ai', () => module);
 *     
 *     // ... call the API route ...
 *     
 *     // VERIFICATION: Assert the correct model was used
 *     expect(mock.getGenerativeModel).toHaveBeenCalledWith({
 *       model: 'gemini-2.5-flash'
 *     });
 *     
 *     // VERIFICATION: Assert generateContent was called
 *     const calls = mock.getCalls();
 *     expect(calls).toHaveLength(1);
 *     expect(calls[0].model).toBe('gemini-2.5-flash');
 *   });
 * });
 * ```
 */
