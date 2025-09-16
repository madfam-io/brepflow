# BrepFlow Task Completion Checklist

## Before Marking a Task Complete

### 1. Code Quality Checks
Run these commands in sequence:
```bash
pnpm run lint          # Fix any ESLint issues
pnpm run typecheck     # Ensure no TypeScript errors
pnpm run format        # Apply consistent formatting
```

### 2. Testing
```bash
pnpm run test          # Run unit tests
# If UI changes:
pnpm run test:e2e      # Run E2E tests
```

### 3. Build Verification
```bash
pnpm run build         # Ensure all packages build
```

### 4. Development Server Check
```bash
pnpm run dev           # Verify app runs at http://localhost:5173
# Test the specific feature/fix in the browser
```

## Common Issues to Check

### React Components
- Props properly typed with interfaces
- No React import needed (React 18)
- Consistent use of functional components
- Icons imported from IconSystem

### TypeScript
- No explicit 'any' without good reason
- Proper type imports
- Path aliases used (`@brepflow/*`)

### Code Style
- Single quotes for strings
- Semicolons at end of statements
- 2-space indentation
- Max line width 100 characters

### Monorepo Considerations
- Changes in shared packages may affect multiple apps
- Run build from root to verify all packages
- Use pnpm workspace commands: `pnpm -w run <command>`

## Git Workflow
Before committing:
1. Review changes: `git diff`
2. Stage selectively: `git add -p`
3. Commit with descriptive message
4. Reference issue numbers if applicable

## Final Verification
- Feature works as expected in browser
- No console errors or warnings
- Performance acceptable (check Network/Performance tabs)
- Accessibility maintained (keyboard navigation, ARIA)