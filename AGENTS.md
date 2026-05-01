# Repository Guidelines

## Project Structure & Module Organization

- `app/`: Next.js App Router routes, layouts, and server actions.
- `components/`: React UI components, organized by feature (e.g. `components/job/`, `components/question/`). Files use `kebab-case.tsx`.
- `lib/`: Shared utilities (helpers, DB/query helpers, constants).
- `prisma/`: Prisma schema and migrations (`prisma/schema.prisma`, `prisma/migrations/`, `prisma/models/`).
- `public/`: Static assets served by Next.js.
- `types/`: Shared TypeScript types.
- Root config: `next.config.mjs`, `tailwind.config.ts`, `eslint.config.mjs`, `.prettierrc`.

## Build, Test, and Development Commands

- `npm install`: Install dependencies.
- `npm run dev`: Start local dev server (Next.js).
- `npm run build`: Production build.
- `npm run start`: Serve the production build locally.
- `npm run lint`: Run Next.js/ESLint checks.
- `npm run typecheck`: Run TypeScript (`tsc --noEmit`).
- Prisma:
  - `npx prisma generate`: Generate Prisma client.
  - `npx prisma migrate dev`: Create/apply migrations in development.
  - `npx prisma migrate deploy`: Apply existing migrations (CI/production).

## Coding Style & Naming Conventions

- TypeScript + React (`.ts`/`.tsx`), 2-space indentation.
- Prettier is the source of truth (`printWidth: 80`, semicolons on, no trailing commas) with `prettier-plugin-tailwindcss`.
- ESLint extends `next/core-web-vitals` + `next/typescript` (unused vars allowed when prefixed with `_`).
- Prefer feature folders and small components over monolith files.

## Testing Guidelines

- No dedicated test runner is configured yet (no `jest`/`vitest` scripts). For now, treat `npm run lint` and `npm run typecheck` as the required safety net.
- If you add tests, keep them colocated (e.g. `components/job/job-card.test.tsx`) and add a corresponding `npm run test` script.

## Commit & Pull Request Guidelines

- Commits are typically short, imperative, and feature-focused (examples: `add typecheck command`, `refactor: ...`). Keep subjects under ~72 chars; optionally include a prefix like `refactor:`/`fix:`.
- PRs should include: a clear description, linked issue/PR number when applicable, and screenshots/GIFs for UI changes.
- Include Prisma migration notes in the PR when schema changes are involved (`prisma/migrations/*`).

## Security & Configuration Tips

- Never commit secrets. Use `.env.example` as the contract for required variables and keep local values in `.env`.
- Be careful with auth/session changes (`auth.ts`, `middleware.ts`): call out behavior changes in PR descriptions.
