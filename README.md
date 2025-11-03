# Phrases Challenge App

A professional-grade React Native application built with Expo, demonstrating advanced React patterns, Clean Architecture, SOLID principles, and performance optimizations.

## 🏗️ Architecture

This project implements **Clean Architecture** with clear separation of concerns across four layers:

```
src/
├── core/              # Domain Layer (Business Logic)
│   ├── entities/      # Domain entities
│   ├── interfaces/    # Contracts and abstractions
│   └── use-cases/     # Business use cases
│
├── infrastructure/    # Infrastructure Layer (External Services)
│   ├── storage/       # Storage adapters
│   └── repositories/  # Repository implementations
│
├── application/       # Application Layer (State Management)
│   ├── state/         # Context and reducers
│   ├── hooks/         # Custom React hooks
│   └── services/      # Application services
│
└── presentation/      # Presentation Layer (UI)
    ├── screens/       # Screen components
    ├── components/    # Reusable UI components
    ├── hoc/           # Higher Order Components
    └── theme/         # Design tokens
```

## 🎯 Features

- ✅ Add phrases with validation
- ✅ Real-time search with debouncing
- ✅ Delete phrases with smooth animations
- ✅ Responsive grid layout (1-4 columns based on screen size)
- ✅ Persistent storage with AsyncStorage
- ✅ Error handling with Error Boundaries
- ✅ Search term highlighting
- ✅ Optimized performance with memoization
- ✅ Cross-platform (iOS, Android, Web)

## 🛠️ Tech Stack

- **Framework**: Expo SDK 54
- **Language**: TypeScript (strict mode)
- **State Management**: Context API + useReducer
- **Storage**: AsyncStorage
- **Testing**: Jest + React Testing Library
- **Styling**: React Native StyleSheet

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Expo CLI

### Installation

```bash
cd phrases-challenge-app
npm install
```

### Running the App

```bash
# Start Expo dev server
npm start

# Run on specific platform
npm run android
npm run ios
npm run web
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🎨 Design Patterns Implemented

### 1. **Repository Pattern**

Abstracts data access logic from business logic.

```typescript
interface IPhraseRepository {
  getAll(): Promise<Result<Phrase[]>>;
  add(phrase: Phrase): Promise<Result<Phrase>>;
  delete(id: string): Promise<Result<void>>;
}
```

### 2. **Use Case Pattern**

Encapsulates business logic in single-responsibility classes.

```typescript
class AddPhraseUseCase {
  constructor(private repository: IPhraseRepository) {}
  async execute(text: string): Promise<Result<Phrase>> {}
}
```

### 3. **Result Pattern**

Type-safe error handling without exceptions.

```typescript
type Result<T> = Success<T> | Failure;
```

### 4. **Dependency Injection**

Dependencies injected through Context API.

### 5. **Higher Order Component (HOC)**

`withErrorBoundary` wraps components with error handling.

### 6. **Observer Pattern**

Context API implements Observer for state management.

### 7. **Strategy Pattern**

Storage adapter allows swapping storage implementations.

## 🧩 SOLID Principles

### Single Responsibility Principle (SRP)

Each class/module has one reason to change:

- Use cases handle one specific business operation
- Components have single UI responsibility
- Hooks encapsulate specific logic

### Open/Closed Principle (OCP)

System is open for extension, closed for modification:

- HOCs extend functionality without modifying components
- Repository pattern allows different storage implementations

### Liskov Substitution Principle (LSP)

Interfaces can be substituted with implementations:

- `IPhraseRepository` can be implemented by any storage
- Components work with any data matching the interface

### Interface Segregation Principle (ISP)

Small, focused interfaces:

- `IStorage` interface only defines storage operations
- Component props are minimal and specific

### Dependency Inversion Principle (DIP)

Depend on abstractions, not concretions:

- Use cases depend on `IPhraseRepository` interface
- Components receive dependencies via Context

## ⚡ Performance Optimizations

### 1. **Memoization**

```typescript
// Components
React.memo(PhraseCard, (prev, next) => prev.phrase.id === next.phrase.id);

