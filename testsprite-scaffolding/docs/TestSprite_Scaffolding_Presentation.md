# TestSprite Scaffolding for Software Testing

## A Comprehensive Guide to Test Isolation Infrastructure

---

# Slide 1: What is Scaffolding in Testing?

**Scaffolding** is all the temporary code and structures required to test a module in isolation.

```
┌──────────────────────────────────────────────────┐
│                 Test Environment                  │
│  ┌─────────┐    ┌───────────────┐    ┌────────┐  │
│  │ DRIVER  │───▶│ Module Under  │◀───│ STUBS/ │  │
│  │(Caller) │    │  Test (MUT)   │    │ MOCKS  │  │
│  └─────────┘    └───────┬───────┘    └────────┘  │
│                         │                         │
│                    ┌────▼────┐                    │
│                    │ ORACLE  │                    │
│                    │(Assert) │                    │
│                    └─────────┘                    │
└──────────────────────────────────────────────────┘
```

**Purpose:** Ensure test failures are caused by bugs in the MUT, not its dependencies.

---

# Slide 2: The Four Pillars of Scaffolding

| Component  | Role                              | Real-World Analogy                    |
| ---------- | --------------------------------- | ------------------------------------- |
| **Driver** | Calls the MUT, provides inputs    | The person testing a car's engine     |
| **Stub**   | Returns fixed values              | A simulation replacing real parts     |
| **Mock**   | Tracks calls for verification     | A recorder that logs all interactions |
| **Fake**   | Simplified working implementation | A practice track instead of real road |

> **Key Insight:** Choose the right tool for each testing scenario

---

# Slide 3: Drivers - The Test Executors

A **Driver** orchestrates test execution by:

- Setting up the test environment
- Calling the Module Under Test
- Passing test data
- Capturing outputs

```typescript
// Component Driver Example
const driver = createComponentDriver({
  component: AddPlantModal,
  defaultProps: { onAdd: vi.fn(), onClose: vi.fn() },
});

const { getByText, click } = driver.render();
click(getByText("Add Plant"));
```

**When to use:** Every test needs a driver (often the test framework itself)

---

# Slide 4: Stubs - Simple Replacements

A **Stub** provides fixed return values without tracking calls.

```typescript
// LocalStorage Stub
const lsStub = createLocalStorageStub({
  user: '{"id":1,"email":"test@test.com"}',
});

// Always returns the same value
lsStub.getItem("user"); // → '{"id":1,...}'
```

### Characteristics:

- ✅ Simple and lightweight
- ✅ Returns predefined values
- ❌ Cannot verify HOW it was called
- ❌ No call tracking

**When to use:** When you only need controlled return values

---

# Slide 5: Mocks - Verification Capable

A **Mock** returns values AND tracks all method calls.

```typescript
// LocalStorage Mock
const lsMock = createLocalStorageMock();

// After test execution:
expect(lsMock.getItem).toHaveBeenCalledWith("user");
expect(lsMock.setItem).toHaveBeenCalledTimes(2);
```

### Characteristics:

- ✅ Returns predefined values
- ✅ Tracks method calls
- ✅ Enables behavioral verification
- ✅ Can assert on call arguments

**When to use:** When you need to verify interactions with dependencies

---

# Slide 6: Stub vs Mock - Key Difference

```
┌─────────────────────┬────────────────────────────────┐
│        STUB         │             MOCK               │
├─────────────────────┼────────────────────────────────┤
│ Returns fixed       │ Returns fixed values           │
│ values only         │ AND tracks calls               │
├─────────────────────┼────────────────────────────────┤
│ Cannot verify:      │ Can verify:                    │
│ "Was save() called?"│ expect(mock.save)              │
│                     │   .toHaveBeenCalled()          │
├─────────────────────┼────────────────────────────────┤
│ State Testing       │ Behavioral Testing             │
│ "What is result?"   │ "How was it achieved?"         │
└─────────────────────┴────────────────────────────────┘
```

> **Rule of thumb:** Use stubs when you don't care HOW, mocks when you DO care

---

# Slide 7: Fakes - Working Implementations

A **Fake** is a simplified but functional implementation.

```typescript
// Fake Auth Service - Actually validates credentials!
const authFake = createAuthServiceFake();

authFake.register("user@test.com", "pass123"); // Creates user
authFake.login("user@test.com", "pass123"); // Validates
authFake.isAuthenticated(); // Returns true
```

### Characteristics:

