import { createFileRoute } from "@tanstack/react-router";

import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/sailing")({
  head: () => ({
    meta: [
      { title: "SV Coqui" },
      { name: "description", content: "Meet SV Coqui, Mary Franks's 1991 Hunter Legend 43: specifications, photographs, and life under sail." },
      { property: "og:title", content: "SV Coqui · 1991 Hunter Legend 43" },
      { property: "og:description", content: "Specifications and photographs aboard SV Coqui, a 1991 Hunter Legend 43." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SailingRoute,
});

function SailingRoute() {
  return <SitePage initialView="sailing" />;
}
