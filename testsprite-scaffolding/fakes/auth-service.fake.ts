/**
 * Auth Service Fake
 * 
 * PURPOSE: A fake is a simplified but functional implementation of a dependency.
 * Unlike stubs (which return fixed values) or mocks (which track calls), fakes
 * actually implement the behavior of the real service in a simplified way.
 * 
 * ROLE IN SCAFFOLDING: Provides a working in-memory authentication service
 * that behaves like the real thing but doesn't require external infrastructure.
 * 
 * WHEN TO USE FAKES:
 * - When you need the dependency to actually work, not just return canned values
 * - When testing complex interactions that depend on state changes
 * - When integration testing multiple components together
 */

/**
 * User interface
 */
export interface User {
  id: number;
  email: string;
  username?: string;
  password?: string; // Only used internally for authentication
  points?: number;
  badges?: string[];
}

/**
 * Auth result interface
 */
interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

/**
 * Fake authentication service
 */
interface FakeAuthService {
  /** Register a new user */
  register: (email: string, password: string, username?: string) => AuthResult;
  /** Login with credentials */
  login: (email: string, password: string) => AuthResult;
  /** Logout current user */
  logout: () => void;
  /** Get current logged-in user */
  getCurrentUser: () => User | null;
  /** Check if user is authenticated */
  isAuthenticated: () => boolean;
  /** Update user profile */
  updateUser: (updates: Partial<User>) => AuthResult;
  /** Add points to user */
  addPoints: (points: number) => void;
  /** Award badge to user */
  awardBadge: (badge: string) => void;
  /** Reset the fake service state */
  reset: () => void;
  /** Get all registered users (for testing) */
  getAllUsers: () => User[];
}

/**
 * Creates a fake authentication service
 * 
 * This fake maintains real state and implements actual logic, unlike stubs
 * which just return fixed values. It's useful for integration testing.
 * 
 * @param initialUsers - Optional list of pre-registered users
 * @returns A functional fake auth service
 * 
 * @example
 * ```typescript
 * const authFake = createAuthServiceFake([
 *   { id: 1, email: 'existing@test.com', password: 'password123' }
 * ]);
 * 
 * // Actually performs registration logic
 * const result = authFake.register('new@test.com', 'pass123');
 * expect(result.success).toBe(true);
 * expect(authFake.getAllUsers()).toHaveLength(2);
 * 
 * // Actually validates credentials
 * const loginResult = authFake.login('new@test.com', 'pass123');
 * expect(loginResult.success).toBe(true);
 * expect(authFake.isAuthenticated()).toBe(true);
 * ```
 */
export function createAuthServiceFake(initialUsers: User[] = []): FakeAuthService {
  // Internal state
  let users: User[] = initialUsers.map((u) => ({ ...u }));
  let currentUser: User | null = null;
  let nextId = Math.max(0, ...users.map((u) => u.id)) + 1;

  return {
    register(email: string, password: string, username?: string): AuthResult {
      // Check if email already exists
      if (users.some((u) => u.email === email)) {
        return { success: false, error: 'Email already registered' };
      }

      // Validate email format (simplified)
      if (!email.includes('@')) {
        return { success: false, error: 'Invalid email format' };
      }

      // Validate password length
      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
      }

      // Create new user
      const newUser: User = {
        id: nextId++,
        email,
        password, // In real app, this would be hashed
        username: username ?? email.split('@')[0],
        points: 0,
        badges: [],
      };

      users.push(newUser);
      currentUser = { ...newUser };
      delete currentUser.password; // Don't expose password

      return { success: true, user: currentUser };
    },

    login(email: string, password: string): AuthResult {
      const user = users.find((u) => u.email === email && u.password === password);

      if (!user) {
        return { success: false, error: 'Invalid credentials' };
      }

      currentUser = { ...user };
      delete currentUser.password;

      return { success: true, user: currentUser };
    },

    logout(): void {
      currentUser = null;
    },

    getCurrentUser(): User | null {
      return currentUser ? { ...currentUser } : null;
    },

    isAuthenticated(): boolean {
      return currentUser !== null;
    },

    updateUser(updates: Partial<User>): AuthResult {
      if (!currentUser) {
        return { success: false, error: 'Not authenticated' };
      }

      // Find and update the stored user
      const userIndex = users.findIndex((u) => u.id === currentUser!.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updates };
        currentUser = { ...users[userIndex] };
        delete currentUser.password;
      }

      return { success: true, user: currentUser };
    },

    addPoints(points: number): void {
      if (currentUser) {
        currentUser.points = (currentUser.points ?? 0) + points;
        const userIndex = users.findIndex((u) => u.id === currentUser!.id);
        if (userIndex !== -1) {
          users[userIndex].points = currentUser.points;
        }
      }
    },

    awardBadge(badge: string): void {
      if (currentUser) {
        currentUser.badges = [...(currentUser.badges ?? []), badge];
        const userIndex = users.findIndex((u) => u.id === currentUser!.id);
        if (userIndex !== -1) {
          users[userIndex].badges = currentUser.badges;
        }
      }
    },

    reset(): void {
      users = [];
      currentUser = null;
      nextId = 1;
    },

    getAllUsers(): User[] {
      return users.map((u) => {
        const copy = { ...u };
        delete copy.password;
        return copy;
      });
    },
  };
}

/**
 * Example showing difference between Stub, Mock, and Fake:
 * 
 * ```typescript
 * // STUB: Fixed return value, no logic
 * const authStub = { getCurrentUser: () => ({ id: 1, email: 'test@test.com' }) };
 * 
 * // MOCK: Fixed return + call tracking
 * const authMock = { getCurrentUser: vi.fn(() => ({ id: 1, email: 'test@test.com' })) };
 * 
 * // FAKE: Actual implementation with state
 * const authFake = createAuthServiceFake();
 * authFake.register('test@test.com', 'password123');  // Actually registers
 * authFake.login('test@test.com', 'password123');     // Actually validates
 * authFake.getCurrentUser();                           // Returns based on state
 * ```
 */
