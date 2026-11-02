import { createFileRoute } from "@tanstack/react-router";
import doctorLogo from "@/assets/doctor-dental-logo.png.asset.json";

/** Home page — rendered from the database copy of the original markup. */
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Fatema Mirza | Plastic and Aesthetic Surgeon" },
      { name: "description", content: "Explore Dr. Fatema Mirza's plastic and aesthetic surgical care, treatments and consultation appointments." },
      { property: "og:title", content: "Dr. Fatema Mirza | Plastic and Aesthetic Surgeon" },
      { property: "og:description", content: "Explore Dr. Fatema Mirza's plastic and aesthetic surgical care, treatments and consultation appointments." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        href: doctorLogo.url,
        fetchPriority: "high",
      },
    ],
  }),
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { renderSitePage } = await import("@/lib/site-content/render.server");
        return renderSitePage(request, "index");
      },
    },
  },
});
