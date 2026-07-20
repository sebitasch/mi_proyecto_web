import type { ExperienceId } from "@/data/experience";
import type { ExperienceContent } from "@/types";

/**
 * Experience prose in English.
 *
 * ⚠️ TRANSLATION PENDING REVIEW.
 *
 * `role` is a job title that already exists in English in the industry, so it
 * is intentionally identical in both languages.
 */
export const experienceEn: Record<ExperienceId, ExperienceContent> = {
  globant: {
    role: "Senior Web UI Developer",
    summary:
      "Building scalable, optimised and secure web applications for international clients and internal products, working within teams of more than 500 developers.",
    highlights: [
      "Microfrontend architectures with Module Federation, scoping components so each team can deploy independently.",
      "Work across monolithic and microservice systems, moving capabilities towards more maintainable boundaries without stopping delivery.",
      "Production observability with Datadog and Splunk, to diagnose incidents from real data rather than assumptions.",
      "AI integrated into the development cycle: GitHub Copilot, LLMs, MCPs and spec-driven development.",
    ],
  },
  gptw: {
    role: "Web Developer",
    summary:
      "Development of interactive sites, SPAs and landing pages for brand campaigns and professional events.",
    highlights: [
      "Responsive markup focused on load times and cross-browser compatibility.",
      "Release and versioning through CI/CD pipelines.",
    ],
  },
};
