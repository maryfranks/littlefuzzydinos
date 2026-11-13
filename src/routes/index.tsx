import { createFileRoute } from "@tanstack/react-router";

import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mary Franks" },
      { name: "description", content: "Resilient cloud infrastructure, clean automation, and dependable systems. Based in Florida, operating globally." },
      { property: "og:title", content: "Mary Franks · Site Reliability & Infrastructure Engineer" },
      { property: "og:description", content: "Resilient cloud infrastructure, clean automation, and dependable systems." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PortfolioRoute,
});

function PortfolioRoute() {
  return <SitePage initialView="portfolio" />;
}
