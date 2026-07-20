import type { ContactContent } from "@/data/contact";

/**
 * ⚠️ TRANSLATION PENDING REVIEW. This is Sebas's own voice describing his
 * approach to collaboration and availability: read it carefully before publishing.
 */
export const contactEn: ContactContent = {
  headline: "If you've made it this far, let's talk",
  body: [
    "I look for teams where frontend is taken seriously: where performance is measured, architecture is discussed, and the developer experience matters as much as the user experience.",
    "If you're building something like that, I want to know about it. And if you just want to brainstorm an idea or ask how I'd approach a specific challenge in your product, write anyway — it doesn't have to be a job opening.",
  ],
  details: {
    location: { label: "Location", value: "Bogota, Colombia · GMT-5" },
    mode: { label: "Work mode", value: "Remote or hybrid" },
    availability: { label: "Availability", value: "Open to opportunities" },
    languages: { label: "Languages", value: "Spanish native · English B2-C1" },
    responseTime: {
      label: "Response time",
      value: "Usually within 48 hours",
    },
  },
};
