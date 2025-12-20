# TestSprite Scaffolding for Flora Care Web Platform

This folder contains the complete **testing scaffolding infrastructure** for the Flora Care Web Platform, created using TestSprite tool concepts.

---

## 🏗 What is Scaffolding in Testing?

Scaffolding is **temporary code and structures** required to enable a specific module of a system to be tested in isolation. It is the supporting framework—composed of **Drivers**, **Stubs**, **Mocks**, and **Fakes**—that allows a testing tool to provide inputs to the code being tested and capture the outputs, while replacing all external dependencies.

---

## 📁 Folder Structure

```
testsprite-scaffolding/
├── drivers/           # Test drivers that orchestrate test execution
├── stubs/             # Simple dependency replacements with fixed returns
├── mocks/             # Dependency replacements with verification capabilities
├── fakes/             # Simplified working implementations
├── fixtures/          # Test data factories and sample data
└── docs/              # Documentation and presentation materials
```

---

## 🧩 Scaffolding Components

| Component   | Role                                                 | Location           |
| ----------- | ---------------------------------------------------- | ------------------ |
| **Driver**  | Calls the MUT, passes test data, initiates execution | `drivers/`         |
| **Stub**    | Replaces dependencies with fixed return values       | `stubs/`           |
| **Mock**    | Replaces dependencies, allows call verification      | `mocks/`           |
| **Fake**    | Provides simplified but functional behavior          | `fakes/`           |
| **Fixture** | Generates consistent test data                       | `fixtures/`        |
| **Oracle**  | Assertion logic (built into test frameworks)         | Built-in to Vitest |

---

## 🚀 Quick Start

### Using a Stub

```typescript
import { createLocalStorageStub } from "./stubs/localStorage.stub";

// Replace localStorage with stub
const lsStub = createLocalStorageStub({ user: '{"id":1}' });
```

### Using a Mock

```typescript
import { createLocalStorageMock } from "./mocks/localStorage.mock";

const lsMock = createLocalStorageMock();
// ... run tests ...
expect(lsMock.getItem).toHaveBeenCalledWith("user");
```

### Using a Fixture

```typescript
import {
  createPlantFixture,
  createHealthyPlant,
} from "./fixtures/plant.fixture";

const plant = createPlantFixture({ name: "My Rose" });
const healthyPlant = createHealthyPlant();
```

---

## 📖 Documentation

See `docs/TestSprite_Scaffolding_Presentation.md` for a comprehensive presentation on scaffolding concepts and usage.

---

## 🎯 Modules Under Test (MUT)

This scaffolding supports testing the following modules:

1. **`useAuth` Hook** - Authentication state management
2. **`AddPlantModal` Component** - Plant creation form
3. **`diagnose-plant` API** - AI-powered plant diagnosis
4. **`identify-plant` API** - AI-powered plant identification
5. **`PlantCard` Component** - Plant display card
6. **`ForumPostCard` Component** - Forum post display
