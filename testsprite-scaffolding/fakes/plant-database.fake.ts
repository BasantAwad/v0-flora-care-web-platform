/**
 * Plant Database Fake
 * 
 * PURPOSE: A fake is a simplified working implementation of a service.
 * This fake provides an in-memory plant database that mimics real database
 * operations (CRUD) without requiring an actual database.
 * 
 * ROLE IN SCAFFOLDING: Allows testing code that interacts with plant data
 * storage without setting up a real database.
 */

/**
 * Plant entity interface
 */
export interface Plant {
  id: number;
  userId: number;
  name: string;
  species: string;
  lastWatered: string;
  nextWatering: string;
  healthStatus: 'healthy' | 'warning' | 'critical';
  image: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Plant input for creation
 */
export type PlantInput = Omit<Plant, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Fake plant database interface
 */
interface FakePlantDatabase {
  /** Create a new plant */
  create: (input: PlantInput) => Plant;
  /** Get plant by ID */
  getById: (id: number) => Plant | null;
  /** Get all plants for a user */
  getByUserId: (userId: number) => Plant[];
  /** Get all plants (admin) */
  getAll: () => Plant[];
  /** Update a plant */
  update: (id: number, updates: Partial<PlantInput>) => Plant | null;
  /** Delete a plant */
  delete: (id: number) => boolean;
  /** Find plants by health status */
  findByHealthStatus: (status: Plant['healthStatus']) => Plant[];
  /** Find plants needing water today */
  findNeedingWater: () => Plant[];
  /** Reset the database */
  reset: () => void;
  /** Seed with test data */
  seed: (plants: Partial<Plant>[]) => void;
}

/**
 * Creates a fake plant database with full CRUD operations
 * 
 * @param initialData - Optional initial plants to populate the database
 * @returns A functional fake database
 * 
 * @example
 * ```typescript
 * const dbFake = createPlantDatabaseFake();
 * 
 * // Create a plant
 * const plant = dbFake.create({
 *   userId: 1,
 *   name: 'My Monstera',
 *   species: 'Monstera Deliciosa',
 *   lastWatered: '2024-01-15',
 *   nextWatering: '2024-01-18',
 *   healthStatus: 'healthy',
 *   image: '/plant.jpg'
 * });
 * 
 * expect(plant.id).toBeDefined();
 * expect(dbFake.getAll()).toHaveLength(1);
 * ```
 */
export function createPlantDatabaseFake(initialData: Partial<Plant>[] = []): FakePlantDatabase {
  let plants: Plant[] = [];
  let nextId = 1;

  // Helper to create timestamps
  const now = () => new Date().toISOString();

  // Initialize with seed data
  const seed = (data: Partial<Plant>[]) => {
    data.forEach((p) => {
      plants.push({
        id: nextId++,
        userId: p.userId ?? 1,
        name: p.name ?? 'Unknown Plant',
        species: p.species ?? 'Unknown Species',
        lastWatered: p.lastWatered ?? now().split('T')[0],
        nextWatering: p.nextWatering ?? now().split('T')[0],
        healthStatus: p.healthStatus ?? 'healthy',
        image: p.image ?? '/potted-plant.png',
        createdAt: p.createdAt ?? now(),
        updatedAt: p.updatedAt ?? now(),
      });
    });
  };

  // Initialize with any provided data
  if (initialData.length > 0) {
    seed(initialData);
  }

  return {
    create(input: PlantInput): Plant {
      const plant: Plant = {
        ...input,
        id: nextId++,
        createdAt: now(),
        updatedAt: now(),
      };
      plants.push(plant);
      return { ...plant };
    },

    getById(id: number): Plant | null {
      const plant = plants.find((p) => p.id === id);
      return plant ? { ...plant } : null;
    },

    getByUserId(userId: number): Plant[] {
      return plants.filter((p) => p.userId === userId).map((p) => ({ ...p }));
    },

    getAll(): Plant[] {
      return plants.map((p) => ({ ...p }));
    },

    update(id: number, updates: Partial<PlantInput>): Plant | null {
      const index = plants.findIndex((p) => p.id === id);
      if (index === -1) return null;

      plants[index] = {
        ...plants[index],
        ...updates,
        updatedAt: now(),
      };

      return { ...plants[index] };
    },

    delete(id: number): boolean {
      const index = plants.findIndex((p) => p.id === id);
      if (index === -1) return false;

      plants.splice(index, 1);
      return true;
    },

    findByHealthStatus(status: Plant['healthStatus']): Plant[] {
      return plants.filter((p) => p.healthStatus === status).map((p) => ({ ...p }));
    },

    findNeedingWater(): Plant[] {
      const today = new Date().toISOString().split('T')[0];
      return plants
        .filter((p) => p.nextWatering <= today)
        .map((p) => ({ ...p }));
    },

    reset(): void {
      plants = [];
      nextId = 1;
    },

    seed,
  };
}

/**
 * Example usage in My Garden page tests:
 * 
 * ```typescript
 * import { createPlantDatabaseFake } from '../fakes/plant-database.fake';
 * 
 * describe('My Garden Page', () => {
 *   let dbFake: ReturnType<typeof createPlantDatabaseFake>;
 * 
 *   beforeEach(() => {
 *     dbFake = createPlantDatabaseFake();
 *     
 *     // Seed with test data
 *     dbFake.seed([
 *       { userId: 1, name: 'Healthy Rose', healthStatus: 'healthy' },
 *       { userId: 1, name: 'Wilting Fern', healthStatus: 'warning' },
 *       { userId: 2, name: 'Other User Plant', healthStatus: 'healthy' },
 *     ]);
 *   });
 * 
 *   it('should only show current user plants', () => {
 *     const user1Plants = dbFake.getByUserId(1);
 *     expect(user1Plants).toHaveLength(2);
 *     expect(user1Plants.every(p => p.userId === 1)).toBe(true);
 *   });
 * 
 *   it('should find plants needing attention', () => {
 *     const warningPlants = dbFake.findByHealthStatus('warning');
 *     expect(warningPlants).toHaveLength(1);
 *     expect(warningPlants[0].name).toBe('Wilting Fern');
 *   });
 * 
 *   it('should delete a plant', () => {
 *     const plants = dbFake.getAll();
 *     const result = dbFake.delete(plants[0].id);
 *     
 *     expect(result).toBe(true);
 *     expect(dbFake.getAll()).toHaveLength(2);
 *   });
 * });
 * ```
 */
