# BrepFlow Development Commands

## Essential Development Commands

### Initial Setup
```bash
pnpm i                     # Install all dependencies
```

### Development
```bash
pnpm run dev               # Start dev server at http://localhost:5173
pnpm run build             # Build all packages
pnpm run test              # Run unit/integration tests
pnpm run lint              # Run ESLint
pnpm run format            # Format code with Prettier
pnpm run typecheck         # Run TypeScript type checking
```

### Testing
```bash
pnpm run test              # Run Vitest tests
pnpm run test:e2e          # Run Playwright E2E tests
pnpm run test:e2e:headed   # Run E2E tests with browser UI
pnpm run test:e2e:debug    # Debug E2E tests
pnpm run test:e2e:report   # Show E2E test report
pnpm run test:all          # Run all tests (unit + E2E)
```

### CLI Tools
```bash
# Build CLI first
pnpm -w --filter @brepflow/cli run build

# Run CLI commands
node packages/cli/dist/index.js render <file.bflow.json>
node packages/cli/dist/index.js validate <file.bflow.json>
node packages/cli/dist/index.js info <file.bflow.json>
```

### Cleanup & Maintenance
```bash
pnpm run clean             # Clean build artifacts
pnpm lockfile:check        # Verify lockfile integrity
pnpm lockfile:update       # Update lockfile
```

### Optional: WASM Build
```bash
pnpm run build:wasm        # Build OCCT WASM (requires Emscripten)
```

### System Commands (Darwin)
```bash
# Git
git status                 # Check repository status
git diff                   # View changes
git log --oneline -n 10   # View recent commits

# File Operations
ls -la                     # List files with details
find . -name "*.tsx"       # Find TypeScript React files
grep -r "pattern" .        # Search for pattern in files

# Process Management
ps aux | grep node         # Check Node processes
lsof -i :5173             # Check what's using port 5173
```

## Task Completion Checklist
When completing a task, run these commands:
1. `pnpm run lint` - Check for linting issues
2. `pnpm run typecheck` - Verify TypeScript types
3. `pnpm run test` - Run unit tests
4. `pnpm run format` - Format code consistently