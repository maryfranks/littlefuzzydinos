# Portfolio


## Local Development

### Prerequisites
- [Bun](https://bun.sh/) (package manager & runtime)

### Setup & Running
1. Install dependencies:
   ```bash
   bun install
   ```
2. Start the local Vite dev server:
   ```bash
   bun run dev
   ```
   Open the local URL printed in the terminal (default `http://localhost:8080` or `http://localhost:5173`). In local development, the header toggle switches between `/` (Portfolio) and `/sailing` (SV Coqui) via path routing rather than production subdomains[span_0](start_span)[span_0](end_span).

### Useful Scripts
- `bun run build` — Production build (`vite build`)[span_1](start_span)[span_1](end_span)
- `bun run preview` — Preview the production build locally (`vite preview`)[span_2](start_span)[span_2](end_span)
- `bun run lint` — Run ESLint across the codebase[span_3](start_span)[span_3](end_span)
- `bun run format` — Format files with Prettier[span_4](start_span)[span_4](end_span)
- `bun run test` — Run the Vitest test suite[span_5](start_span)[span_5](end_span)

## Tech Stack
- **Framework & Routing:** React `19.2.0`, TanStack Start `1.168.60`, TanStack Router `1.170.41`, TanStack Query `5.101.1`[span_6](start_span)[span_6](end_span)
- **Build & Tooling:** Vite `8.1.5`, TypeScript `5.8.3`, Nitro `3.0.260603-beta`, `@lovable.dev/vite-tanstack-config` `2.26.5`[span_7](start_span)[span_7](end_span)
- **Styling & UI:** Tailwind CSS `4.2.1` (`@tailwindcss/vite`), Radix UI primitives, Lucide React `0.575.0`[span_8](start_span)[span_8](end_span)
- **Testing & Linting:** Vitest `4.1.10`, ESLint `9.32.0`, Prettier `3.7.3`[span_9](start_span)[span_9](end_span)
