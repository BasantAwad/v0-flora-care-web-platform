/**
 * Diagnosis Fixture
 * 
 * PURPOSE: Generates consistent plant diagnosis result data for testing
 * the diagnosis feature, result display components, and error handling.
 * 
 * ROLE IN SCAFFOLDING: Provides diagnosis response objects that match
 * the API response structure from the Gemini AI.
 */

/**
 * Treatment instructions interface
 */
interface Treatment {
  immediate: string[];
  longterm: string[];
}

/**
 * Diagnosis result interface matching the API response
 */
export interface DiagnosisResult {
  isHealthy: boolean;
  issue: string;
  severity: 'none' | 'low' | 'medium' | 'high';
  description: string;
  symptoms: string[];
  treatment: Treatment;
  prevention: string[];
}

/**
 * Plant identification result interface
 */
export interface IdentificationResult {
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
 * Creates a diagnosis result fixture with optional overrides
 */
export function createDiagnosisFixture(overrides: Partial<DiagnosisResult> = {}): DiagnosisResult {
  const defaults: DiagnosisResult = {
    isHealthy: true,
    issue: 'Healthy Plant',
    severity: 'none',
    description: 'Your plant appears to be in excellent health with no visible issues.',
    symptoms: [],
    treatment: {
      immediate: ['Continue current care routine'],
      longterm: ['Maintain consistent watering schedule'],
    },
    prevention: [
      'Monitor soil moisture regularly',
      'Ensure adequate lighting',
      'Check for pests weekly',
    ],
  };

  return { ...defaults, ...overrides };
}

/**
 * Pre-defined diagnosis fixtures for common scenarios
 */
export const diagnosisFixtures = {
  /**
   * A completely healthy plant diagnosis
   */
  healthy: (): DiagnosisResult => createDiagnosisFixture(),

  /**
   * Minor issue - overwatering
   */
  overwatering: (): DiagnosisResult => createDiagnosisFixture({
    isHealthy: false,
    issue: 'Overwatering',
    severity: 'low',
    description: 'Signs of overwatering detected. Leaves may be yellowing at the base.',
    symptoms: ['Yellow lower leaves', 'Soft stems', 'Soggy soil'],
    treatment: {
      immediate: ['Allow soil to dry completely before next watering'],
      longterm: ['Reduce watering frequency', 'Ensure pot has drainage holes'],
    },
    prevention: ['Check soil moisture before watering', 'Use well-draining soil mix'],
  }),

  /**
   * Medium issue - fungal infection
   */
  fungalInfection: (): DiagnosisResult => createDiagnosisFixture({
    isHealthy: false,
    issue: 'Powdery Mildew',
    severity: 'medium',
    description: 'Fungal infection causing white, powdery patches on leaves.',
    symptoms: ['White powdery coating', 'Distorted new growth', 'Yellowing leaves'],
    treatment: {
      immediate: ['Remove severely affected leaves', 'Isolate from other plants'],
      longterm: ['Apply fungicide spray', 'Improve air circulation'],
    },
    prevention: ['Avoid overhead watering', 'Space plants adequately', 'Ensure good ventilation'],
  }),

  /**
   * Severe issue - root rot
   */
  rootRot: (): DiagnosisResult => createDiagnosisFixture({
    isHealthy: false,
    issue: 'Root Rot',
    severity: 'high',
    description: 'Severe root rot detected. Immediate action required to save the plant.',
    symptoms: ['Wilting despite wet soil', 'Black/mushy roots', 'Foul smell from soil', 'Dropping leaves'],
    treatment: {
      immediate: ['Remove from pot immediately', 'Trim all affected roots', 'Repot in fresh, sterile soil'],
      longterm: ['Reduce watering frequency significantly', 'Ensure proper drainage'],
    },
    prevention: ['Never let plant sit in standing water', 'Use pots with drainage holes'],
  }),

  /**
   * Pest infestation
   */
  pestInfestation: (): DiagnosisResult => createDiagnosisFixture({
    isHealthy: false,
    issue: 'Spider Mite Infestation',
    severity: 'medium',
    description: 'Spider mites detected. These tiny pests can spread quickly to other plants.',
    symptoms: ['Fine webbing on leaves', 'Stippled/speckled leaves', 'Brown spots'],
    treatment: {
      immediate: ['Wash leaves with water', 'Isolate the plant', 'Apply neem oil or insecticidal soap'],
      longterm: ['Increase humidity around plant', 'Regularly inspect for reinfestation'],
    },
    prevention: ['Maintain higher humidity', 'Regularly inspect new plants', 'Quarantine new additions'],
  }),
};

/**
 * Creates an identification result fixture
 */
export function createIdentificationFixture(overrides: Partial<IdentificationResult> = {}): IdentificationResult {
  const defaults: IdentificationResult = {
    species: 'Monstera Deliciosa (Swiss Cheese Plant)',
    confidence: 95,
    description: 'A popular tropical houseplant known for its large, glossy leaves with natural holes.',
    careInstructions: {
      watering: 'Water when top 2 inches of soil are dry, typically every 1-2 weeks.',
      sunlight: 'Bright, indirect light. Can tolerate some shade.',
      temperature: '65-85°F (18-30°C). Keep away from cold drafts.',
      humidity: 'Prefers 60%+ humidity. Mist occasionally or use a humidifier.',
      soil: 'Well-draining potting mix with perlite or orchid bark.',
    },
  };

  return { ...defaults, ...overrides };
}

/**
 * Pre-defined identification fixtures
 */
export const identificationFixtures = {
  monstera: (): IdentificationResult => createIdentificationFixture(),

  snakePlant: (): IdentificationResult => createIdentificationFixture({
    species: 'Dracaena Trifasciata (Snake Plant)',
    confidence: 98,
    description: 'An extremely hardy succulent with tall, stiff leaves.',
    careInstructions: {
      watering: 'Water every 2-6 weeks. Allow soil to dry completely.',
      sunlight: 'Tolerates low to bright indirect light.',
      temperature: '60-85°F (15-29°C). Avoid temperatures below 50°F.',
      humidity: 'Adaptable to any humidity level.',
      soil: 'Well-draining cactus or succulent mix.',
    },
  }),

  lowConfidence: (): IdentificationResult => createIdentificationFixture({
    species: 'Unknown Fern Species',
    confidence: 45,
    description: 'Unable to make a confident identification. Please provide a clearer image.',
    careInstructions: {
      watering: 'General fern care: Keep soil consistently moist.',
      sunlight: 'Indirect light preferred.',
      temperature: 'Average room temperature.',
      humidity: 'Most ferns prefer higher humidity.',
      soil: 'Rich, well-draining potting mix.',
    },
  }),
};

/**
 * Example usage:
 * 
 * ```typescript
 * import { diagnosisFixtures, identificationFixtures } from '../fixtures/diagnosis.fixture';
 * 
 * describe('DiagnosisResult component', () => {
 *   it('should show healthy badge for healthy plants', () => {
 *     render(<DiagnosisResult result={diagnosisFixtures.healthy()} />);
 *     expect(screen.getByText('Healthy Plant')).toBeInTheDocument();
 *   });
 * 
 *   it('should show critical warning for severe issues', () => {
 *     render(<DiagnosisResult result={diagnosisFixtures.rootRot()} />);
 *     expect(screen.getByText('High Severity')).toHaveClass('text-red-500');
 *   });
 * });
 * ```
 */
