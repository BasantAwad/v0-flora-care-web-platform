/**
 * Plant Fixture
 * 
 * PURPOSE: Fixtures are factory functions that generate consistent test data.
 * They provide a centralized way to create test objects, reducing duplication
 * and making tests easier to read and maintain.
 * 
 * ROLE IN SCAFFOLDING: Provides ready-to-use plant data for tests, with
 * sensible defaults that can be overridden as needed.
 */

/**
 * Plant interface matching the application's plant structure
 */
export interface Plant {
  id?: number;
  name: string;
  species: string;
  lastWatered: string;
  nextWatering: string;
  healthStatus: 'healthy' | 'warning' | 'critical';
  image: string;
}

/**
 * Default values for plant fixtures
 */
const defaults: Plant = {
  name: 'Test Plant',
  species: 'Test Species',
  lastWatered: new Date().toISOString().split('T')[0],
  nextWatering: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  healthStatus: 'healthy',
  image: '/potted-plant.png',
};

/**
 * Creates a plant fixture with optional overrides
 * 
 * @param overrides - Properties to override from defaults
 * @returns A complete plant object
 * 
 * @example
 * ```typescript
 * // Create with all defaults
 * const plant = createPlantFixture();
 * 
 * // Create with specific overrides
 * const sickPlant = createPlantFixture({
 *   name: 'Wilting Rose',
 *   healthStatus: 'critical'
 * });
 * ```
 */
export function createPlantFixture(overrides: Partial<Plant> = {}): Plant {
  return {
    ...defaults,
    ...overrides,
  };
}

/**
 * Pre-defined plant fixtures for common test scenarios
 */
export const plantFixtures = {
  /**
   * A healthy plant with good status
   */
  healthy: (): Plant => createPlantFixture({
    name: 'Healthy Monstera',
    species: 'Monstera Deliciosa',
    healthStatus: 'healthy',
  }),

  /**
   * A plant needing attention
   */
  needsAttention: (): Plant => createPlantFixture({
    name: 'Thirsty Fern',
    species: 'Boston Fern',
    healthStatus: 'warning',
    lastWatered: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    nextWatering: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  }),

  /**
   * A plant in critical condition
   */
  critical: (): Plant => createPlantFixture({
    name: 'Dying Cactus',
    species: 'Opuntia',
    healthStatus: 'critical',
  }),

  /**
   * A plant that needs watering today
   */
  needsWaterToday: (): Plant => createPlantFixture({
    name: 'Thirsty Today',
    species: 'Snake Plant',
    nextWatering: new Date().toISOString().split('T')[0],
  }),

  /**
   * A recently watered plant
   */
  justWatered: (): Plant => createPlantFixture({
    name: 'Just Watered',
    species: 'Pothos',
    lastWatered: new Date().toISOString().split('T')[0],
    nextWatering: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  }),
};

/**
 * Creates a batch of plant fixtures
 * 
 * @param count - Number of plants to create
 * @param overrides - Properties to apply to all plants
 * @returns Array of plant fixtures
 */
export function createPlantFixtures(count: number, overrides: Partial<Plant> = {}): Plant[] {
  return Array.from({ length: count }, (_, index) =>
    createPlantFixture({
      ...overrides,
      name: overrides.name ?? `Plant ${index + 1}`,
    })
  );
}

/**
 * Creates a mixed collection of plants with different statuses
 * Useful for testing dashboard displays and filtering
 */
export function createMixedPlantCollection(): Plant[] {
  return [
    plantFixtures.healthy(),
    plantFixtures.healthy(),
    plantFixtures.needsAttention(),
    plantFixtures.critical(),
    plantFixtures.needsWaterToday(),
  ];
}

/**
 * Example usage in tests:
 * 
 * ```typescript
 * import { createPlantFixture, plantFixtures, createMixedPlantCollection } from '../fixtures/plant.fixture';
 * 
 * describe('PlantCard', () => {
 *   it('should display healthy plant correctly', () => {
 *     const plant = plantFixtures.healthy();
 *     render(<PlantCard plant={plant} />);
 *     expect(screen.getByText('Healthy Monstera')).toBeInTheDocument();
 *   });
 * 
 *   it('should show warning badge for plants needing attention', () => {
 *     const plant = plantFixtures.needsAttention();
 *     render(<PlantCard plant={plant} />);
 *     expect(screen.getByText('Needs Attention')).toBeInTheDocument();
 *   });
 * });
 * 
 * describe('Dashboard', () => {
 *   it('should display plants grouped by status', () => {
 *     const plants = createMixedPlantCollection();
 *     render(<Dashboard plants={plants} />);
 *     expect(screen.getByText('2 Healthy')).toBeInTheDocument();
 *     expect(screen.getByText('1 Critical')).toBeInTheDocument();
 *   });
 * });
 * ```
 */
