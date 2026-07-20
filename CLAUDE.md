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
- Animations: CSS first (keyframes + tokens in globals.css). For what genuinely
  needs JS, write small own client components that wrap server-rendered
  children. NO Framer Motion / Motion: it weighs 15-40 KB and would force
  "use client" on components that are server today.
- next/font with Space Grotesk for headings/labels (display), Inter for body/UI

## Visual identity (final)
- Primary background: #FFFFFF
- Primary text: #18181B
- Secondary text: #52525B
- Subtle border: #E4E4E7
- Primary accent (indigo): #4F46E5
- Primary accent hover/dark: #4338CA
- Soft accent (pill/badge backgrounds): #EEF2FF
- Typography: Space Grotesk (headings/labels), Inter (body/UI), weights 400/500/600
- Border radius: 8px on controls/buttons, 12px on cards
- Mode: light by default (dark mode optional in a later phase)
- Overall style: modern and clean. NO terminal/console-style aesthetic.

## Hero structure (last updated 2026-07-20)
1. Role label at the top (e.g. "FRONTEND / FULLSTACK DEVELOPER"), small, in indigo, responsive scaling.
2. Name / title (H1), responsive: text-4xl sm:text-5xl lg:text-6xl, Space Grotesk (font-display), weight 600, with leading-tight.
3. Value proposition / tagline (2-3 lines, dual-audience: casual users + recruiters), direct tone, marketing-focused CTA, scaled text-lg sm:text-xl lg:text-2xl.
4. React logo SVG watermark in background (5% opacity, top-right, parallax on mouse, hidden on mobile).
5. Entrance animations: fade-up on load, each block staggered via CSS custom property (`--stagger-step`). No dependency on JS for visibility.
6. Two CTAs below tagline: one solid indigo ("View projects"), one outline ("Download CV").
7. Credibility strip (3 pills): years of experience (with badge icon), notable clients (Disney, British Airways), availability (with pulse dot). Replaces old hardcoded 3-tech stack row.

## Code conventions
- Functional components + hooks, always TypeScript.
- One component per file, named in PascalCase.
- Prioritize accessibility: semantic HTML, aria-labels where applicable, correct contrast.
- Every animation must respect `prefers-reduced-motion`, and content must never
  depend on JS to become visible.
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
Employer and client names are NOT sensitive: they are references, and naming them
is standard practice on a CV or LinkedIn. Globant, Great Place To Work®, Disney
and British Airways can appear in portfolio copy.

What must NEVER be exposed: proprietary code, detailed internal architecture,
internal URLs or dashboards, and any client data beyond the client's name.
Describe skills and types of task (microfrontends, BFF patterns, REST API design,
observability with Datadog/Splunk) and link only to public product sites.

The `confidential` flag on `Experience` still exists and works: set it to `true`
if a future role is under an NDA that does restrict naming. When set, the UI
omits both the company name and its clients, and neither reaches the HTML.
