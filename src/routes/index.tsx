import { createFileRoute } from "@tanstack/react-router";

/** Home page — rendered from the database copy of the original markup. */
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Nihaia Biadse | Biadse Brothers Dental Clinic, Baqa al-Gharbiyye" },
      { name: "description", content: "Advanced dental care in Baqa al-Gharbiyye — implants, veneers, whitening and braces. Free initial consultation." },
      { property: "og:title", content: "Dr. Nihaia Biadse | Biadse Brothers Dental Clinic, Baqa al-Gharbiyye" },
      { property: "og:description", content: "Where Science Meets a Perfect Smile — free consultation at Biadse Brothers Dental Clinic." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        href: "/img/dr-fatema-logo.webp",
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
