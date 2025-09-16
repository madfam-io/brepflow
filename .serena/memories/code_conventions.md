# BrepFlow Code Conventions

## TypeScript Configuration
- Target: ES2022
- Module: ESNext with bundler resolution
- JSX: react-jsx
- Strict mode: **disabled** (gradually enabling)
- Path aliases: `@brepflow/*` maps to `packages/*/src`

## Code Style
### Prettier Settings
- Semicolons: Required
- Single quotes for strings
- Tab width: 2 spaces
- Trailing commas: ES5 style
- Print width: 100 characters
- Arrow parens: Always
- Line endings: LF

### ESLint Rules
- React 18 (no React import needed)
- TypeScript recommended rules
- No console.log (warn on console.warn/error allowed)
- Unused vars with underscore prefix allowed
- Explicit any: Warning (not error)

## Naming Conventions
- **Components**: PascalCase (e.g., `NodePanel`, `CustomNode`)
- **Files**: 
  - React components: PascalCase.tsx
  - Utilities/services: kebab-case.ts
  - Types: types.ts or specific-types.ts
- **Functions/Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE for true constants
- **Interfaces/Types**: PascalCase with 'I' or 'T' prefix optional

## Project Structure Patterns
- Components organized by feature in `components/`
- Shared types in `packages/types/src`
- Each package has its own `src/` directory
- Tests alongside source files or in `test/` directory
- Examples in `packages/examples/`

## Import Organization
1. External dependencies
2. Package imports (`@brepflow/*`)
3. Relative imports (components, utils)
4. Type imports
5. Styles

## Component Patterns
- Functional components with hooks
- Props interfaces defined above component
- Custom hooks in separate files
- Consistent icon usage from IconSystem

## Testing Conventions
- Vitest for unit tests
- Playwright for E2E tests
- Test files: `*.test.ts` or `*.spec.ts`
- Global test setup in `test/setup.ts`
- Coverage excludes: node_modules, dist, types, wasm

## Documentation
- CLAUDE.md for AI assistance guidance
- Comprehensive docs in /docs directory
- JSDoc comments for public APIs
- README.md at project root and major packages