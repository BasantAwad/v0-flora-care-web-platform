/**
 * User Fixture
 * 
 * PURPOSE: Generates consistent user test data with sensible defaults
 * and pre-defined scenarios for common testing needs.
 * 
 * ROLE IN SCAFFOLDING: Provides user objects for authentication tests,
 * component rendering, and integration scenarios.
 */

/**
 * User interface matching the application's user structure
 */
export interface User {
  id: number;
  email: string;
  username?: string;
  points?: number;
  badges?: string[];
}

/**
 * Default values for user fixtures
 */
const defaults: User = {
  id: 1,
  email: 'test@example.com',
  username: 'testuser',
  points: 0,
  badges: [],
};

/**
 * Creates a user fixture with optional overrides
 * 
 * @param overrides - Properties to override from defaults
 * @returns A complete user object
 */
export function createUserFixture(overrides: Partial<User> = {}): User {
  return {
    ...defaults,
    ...overrides,
  };
}

/**
 * Pre-defined user fixtures for common test scenarios
 */
export const userFixtures = {
  /**
   * A new user with no achievements
   */
  newUser: (): User => createUserFixture({
    id: 1,
    email: 'newuser@example.com',
    username: 'newuser',
    points: 0,
    badges: [],
  }),

  /**
   * An experienced user with achievements
   */
  experiencedUser: (): User => createUserFixture({
    id: 2,
    email: 'expert@example.com',
    username: 'plantexpert',
    points: 1500,
    badges: ['Green Thumb', 'Plant Saver', 'Community Helper'],
  }),

  /**
   * A user with moderate progress
   */
  intermediateUser: (): User => createUserFixture({
    id: 3,
    email: 'intermediate@example.com',
    username: 'gardenlearner',
    points: 500,
    badges: ['First Plant'],
  }),

  /**
   * A user without username (email only)
   */
  emailOnlyUser: (): User => createUserFixture({
    id: 4,
    email: 'emailonly@example.com',
    username: undefined,
  }),

  /**
   * An admin/power user
   */
  adminUser: (): User => createUserFixture({
    id: 99,
    email: 'admin@floracare.com',
    username: 'admin',
    points: 10000,
    badges: ['Admin', 'Founder', 'Expert', 'Community Leader'],
  }),
};

/**
 * Creates a batch of unique user fixtures
 * 
 * @param count - Number of users to create
 * @param template - Base properties for all users
 * @returns Array of user fixtures with unique IDs and emails
 */
export function createUserFixtures(count: number, template: Partial<User> = {}): User[] {
  return Array.from({ length: count }, (_, index) =>
    createUserFixture({
      ...template,
      id: index + 1,
      email: `user${index + 1}@example.com`,
      username: template.username ?? `user${index + 1}`,
    })
  );
}

/**
 * Example usage:
 * 
 * ```typescript
 * import { userFixtures, createUserFixture } from '../fixtures/user.fixture';
 * 
 * describe('Profile Page', () => {
 *   it('should display user achievements', () => {
 *     const user = userFixtures.experiencedUser();
 *     render(<ProfilePage user={user} />);
 *     expect(screen.getByText('1500 points')).toBeInTheDocument();
 *     expect(screen.getByText('Green Thumb')).toBeInTheDocument();
 *   });
 * 
 *   it('should show welcome message for new users', () => {
 *     const user = userFixtures.newUser();
 *     render(<ProfilePage user={user} />);
 *     expect(screen.getByText('Welcome to Flora Care!')).toBeInTheDocument();
 *   });
 * });
 * ```
 */
