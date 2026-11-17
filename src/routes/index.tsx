import { createFileRoute } from "@tanstack/react-router";

import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mary Franks" },
      { name: "description", content: "Selected infrastructure and platform engineering projects." },
      { property: "og:title", content: "Mary Franks · Site Reliability & Infrastructure Engineer" },
      { property: "og:description", content: "Selected infrastructure and platform engineering projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PortfolioRoute,
});

function PortfolioRoute() {
  return <SitePage initialView="portfolio" />;
}
