# Sebas's Portfolio — Project Rules

> Claude Code reads this file automatically at the start of every session.
> Place it in the root of the repository. It always applies, across all sessions.

## About me (context)
Frontend/Fullsack developer focused on React.js and Next.js. Experience with
JavaScript, TypeScript, HTML, CSS, Postman, and microservices and microfrontend
architectures (BFF patterns, feature flags, API consumption, Centrilizing features for cross capabilities). Intermediate-to-advanced
level: don't explain basic React/Next concepts.
English level: B2 - C1

## Project goal
Personal portfolio aimed at recruiters and companies. It must communicate my
technical value proposition in under 10 seconds, look professional, and not feel
generic.

## Stack (do not change without authorization)
- Next.js 15 (App Router)
- Strict TypeScript
- Tailwind CSS for styling
- Framer Motion for subtle animations (install when needed)
- next/font with the Inter font

## Visual identity (final)
- Primary background: #FFFFFF
- Primary text: #18181B
- Secondary text: #52525B
- Subtle border: #E4E4E7
- Primary accent (indigo): #4F46E5
- Primary accent hover/dark: #4338CA
- Soft accent (pill/badge backgrounds): #EEF2FF
- Typography: Inter (headings and body), weights 400/500/600
- Border radius: 8px on controls/buttons, 12px on cards
- Mode: light by default (dark mode optional in a later phase)
- Overall style: modern and clean. NO terminal/console-style aesthetic.

## Hero structure (already defined)
1. Role label at the top (e.g. "FRONTEND / FULLSTACK DEVELOPER"), small, in indigo.
2. Name / title (H1), ~27-30px, weight 600.
3. Value proposition in 1-2 lines, direct tone, no filler or clichés.
4. Two CTAs: one solid indigo ("View projects"), one outline ("Download CV").
5. Row of pills with the main stack (React, Next.js, TypeScript).

## Code conventions
- Functional components + hooks, always TypeScript.
- One component per file, named in PascalCase.
- Prioritize accessibility: semantic HTML, aria-labels where applicable, correct contrast.
- Prioritize performance: next/image, lazy loading, avoid unnecessary re-renders.
- Comment only what isn't obvious; the code should be self-explanatory.
- No Title Case or ALL CAPS in copy except short intentional labels.

## Folder structure
- /app — routes (App Router)
- /components — reusable components
- /lib — utilities and helpers
- /data — content (projects, experience) as typed TS/JSON

## How you should behave
- Before installing a new dependency, let me know and justify it in 1-2 lines.
- If a requirement is ambiguous (missing a text, an image, a data point), ask me;
  don't invent content.
- Briefly explain non-trivial decisions; don't explain the basics to me.
- Respect the visual identity defined above; don't change palette or typography
  unless I explicitly ask.

## Privacy note (important)
My current job is confidential. In portfolio copy I can describe skills and types
of task (REST API design, refactoring, unit testing with Vitest) and link to the
product's public site, but NEVER expose proprietary code, detailed internal
architecture, or client data.
