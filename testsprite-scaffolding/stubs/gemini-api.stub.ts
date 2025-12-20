/**
 * Gemini AI API Stub
 * 
 * PURPOSE: Stubs the Google Generative AI (Gemini) API to return fixed
 * responses without making actual API calls. This is essential for testing
 * the plant diagnosis and identification API routes.
 * 
 * ROLE IN SCAFFOLDING: Replaces the external AI dependency with predictable
 * responses, ensuring tests are fast, reliable, and don't consume API quota.
 */

/**
 * Plant diagnosis result structure
 */
interface DiagnosisResult {
  isHealthy: boolean;
  issue: string;
  severity: 'none' | 'low' | 'medium' | 'high';
  description: string;
  symptoms: string[];
  treatment: {
    immediate: string[];
    longterm: string[];
  };
  prevention: string[];
}

/**
 * Plant identification result structure
 */
interface IdentificationResult {
  species: string;
  confidence: number;
  description: string;
  careInstructions: {
    watering: string;
    sunlight: string;
    temperature: string;
    humidity: string;
    soil: string;
  };
}

/**
 * Stub configuration options
 */
interface GeminiStubConfig {
  /** Fixed response for diagnosis requests */
  diagnosisResponse?: DiagnosisResult;
  /** Fixed response for identification requests */
  identificationResponse?: IdentificationResult;
  /** Whether to simulate an error */
  shouldError?: boolean;
  /** Error message if shouldError is true */
  errorMessage?: string;
}

/**
 * Default healthy plant diagnosis response
 */
const DEFAULT_HEALTHY_DIAGNOSIS: DiagnosisResult = {
  isHealthy: true,
  issue: 'Healthy Plant',
  severity: 'none',
  description: 'This plant appears to be in good health with no visible issues.',
  symptoms: [],
  treatment: {
    immediate: ['Continue current care routine'],
    longterm: ['Maintain consistent watering and lighting'],
  },
  prevention: ['Keep current care practices'],
};

/**
 * Default plant identification response
 */
const DEFAULT_IDENTIFICATION: IdentificationResult = {
  species: 'Monstera Deliciosa (Swiss Cheese Plant)',
  confidence: 95,
  description: 'A popular tropical houseplant known for its large, fenestrated leaves.',
  careInstructions: {
    watering: 'Water when top inch of soil is dry, about once a week.',
    sunlight: 'Bright, indirect light. Avoid direct sunlight.',
    temperature: '65-85°F (18-29°C)',
    humidity: 'Prefers 60%+ humidity',
    soil: 'Well-draining potting mix with peat moss',
  },
};

/**
 * Creates a Gemini AI API stub for module mocking
 * 
 * @param config - Configuration for stub behavior
 * @returns A module structure that can be used with vi.mock()
 * 
 * @example
 * ```typescript
 * vi.mock('@google/generative-ai', () => 
 *   createGeminiApiStub({
 *     diagnosisResponse: { isHealthy: false, issue: 'Root Rot', ... }
 *   })
 * );
 * ```
 */
export function createGeminiApiStub(config: GeminiStubConfig = {}) {
  const {
    diagnosisResponse = DEFAULT_HEALTHY_DIAGNOSIS,
    identificationResponse = DEFAULT_IDENTIFICATION,
    shouldError = false,
    errorMessage = 'API Error',
  } = config;

  return {
    GoogleGenerativeAI: class MockGoogleGenerativeAI {
      constructor(_apiKey: string) {}

      getGenerativeModel(_config: { model: string }) {
        return {
          generateContent: async (_contents: unknown[]) => {
            if (shouldError) {
              throw new Error(errorMessage);
            }

            // Determine which response to return based on prompt
            // This is a simplified heuristic
            const response = diagnosisResponse || identificationResponse;

            return {
              response: {
                text: () => JSON.stringify(response),
              },
            };
          },
        };
      }
    },
  };
}

/**
 * Pre-configured stubs for common test scenarios
 */
export const geminiStubs = {
  /** Returns a healthy plant diagnosis */
  healthyPlant: () => createGeminiApiStub({ diagnosisResponse: DEFAULT_HEALTHY_DIAGNOSIS }),

  /** Returns a diseased plant diagnosis */
  diseasedPlant: () => createGeminiApiStub({
    diagnosisResponse: {
      isHealthy: false,
      issue: 'Powdery Mildew',
      severity: 'medium',
      description: 'Fungal infection causing white powdery spots on leaves.',
      symptoms: ['White powder on leaves', 'Yellowing leaves'],
      treatment: {
        immediate: ['Remove affected leaves', 'Apply fungicide'],
        longterm: ['Improve air circulation', 'Avoid overhead watering'],
      },
      prevention: ['Ensure good ventilation', 'Water at soil level'],
    },
  }),

  /** Returns a plant identification */
  identifyMonstera: () => createGeminiApiStub({ identificationResponse: DEFAULT_IDENTIFICATION }),

  /** Simulates an API error */
  apiError: (message = 'API quota exceeded') => createGeminiApiStub({
    shouldError: true,
    errorMessage: message,
  }),
};

/**
 * Example usage in API route tests:
 * 
 * ```typescript
 * import { geminiStubs } from '../stubs/gemini-api.stub';
 * 
 * describe('diagnose-plant API', () => {
 *   it('should return healthy diagnosis', async () => {
 *     vi.mock('@google/generative-ai', () => geminiStubs.healthyPlant());
 *     // ... test implementation
 *   });
 * 
 *   it('should handle API errors gracefully', async () => {
 *     vi.mock('@google/generative-ai', () => geminiStubs.apiError('Rate limited'));
 *     // ... test error handling
 *   });
 * });
 * ```
 */