- ✅ Real logic, simplified
- ✅ Maintains state
- ✅ No external dependencies
- ✅ Great for integration tests

**When to use:** When testing complex interactions that depend on state

---

# Slide 8: Fixtures - Test Data Factories

**Fixtures** generate consistent, reusable test data.

```typescript
// Plant Fixture Factory
const plant = createPlantFixture({
  name: "My Rose",
  healthStatus: "healthy",
});

// Pre-defined scenarios
const sickPlant = plantFixtures.rootRot();
const healthyPlant = plantFixtures.healthy();
```

### Benefits:

- ✅ Consistent test data
- ✅ Reduces duplication
- ✅ Easy to read tests
- ✅ Centralized data definitions

---

# Slide 9: Complete Scaffolding Example

```typescript
describe("useAuth logout", () => {
  // 1. FIXTURE: Create test data
  const testUser = userFixtures.experiencedUser();

  // 2. MOCK: Track localStorage calls
  const lsMock = createLocalStorageMock({
    user: JSON.stringify(testUser),
  });

  // 3. DRIVER: Execute the hook
  const { result, act } = createHookDriver({ hook: useAuth }).render();

  // 4. ACTION: Trigger logout
  act(() => result.current.logout());

  // 5. ORACLE: Verify behavior
  expect(lsMock.removeItem).toHaveBeenCalledWith("user");
  expect(result.current.user).toBeNull();
});
```

---

# Slide 10: Flora Care Scaffolding Structure

```
testsprite-scaffolding/
├── drivers/
│   ├── component-driver.ts    # React component testing
│   ├── api-driver.ts          # API route testing
│   └── hook-driver.ts         # React hook testing
├── stubs/
│   ├── localStorage.stub.ts   # Browser storage stub
│   ├── router.stub.ts         # Next.js router stub
│   └── gemini-api.stub.ts     # AI API stub
├── mocks/
│   ├── localStorage.mock.ts   # With call tracking
│   ├── fetch.mock.ts          # HTTP request mock
│   └── gemini-api.mock.ts     # AI API mock
├── fakes/
│   ├── auth-service.fake.ts   # In-memory auth
│   └── plant-database.fake.ts # In-memory database
└── fixtures/
    ├── plant.fixture.ts       # Plant test data
    ├── user.fixture.ts        # User test data
    └── diagnosis.fixture.ts   # Diagnosis results
```

---

# Slide 11: How to Use TestSprite Scaffolding

## Step 1: Identify the Module Under Test (MUT)

```typescript
// Example: Testing AddPlantModal component
```

## Step 2: Identify Dependencies

```typescript
// Dependencies: onAdd callback, onClose callback
```

## Step 3: Choose Scaffolding Type

- Need fixed values? → Use **Stub**
- Need to verify calls? → Use **Mock**
- Need working logic? → Use **Fake**

## Step 4: Create/Use Fixtures for Test Data

```typescript
const plant = createPlantFixture({ name: "Test Plant" });
```

---

# Slide 12: Best Practices

### DO ✅

- Use fixtures for consistent test data
- Use stubs when verification isn't needed
- Use mocks to verify interactions
- Use fakes for complex integration scenarios
- Keep scaffolding code simple and focused

### DON'T ❌

- Don't mock everything - only external dependencies
- Don't use mocks when stubs suffice (KISS)
- Don't skip creating fixtures for complex data
- Don't duplicate scaffolding across tests

---

# Slide 13: Summary

| Scenario                | Use This    | Why                              |
| ----------------------- | ----------- | -------------------------------- |
| Need to call the MUT    | **Driver**  | Orchestrates test execution      |
| Need controlled returns | **Stub**    | Simple, no tracking overhead     |
| Need to verify calls    | **Mock**    | Tracks and verifies interactions |
| Need working behavior   | **Fake**    | Simplified real implementation   |
| Need test data          | **Fixture** | Consistent, reusable data        |

> **Scaffolding = Driver + Test Doubles + Fixtures + Oracle**

---

# Slide 14: Resources

- **Scaffolding Code:** `testsprite-scaffolding/` folder
- **Examples:** See JSDoc comments in each file
- **Video Demo:** See accompanying demonstration

## Quick Start

```typescript
import { createComponentDriver } from "./drivers/component-driver";
import { createLocalStorageMock } from "./mocks/localStorage.mock";
import { plantFixtures } from "./fixtures/plant.fixture";
```

---

# Thank You!

## Questions?

**Flora Care Web Platform - TestSprite Scaffolding**
_Empowering reliable, isolated testing_
