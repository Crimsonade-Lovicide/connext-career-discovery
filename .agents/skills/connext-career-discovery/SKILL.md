```markdown
# connext-career-discovery Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `connext-career-discovery` repository, a TypeScript project built with the Next.js framework. You'll learn about file naming, import/export styles, commit conventions, and how to write and organize tests within this codebase.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `userProfile.ts`, `careerDiscoveryPage.tsx`

### Import Style
- Use **alias imports** for modules.
  - Example:
    ```typescript
    import { getUserData } from '@/services/userService';
    ```

### Export Style
- Both **named** and **default exports** are used.
  - Named export example:
    ```typescript
    export function calculateScore() { ... }
    ```
  - Default export example:
    ```typescript
    export default CareerDiscoveryPage;
    ```

### Commit Patterns
- Commits often use the `feat` prefix for new features.
- Commit messages are concise, averaging 32 characters.
  - Example: `feat: add user profile page`

## Workflows

### Adding a New Feature
**Trigger:** When implementing a new feature or page  
**Command:** `/add-feature`

1. Create a new file using camelCase naming.
2. Use alias imports for dependencies.
3. Export your component or function (default or named as appropriate).
4. Commit your changes with a concise message, prefixed by `feat`.
   - Example: `feat: implement onboarding flow`

### Writing a Test
**Trigger:** When adding or updating code that requires testing  
**Command:** `/write-test`

1. Create a test file with the `.test.` pattern (e.g., `userProfile.test.ts`).
2. Place test files alongside the code or in a designated test directory.
3. Write tests using the project's preferred (unspecified) testing framework.
4. Run tests to ensure correctness before committing.

## Testing Patterns

- Test files follow the `*.test.*` naming convention.
  - Example: `careerDiscovery.test.ts`
- The specific testing framework is not detected, but standard TypeScript/Next.js testing practices likely apply.
- Place tests close to the code they cover or in a test directory.

## Commands
| Command        | Purpose                                   |
|----------------|-------------------------------------------|
| /add-feature   | Start workflow for adding a new feature   |
| /write-test    | Start workflow for writing a new test     |
```
