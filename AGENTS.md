# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 15 portfolio built with the App Router, React 19, TypeScript, and Tailwind CSS. Route-level files, metadata, and global styles live in `app/`; `app/page.tsx` renders the main portfolio experience. Reusable UI is kept in `components/`, with the primary client component in `components/portfolio.tsx`. Portfolio copy, project data, navigation, and shared types belong in `lib/content.ts`. Static files such as the favicon live in `public/`. Treat `.next/` and `node_modules/` as generated directories and never edit or commit them.

## Build, Test, and Development Commands

- `npm ci` installs the exact dependency versions recorded in `package-lock.json`.
- `npm run dev` starts the local development server with hot reload, normally at `http://localhost:3000`.
- `npm run build` creates a production build and catches TypeScript or Next.js integration errors.
- `npm run start` serves the completed production build.
- `npm run lint` runs the repository's configured Next.js lint script.

Use the provided `dev-local.bat` or `start-local.bat` on Windows only when their wrapper behavior is useful; prefer the npm scripts in documentation and CI.

## Coding Style & Naming Conventions

Follow the existing TypeScript style: two-space indentation, double quotes, semicolons, and trailing commas where supported. Use PascalCase for React components and exported types (`SectionIntro`, `Project`), camelCase for functions and values (`fadeTransition`, `navItems`), and lowercase route filenames required by Next.js. Prefer the `@/` import alias over long relative paths. Keep content data in `lib/content.ts`, presentation in components, and global design tokens in `tailwind.config.ts` or `app/globals.css`.

## Testing Guidelines

No automated test framework or coverage threshold is currently configured. Before submitting changes, run `npm run build` and `npm run lint`, then manually verify desktop and mobile layouts, navigation anchors, motion-reduction behavior, and external links. If tests are introduced, use `*.test.ts` or `*.test.tsx` beside the code under test and add the runner command to `package.json`.

## Commit & Pull Request Guidelines

The short Git history does not establish a reliable convention. Use concise, imperative commit subjects such as `Update project case studies` or `Fix mobile navigation spacing`. Keep each commit focused. Pull requests should summarize the change, list validation performed, link relevant issues, and include before/after screenshots for visible UI changes. Call out content, metadata, dependency, or configuration changes explicitly.

## Security & Configuration Tips

Do not commit secrets or personal tokens. Store environment-specific values in ignored `.env.local` files, and document any required variable names without including real credentials.