// Computed values
useMemo(() => filterPhrases(phrases, searchTerm), [phrases, searchTerm]);

// Callbacks
useCallback((id) => deletePhrase(id), [deletePhrase]);
```

### 2. **Debouncing**

Search input debounced by 300ms to reduce re-renders.

### 3. **FlatList Optimizations**

- `removeClippedSubviews={true}`
- `maxToRenderPerBatch={10}`
- `windowSize={5}`
- `initialNumToRender={10}`

### 4. **React 18 Concurrent Features**

- `useTransition` for non-urgent updates
- `useDeferredValue` for search filtering

### 5. **Lazy Initialization**

Expensive computations use lazy initialization in `useState`.

### 6. **Code Splitting** (Web)

`React.lazy` for screen-level code splitting.

## 🧪 Testing Strategy

### Unit Tests

- Use cases (business logic)
- Reducers (pure functions)
- Utilities and helpers

### Integration Tests

- Custom hooks
- Context providers

### Component Tests

- Rendering behavior
- User interactions
- Props validation

**Current Coverage**: >80% across all metrics

## 📚 Advanced React Concepts

### Hooks Used

- `useReducer` - Complex state management
- `useContext` - Dependency injection
- `useMemo` - Expensive computations
- `useCallback` - Stable references
- `useRef` - Mutable values
- `useTransition` - Concurrent updates
- Custom hooks - Logic composition

### Patterns Demonstrated

- Compound components
- Render props
- HOC (Higher Order Components)
- Custom hooks
- Error boundaries
- Context splitting

## 🔧 ES6+ Features

- ✅ Destructuring
- ✅ Spread/Rest operators
- ✅ Arrow functions
- ✅ Template literals
- ✅ Optional chaining (`?.`)
- ✅ Nullish coalescing (`??`)
- ✅ Async/Await
- ✅ Promises
- ✅ Classes
- ✅ Modules (import/export)
- ✅ Discriminated unions
- ✅ Generics

## 🎓 Key Concepts Explained

### Closures

Used throughout for encapsulation:

```typescript
function createCounter() {
  let count = 0;
  return () => ++count;
}
```

### Hoisting

Avoided by using `const`/`let` and arrow functions.

### Promise Management

All async operations use `async/await` with proper error handling.

### Error Handling

- Try/catch for async operations
- Result pattern for type-safe errors
- Error boundaries for UI errors

## 📊 Project Structure Benefits

1. **Testability**: Each layer can be tested independently
2. **Maintainability**: Clear separation of concerns
3. **Scalability**: Easy to add new features
4. **Reusability**: Components and logic are decoupled
5. **Type Safety**: TypeScript strict mode throughout

## 🔍 Code Quality

- ✅ TypeScript strict mode
- ✅ No `any` types
- ✅ Consistent code style
- ✅ Comprehensive error handling
- ✅ Unit and integration tests
- ✅ Performance optimized
- ✅ Accessible UI components

## 📱 Responsive Design

- 1 column: Mobile portrait
- 2 columns: Mobile landscape / Tablet portrait
- 3 columns: Tablet landscape
- 4 columns: Desktop

## 🎯 Challenge Requirements Met

✅ React advanced concepts (Hooks, HOC, Context)  
✅ State management (Context + useReducer)  
✅ ES6+ features (destructuring, async/await, etc.)  
✅ TypeScript with strict types  
✅ Tests (Jest + React Testing Library)  
✅ Performance optimizations (memoization, debouncing)  
✅ Clean architecture and SOLID principles  
✅ Error handling and validation

## 📝 License

This project was created as a technical challenge demonstration.

---

**Built with ❤️ using React Native, TypeScript, and Clean Architecture principles**
