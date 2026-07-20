import type { AboutContent } from "@/data/about";

/**
 * ⚠️ TRANSLATION PENDING REVIEW. This is Sebas's own voice describing his
 * career: read it carefully before publishing.
 *
 * "Senior Web UI Developer" is left untranslated: it is already an
 * industry title in English.
 */
export const aboutEn: AboutContent = {
  paragraphs: [
    "I'm Sebastian Cardona, a systems engineer and frontend developer with over five years building web products: from landing pages for brand campaigns to applications serving users across several countries.",
    "My work has centred on architectures that hold up as they grow — microfrontends with Module Federation, BFF patterns, feature flags — inside teams of more than 500 developers. At that scale maintainability stops being an aesthetic preference: it is what decides whether a team ships or stalls.",
    "I also treat performance as a measurement rather than an intuition. Lighthouse and Core Web Vitals to measure, Datadog and Splunk to know what actually happens in production instead of assuming it.",
    "More recently I've brought AI into the development workflow itself: the Anthropic Claude API, Model Context Protocol (MCP) and spec-driven development. Not for novelty, but because it measurably shortens the distance between an idea and something deployed.",
  ],
  tagline:
    "I design and build websites and products that help brands and businesses grow — with the technical rigor enterprise teams like Globant demand. Let's talk about your project.",
  facts: {
    role: { label: "Role", value: "Senior Web UI Developer" },
    education: { label: "Education", value: "Systems Engineering" },
    experience: { label: "Experience", value: "5+ years in web development" },
    location: { label: "Location", value: "Bogota, Colombia" },
  },
};
